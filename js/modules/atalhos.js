// Link "Pular para o conteúdo": leva o foco direto ao <main>.
// O clique é tratado aqui porque o # da URL é usado pelas rotas da SPA
// (mudar para #app levaria à página "não encontrada").
export function initPularConteudo() {
  const link = document.querySelector(".skip-link");
  const conteudo = document.getElementById("app");
  if (!link || !conteudo) return;

  link.addEventListener("click", (event) => {
    event.preventDefault();
    const titulo = conteudo.querySelector("h1");
    const alvo = titulo ?? conteudo;
    alvo.setAttribute("tabindex", "-1");
    alvo.focus();
  });
}
