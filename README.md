# Vida Felina — Geriatria e Cuidado

Site de uma ONG fictícia dedicada à conscientização e ao cuidado de **gatos idosos**. É uma **SPA (Single Page Application)** feita com **HTML, CSS e JavaScript puro**, sem bibliotecas ou frameworks externos.

**Site no ar:** https://nomadenick99-crypto.github.io/Vida-Felina/
**Repositório:** https://github.com/nomadenick99-crypto/Vida-Felina

> Projeto acadêmico desenvolvido na disciplina **Desenvolvimento FrontEnd — Experiência Prática 3**, do curso **CST em Análise e Desenvolvimento de Sistemas**.

---

## Funcionalidades

- **Navegação SPA por hash** (`#home`, `#projetos`, `#cadastro`, `#confirmacao`), com página de "não encontrada" para rotas inválidas e título da aba atualizado a cada página.
- **Templates dinâmicos**: o conteúdo das páginas é gerado pelo JavaScript; os cards de projetos são criados a partir de um array com `.map()`.
- **Formulário de cadastro com validação**:
  - verificação em tempo real ao sair de cada campo;
  - mensagem de erro embaixo do campo e bordas de erro/sucesso;
  - máscaras para CPF, telefone e CEP;
  - validação do CPF com cálculo dos dígitos verificadores;
  - aviso com o número de campos com problema no envio.
- **Dados no navegador (localStorage)**:
  - cadastros salvos em formato JSON;
  - contador de voluntários na página Início e no rodapé, atualizado na hora ao salvar;
  - nome de quem se cadastrou exibido na confirmação;
  - botão para **apagar os cadastros** deste navegador.
- **Menu mobile acessível**, com botão real e `aria-expanded`.
- **Layout responsivo** para desktop, tablet e celular (sem conteúdo cortado em 320px), respeitando a preferência de movimento reduzido.
- **Acessibilidade (WCAG 2.1 AA)**:
  - cores com contraste de pelo menos 4,5:1 nos textos;
  - **modo de alto contraste** pelo botão do cabeçalho ou pela configuração do sistema (`prefers-contrast`), com a escolha salva no navegador;
  - ajustes para o Modo de Alto Contraste do Windows (`forced-colors`);
  - link "Pular para o conteúdo", foco no título ao trocar de página e tecla **Esc** para fechar o menu e a janela de erro;
  - semântica para leitores de tela: regiões (`header`, `nav`, `main`, `footer`), diálogo com `role="dialog"`, `aria-pressed`, `aria-controls` e mensagens de erro ligadas aos campos.
- **Otimizado para produção**:
  - HTML, CSS e JavaScript minificados, com os 11 módulos JS reunidos em um único arquivo (16 → 5 requisições);
  - nomes de arquivo com *hash* para evitar versões antigas em cache;
  - imagens em **WebP** com JPG de reserva, foto do topo pré-carregada e foto secundária com carregamento preguiçoso;
  - deploy automático no GitHub Pages com **GitHub Actions**.

## 🛠️ Tecnologias

| Área          | Recursos utilizados                                                                     |
| ------------- | --------------------------------------------------------------------------------------- |
| Estrutura     | HTML5 semântico, atributos ARIA                                                         |
| Estilo        | CSS3, variáveis CSS, Grid, Flexbox, `@media`, `transition`, `@keyframes`                |
| Acessibilidade | WCAG 2.1 AA, `prefers-contrast`, `forced-colors`, `prefers-reduced-motion`             |
| Comportamento | JavaScript ES6+ com módulos (`import`/`export`), eventos, RegEx, `localStorage`, `JSON` |
| Versionamento | Git com GitFlow, GitHub (issues, milestones e pull requests)                            |
| Build         | Node.js, esbuild (JS e CSS), html-minifier-terser (HTML), sharp (imagens)               |
| Publicação    | GitHub Pages com deploy automático por GitHub Actions                                   |

O site não usa nenhuma biblioteca externa — nem mesmo fontes baixadas da internet. As ferramentas da linha **Build** são dependências de desenvolvimento: servem só para gerar a versão de produção e não vão para o site.

## Estrutura do projeto

```
Vida-Felina/
├── .github/workflows/
│   └── deploy.yml          # deploy automático no GitHub Pages
├── index.html              # página única: cabeçalho, <main id="app"> e rodapé
├── README.md
├── package.json            # comandos (npm run build) e ferramentas de build
├── build.mjs               # gera a versão de produção na pasta dist/
├── imagens.mjs             # gera as versões WebP das imagens
├── assets/                 # imagens (JPG + WebP) e favicon
│   ├── Gato_lendo.jpg / .webp
│   ├── gato-idoso-cinza.jpg / .webp
│   └── favicon.svg
├── css/
│   ├── reset.css           # zera os estilos padrão do navegador
│   └── style.css           # visual, grid, componentes e responsividade
└── js/
    ├── main.js             # ponto de entrada: junta os módulos
    └── modules/
        ├── router.js       # lê o # da URL e desenha a página certa
        ├── templates.js    # HTML de cada página
        ├── forms.js        # máscaras, validação e envio do formulário
        ├── storage.js      # único acesso ao localStorage
        ├── utils.js        # funções de apoio (limpar texto, validar CPF, e-mail...)
        ├── menu.js         # menu mobile (abre, fecha e Esc)
        ├── contador.js     # contador de voluntários e botão de apagar cadastros
        ├── confirmacao.js  # botão de fechar o aviso da confirmação
        ├── contraste.js    # modo de alto contraste
        └── atalhos.js      # link "Pular para o conteúdo"
```

