import { createRouter } from "./modules/router.js";
import { bindFormHandlers } from "./modules/forms.js";
import { initMenu } from "./modules/menu.js";

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

initMenu();
