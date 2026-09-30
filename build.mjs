// Gera a versão de produção do site na pasta dist/.
// Uso: npm run build
//
// O código-fonte (index.html, css/ e js/) continua legível para o
// desenvolvimento; só a dist/ é publicada.

import { build } from "esbuild";
import { minify } from "html-minifier-terser";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { otimizarImagens } from "./imagens.mjs";

const DIST = "dist";

// Mede o tamanho total de uma lista de arquivos, em bytes
async function tamanho(arquivos) {
  let total = 0;
  for (const arquivo of arquivos) total += (await stat(arquivo)).size;
  return total;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function listarArquivos(pasta) {
  const entradas = await readdir(pasta, { withFileTypes: true, recursive: true });
  return entradas
    .filter((entrada) => entrada.isFile())
    .map((entrada) => path.join(entrada.parentPath, entrada.name));
}

// 1. Começa sempre de uma dist/ vazia
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

// 2. JavaScript: junta os módulos a partir do main.js num só arquivo
//    minificado. O [hash] no nome muda a cada alteração do código, e o
//    navegador nunca usa uma versão antiga guardada em cache.
const js = await build({
  entryPoints: { app: "js/main.js" },
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2020",
  outdir: path.join(DIST, "js"),
  entryNames: "[name]-[hash]",
  metafile: true,
  logLevel: "warning",
});

// 3. CSS: junta reset.css + style.css num só arquivo minificado.
//    As imagens do url() ficam como estão e são copiadas no passo 4.
const css = await build({
  stdin: {
    contents: '@import "./css/reset.css";\n@import "./css/style.css";',
    resolveDir: ".",
    loader: "css",
  },
  bundle: true,
  minify: true,
  external: ["*.jpg", "*.webp", "*.svg"],
  outdir: path.join(DIST, "css"),
  entryNames: "style-[hash]",
  metafile: true,
  logLevel: "warning",
});

const nomeGerado = (resultado, extensao) =>
  Object.keys(resultado.metafile.outputs)
    .find((saida) => saida.endsWith(extensao))
    .split(path.sep)
    .join("/")
    .replace(`${DIST}/`, "");

const arquivoJs = nomeGerado(js, ".js");
const arquivoCss = nomeGerado(css, ".css");

// 4. Imagens: WebP + JPG recomprimido; o favicon é copiado como está
const imagens = await otimizarImagens("assets", path.join(DIST, "assets"));

// 5. HTML: troca os arquivos de desenvolvimento pelos gerados e minifica
// (o replace remove o BOM, caractere invisível que alguns editores
// colocam no início do arquivo)
let html = (await readFile("index.html", "utf8")).replace(/^﻿/, "");

const substituir = (padrao, novo, descricao) => {
  if (!padrao.test(html)) {
    throw new Error(`build: não encontrei ${descricao} no index.html`);
  }
  html = html.replace(padrao, novo);
};

substituir(
  /<link rel="stylesheet" href="css\/reset\.css">\s*<link rel="stylesheet" href="css\/style\.css">/,
  `<link rel="stylesheet" href="${arquivoCss}">`,
  "os links do CSS",
);
substituir(
  /<script type="module" src="js\/main\.js"><\/script>/,
  `<script type="module" src="${arquivoJs}"></script>`,
  "o script principal",
);

html = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  minifyCSS: true,
  minifyJS: true,
});

await writeFile(path.join(DIST, "index.html"), html);

// 6. Relatório: tamanho antes (fonte) e depois (dist)
const fonteJs = await listarArquivos("js");
const fonteCss = ["css/reset.css", "css/style.css"];
const linhas = [
  ["HTML", await tamanho(["index.html"]), await tamanho([path.join(DIST, "index.html")])],
  ["CSS", await tamanho(fonteCss), await tamanho([path.join(DIST, arquivoCss)])],
  ["JS", await tamanho(fonteJs), await tamanho([path.join(DIST, arquivoJs)])],
];

console.log("\nBuild concluída em dist/\n");
console.log("Tipo   Antes      Depois     Redução   Arquivos");
for (const [tipo, antes, depois] of linhas) {
  const reducao = `${Math.round((1 - depois / antes) * 100)}%`;
  const arquivos = tipo === "JS" ? `${fonteJs.length} -> 1` : tipo === "CSS" ? "2 -> 1" : "1 -> 1";
  console.log(
    `${tipo.padEnd(6)} ${kb(antes).padEnd(10)} ${kb(depois).padEnd(10)} ${reducao.padEnd(9)} ${arquivos}`,
  );
}
for (const { nome, original, webp } of imagens) {
  const reducao = `${Math.round((1 - webp / original) * 100)}%`;
  console.log(`${"IMG".padEnd(6)} ${kb(original).padEnd(10)} ${kb(webp).padEnd(10)} ${reducao.padEnd(9)} ${nome} -> WebP`);
}
console.log(`\nJS:  ${arquivoJs}\nCSS: ${arquivoCss}\n`);