Os módulos se comunicam por **eventos personalizados** (`route:rendered`, `cadastro:salvo`, `cadastros:apagados`), o que evita que um dependa do funcionamento interno do outro.

## Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/nomadenick99-crypto/Vida-Felina.git
   ```
2. Abra a pasta no **VS Code**.
3. Clique com o botão direito no `index.html` → **Open with Live Server** (extensão _Live Server_).

> **Não abra o `index.html` com dois cliques.** Com o endereço `file:///`, o navegador bloqueia os módulos JavaScript (erro de CORS) e a página fica vazia. É preciso um servidor local, como o Live Server.

## Build de produção

Requer o **Node.js** instalado.

1. Instale as ferramentas de build (só na primeira vez):
   ```bash
   npm install
   ```
2. Gere a versão de produção na pasta `dist/`:
   ```bash
   npm run build
   ```
   O comando mostra um relatório com o tamanho dos arquivos antes e depois da otimização.
3. Para conferir o resultado, abra o `dist/index.html` com o Live Server.

Ao trocar ou adicionar uma imagem JPG em `assets/`, rode `npm run imagens` para gerar a versão WebP usada no desenvolvimento.

## Deploy

O deploy é automático: a cada merge na `main`, o workflow [`deploy.yml`](.github/workflows/deploy.yml) do **GitHub Actions** instala as dependências (`npm ci`), gera a build (`npm run build`) e publica a pasta `dist/` no GitHub Pages. O andamento de cada deploy aparece na aba **Actions** do repositório.

## Versionamento

O projeto segue o **GitFlow**:

| Ramo        | Função                                             |
| ----------- | -------------------------------------------------- |
| `main`      | versões publicadas (é a que o GitHub Pages exibe)  |
| `develop`   | integração das funcionalidades em desenvolvimento  |
| `feature/*` | uma funcionalidade nova, isolada                   |
| `release/*` | preparação e teste de uma versão antes de publicar |

As versões seguem o **versionamento semântico** (`MAIOR.MENOR.CORREÇÃO`):

| Versão                                                                           | Conteúdo                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0                                                                            | primeira publicação do site (sem tag — o Git foi adotado no final do desenvolvimento)                                                                                                                                                           |
| [v1.1.0](https://github.com/nomadenick99-crypto/Vida-Felina/releases/tag/v1.1.0) | menu em módulo próprio e contador reativo no rodapé                                                                                                                                                                                             |
| [v1.2.0](https://github.com/nomadenick99-crypto/Vida-Felina/releases/tag/v1.2.0) | botão para apagar os cadastros ([issue #1](https://github.com/nomadenick99-crypto/Vida-Felina/issues/1), PRs [#2](https://github.com/nomadenick99-crypto/Vida-Felina/pull/2) e [#3](https://github.com/nomadenick99-crypto/Vida-Felina/pull/3)) |
| [v1.2.1](https://github.com/nomadenick99-crypto/Vida-Felina/releases/tag/v1.2.1) | documentação: este README                                                                                                                                                                                                                       |
| [v1.3.0](https://github.com/nomadenick99-crypto/Vida-Felina/releases/tag/v1.3.0) | acessibilidade: correções WCAG 2.1 AA e semântica ([issue #6](https://github.com/nomadenick99-crypto/Vida-Felina/issues/6), PR [#8](https://github.com/nomadenick99-crypto/Vida-Felina/pull/8)), alto contraste e navegação por teclado ([issue #7](https://github.com/nomadenick99-crypto/Vida-Felina/issues/7), PR [#9](https://github.com/nomadenick99-crypto/Vida-Felina/pull/9)) |
| v1.4.0                                                                           | produção: build com minificação ([issue #11](https://github.com/nomadenick99-crypto/Vida-Felina/issues/11), PR [#14](https://github.com/nomadenick99-crypto/Vida-Felina/pull/14)), imagens WebP ([issue #12](https://github.com/nomadenick99-crypto/Vida-Felina/issues/12), PR [#15](https://github.com/nomadenick99-crypto/Vida-Felina/pull/15)) e deploy com GitHub Actions ([issue #13](https://github.com/nomadenick99-crypto/Vida-Felina/issues/13), PR [#16](https://github.com/nomadenick99-crypto/Vida-Felina/pull/16)) |

## Sobre os dados

Os cadastros ficam salvos **apenas no navegador de quem preencheu** (localStorage) e não são enviados para nenhum servidor. Eles podem ser apagados a qualquer momento pelo botão **"Apagar cadastros deste navegador"**, no rodapé. Por ser um projeto de estudo, os dados não são criptografados — não use informações reais. A escolha do modo de alto contraste também fica salva no navegador, separada dos cadastros.

## Ferramentas de apoio

O desenvolvimento contou com o apoio do **Claude** (Anthropic), um assistente de inteligência artificial, usado como tutor: diagnóstico de bugs, explicação de conceitos, revisão do código e implementação guiada de melhorias. Cada alteração foi explicada antes de ser aplicada e testada no navegador. Os commits feitos com essa ajuda trazem a linha `Co-Authored-By: Claude` no histórico.

## Autoria

**Monique Ribeiro** — estudante de Análise e Desenvolvimento de Sistemas.

> O conteúdo sobre saúde felina é educativo e não substitui a avaliação de um médico-veterinário.
