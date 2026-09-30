// Otimiza as imagens JPG com o sharp:
// - gera uma versão WebP (formato moderno, bem menor);
// - recomprime o JPG (reserva para navegadores sem WebP);
// - copia os outros arquivos (como o favicon.svg) sem mudanças.
//
// Uso direto: npm run imagens  -> cria os .webp dentro de assets/
// (necessário para o Live Server mostrar as imagens no desenvolvimento).
// O build.mjs também usa esta função para gerar dist/assets/.

import sharp from "sharp";
import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const QUALIDADE_WEBP = 75;
const QUALIDADE_JPG = 78;

export async function otimizarImagens(origem, destino, { recomprimirJpg = true } = {}) {
  await mkdir(destino, { recursive: true });
  const relatorio = [];

  for (const nome of await readdir(origem)) {
    const entrada = path.join(origem, nome);
    const extensao = path.extname(nome).toLowerCase();

    if (extensao === ".webp") continue; // gerado a partir do JPG

    if (extensao !== ".jpg" && extensao !== ".jpeg") {
      if (path.resolve(origem) !== path.resolve(destino)) {
        await copyFile(entrada, path.join(destino, nome));
      }
      continue;
    }

    const base = path.basename(nome, extensao);
    const saidaWebp = path.join(destino, `${base}.webp`);
    await sharp(entrada).webp({ quality: QUALIDADE_WEBP }).toFile(saidaWebp);

    if (recomprimirJpg) {
      await sharp(entrada)
        .jpeg({ quality: QUALIDADE_JPG, mozjpeg: true })
        .toFile(path.join(destino, nome));
    }

    relatorio.push({
      nome,
      original: (await stat(entrada)).size,
      webp: (await stat(saidaWebp)).size,
    });
  }

  return relatorio;
}

// Executado direto pelo terminal (npm run imagens): gera os .webp em assets/
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const relatorio = await otimizarImagens("assets", "assets", { recomprimirJpg: false });
  for (const { nome, original, webp } of relatorio) {
    console.log(`${nome}: ${(original / 1024).toFixed(1)} KB -> WebP ${(webp / 1024).toFixed(1)} KB`);
  }
}
