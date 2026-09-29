import { templates } from "./templates.js";

const routeTitles = {
  "#home": "Vida Felina — Geriatria e Cuidado",
  "#projetos": "Vida Felina — Projetos",
  "#cadastro": "Vida Felina — Faça parte",
  "#confirmacao": "Vida Felina — Cadastro confirmado",
  notFound: "Vida Felina — Página não encontrada",
};

export function createRouter({ app }) {
  const updateNavState = (route) => {
    const links = document.querySelectorAll(".route-link");
    links.forEach((link) => {
      const active = link.getAttribute("href") === route;
      link.setAttribute("aria-current", active ? "page" : "false");
    });
  };

  const normalizeRoute = (hash = window.location.hash) => {
    if (!hash || !hash.startsWith("#")) {
      return "#home";
    }

    if (Object.prototype.hasOwnProperty.call(templates, hash)) {
      return hash;
    }

    return "notFound";
  };

  const render = () => {
    const route = normalizeRoute();
    const template = templates[route] ?? templates.notFound;
    const content = template();
    app.innerHTML = content;
    document.title = routeTitles[route] ?? "Vida Felina";
    updateNavState(route === "notFound" ? "#home" : route);
    window.dispatchEvent(
      new CustomEvent("route:rendered", { detail: { route } }),
    );
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return {
    init() {
      window.addEventListener("hashchange", render);
      render();
    },
  };
}
