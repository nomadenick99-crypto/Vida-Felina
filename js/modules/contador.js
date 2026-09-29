import { storage } from "./storage.js";

// Mostra no rodapé quantas pessoas já se cadastraram e atualiza
// na hora em que um novo cadastro é salvo (evento "cadastro:salvo")
export function initContador() {
  const alvo = document.querySelector(".footer-contador");
  if (!alvo) return;

  function atualizar(total) {
    const palavra = total === 1 ? "voluntário cadastrado" : "voluntários cadastrados";
    alvo.textContent = total > 0 ? `Rede Vida Felina: ${total} ${palavra}` : "";
  }

  atualizar(storage.getRegistros().length);

  window.addEventListener("cadastro:salvo", (event) => {
    atualizar(event.detail.total);
  });
}
