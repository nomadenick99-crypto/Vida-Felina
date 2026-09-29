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
- **Layout responsivo** para desktop, tablet e celular, respeitando a preferência de movimento reduzido.

## 🛠️ Tecnologias

| Área          | Recursos utilizados                                                                     |
| ------------- | --------------------------------------------------------------------------------------- |
| Estrutura     | HTML5 semântico, atributos ARIA                                                         |
| Estilo        | CSS3, variáveis CSS, Grid, Flexbox, `@media`, `transition`, `@keyframes`                |
| Comportamento | JavaScript ES6+ com módulos (`import`/`export`), eventos, RegEx, `localStorage`, `JSON` |
| Versionamento | Git com GitFlow, GitHub (issues, milestones e pull requests)                            |
| Publicação    | GitHub Pages                                                                            |

Nenhuma biblioteca externa foi usada — nem mesmo fontes baixadas da internet.

## Estrutura do projeto

```
Vida-Felina/
├── index.html              # página única: cabeçalho, <main id="app"> e rodapé
├── README.md
├── assets/                 # imagens
│   ├── Gato_lendo.jpg
│   └── gato-idoso-cinza.jpg
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
        ├── menu.js         # menu mobile
        └── contador.js     # contador de voluntários e botão de apagar cadastros
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
| v1.2.1                                                                           | documentação: este README                                                                                                                                                                                                                       |

## Sobre os dados

Os cadastros ficam salvos **apenas no navegador de quem preencheu** (localStorage) e não são enviados para nenhum servidor. Eles podem ser apagados a qualquer momento pelo botão **"Apagar cadastros deste navegador"**, no rodapé. Por ser um projeto de estudo, os dados não são criptografados — não use informações reais.

## Ferramentas de apoio

O desenvolvimento contou com o apoio do **Claude** (Anthropic), um assistente de inteligência artificial, usado como tutor: diagnóstico de bugs, explicação de conceitos, revisão do código e implementação guiada de melhorias. Cada alteração foi explicada antes de ser aplicada e testada no navegador. Os commits feitos com essa ajuda trazem a linha `Co-Authored-By: Claude` no histórico.

## Autoria

**Monique Ribeiro** — estudante de Análise e Desenvolvimento de Sistemas.

> O conteúdo sobre saúde felina é educativo e não substitui a avaliação de um médico-veterinário.
