import { useEffect } from "react";

/**
 * Aplica o tema claro das páginas comerciais (`html[data-page="landing"]`) e devolve o
 * estado anterior ao sair. Sem o cleanup, `/experiencia` herdaria o fundo branco.
 */
export function useLandingTheme() {
  useEffect(() => {
    const html = document.documentElement;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const previousPage = html.dataset.page;
    const previousThemeColor = themeColor?.getAttribute("content") ?? null;

    html.dataset.page = "landing";
    themeColor?.setAttribute("content", "#ffffff");

    return () => {
      if (previousPage === undefined) {
        delete html.dataset.page;
      } else {
        html.dataset.page = previousPage;
      }
      if (previousThemeColor !== null) {
        themeColor?.setAttribute("content", previousThemeColor);
      }
    };
  }, []);
}
