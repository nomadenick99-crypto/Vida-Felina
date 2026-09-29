import { storage } from "./storage.js";

// Mostra no rodapé quantas pessoas já se cadastraram e atualiza
// na hora em que um novo cadastro é salvo (evento "cadastro:salvo")
export function initContador() {
  const alvo = document.querySelector(".footer-contador");
  const botaoLimpar = document.querySelector(".footer-limpar");
  if (!alvo) return;

  function atualizar(total) {
    const palavra = total === 1 ? "voluntário cadastrado" : "voluntários cadastrados";
    alvo.textContent = total > 0 ? `Rede Vida Felina: ${total} ${palavra}` : "";
    if (botaoLimpar) botaoLimpar.hidden = total === 0;
  }

  atualizar(storage.getRegistros().length);

  window.addEventListener("cadastro:salvo", (event) => {
    atualizar(event.detail.total);
  });

  // Apaga os cadastros deste navegador depois de confirmar com a pessoa
  botaoLimpar?.addEventListener("click", () => {
    const confirmou = window.confirm(
      "Apagar todos os cadastros salvos neste navegador? Essa ação não pode ser desfeita.",
    );
    if (!confirmou) return;

    if (!storage.limparRegistros()) {
      window.alert("Não foi possível apagar os cadastros no momento.");
      return;
    }

    atualizar(0);
    window.dispatchEvent(new CustomEvent("cadastros:apagados"));
  });
}
