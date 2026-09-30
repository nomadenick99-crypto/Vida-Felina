// Liga o botão × do aviso da página de confirmação
export function bindConfirmacao() {
  const botaoFechar = document.querySelector(".toast-close");
  const aviso = document.querySelector(".confirmation-toast");
  if (!botaoFechar || !aviso) return;

  botaoFechar.addEventListener("click", () => {
    aviso.hidden = true;
    // O foco ia sumir junto com o aviso; leva para o conteúdo principal
    document.getElementById("app")?.focus();
  });
}
