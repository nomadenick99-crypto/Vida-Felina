import { storage, STORAGE_KEYS } from "./storage.js";

// Modo de alto contraste: segue a configuração do sistema
// (prefers-contrast: more) até a pessoa escolher pelo botão;
// a partir daí, vale a escolha salva no navegador.
export function initAltoContraste() {
  const botao = document.querySelector(".contraste-toggle");
  const sistema = window.matchMedia("(prefers-contrast: more)");

  function aplicar(ativo) {
    document.documentElement.classList.toggle("alto-contraste", ativo);
    botao?.setAttribute("aria-pressed", String(ativo));
  }

  const escolhaSalva = storage.get(STORAGE_KEYS.altoContraste, null);
  aplicar(typeof escolhaSalva === "boolean" ? escolhaSalva : sistema.matches);

  // Se a pessoa ainda não escolheu, acompanha mudanças no sistema
  sistema.addEventListener("change", (event) => {
    if (typeof storage.get(STORAGE_KEYS.altoContraste, null) !== "boolean") {
      aplicar(event.matches);
    }
  });

  botao?.addEventListener("click", () => {
    const ativo = !document.documentElement.classList.contains("alto-contraste");
    aplicar(ativo);
    storage.set(STORAGE_KEYS.altoContraste, ativo);
  });
}
