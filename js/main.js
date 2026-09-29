import { createRouter } from "./modules/router.js";
import { bindFormHandlers } from "./modules/forms.js";

const app = document.getElementById("app");

if (!app) {
  throw new Error("Elemento #app não encontrado.");
}

// replaceState troca a URL sem disparar "hashchange" (evita desenhar a página 2x)
if (!window.location.hash) {
  history.replaceState(null, "", "#home");
}

window.addEventListener("route:rendered", () => {
  bindFormHandlers();
});

const router = createRouter({ app });
router.init();

const menuToggle = document.querySelector(".menu-mobile");
const dropdown = document.querySelector(".DropDown-content");

function setMenuAberto(aberto) {
  dropdown?.classList.toggle("aberto", aberto);
  menuToggle?.setAttribute("aria-expanded", String(aberto));
}

menuToggle?.addEventListener("click", () => {
  setMenuAberto(!dropdown.classList.contains("aberto"));
});

// fecha o menu sempre que a página (rota) mudar
window.addEventListener("hashchange", () => setMenuAberto(false));
