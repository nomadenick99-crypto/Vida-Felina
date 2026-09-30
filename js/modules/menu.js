export function initMenu() {
  const menuToggle = document.querySelector(".menu-mobile");
  const dropdown = document.querySelector(".DropDown-content");
  if (!menuToggle || !dropdown) return;

  function setMenuAberto(aberto) {
    dropdown.classList.toggle("aberto", aberto);
    menuToggle.setAttribute("aria-expanded", String(aberto));
  }

  menuToggle.addEventListener("click", () => {
    setMenuAberto(!dropdown.classList.contains("aberto"));
  });

  // fecha o menu sempre que a página (rota) mudar
  window.addEventListener("hashchange", () => setMenuAberto(false));

  // Esc fecha o menu aberto e devolve o foco ao botão que o abriu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.classList.contains("aberto")) {
      setMenuAberto(false);
      menuToggle.focus();
    }
  });
}
