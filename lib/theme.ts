// Paper (light) and night (dark) themes.
//
// By default the site follows the reader's system setting (the CSS in app/globals.css keys
// the night tokens off prefers-color-scheme). The switch in the nav records an explicit
// choice in localStorage and on <html data-theme>, which overrides the system; choosing the
// theme the system already asks for clears the record, so the site follows the system again.

export type Theme = "light" | "dark";

export const THEME_KEY = "theme";
export const THEME_COLOR: Record<Theme, string> = { light: "#f2f1ec", dark: "#161512" };

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

export function systemTheme(): Theme {
  return media().matches ? "dark" : "light";
}

/** The theme the page is showing right now. */
export function currentTheme(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : systemTheme();
}

/** Calls back whenever the shown theme may have changed (the switch, or the system). */
export function subscribeTheme(cb: () => void): () => void {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = media();
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}

/**
 * Browser chrome (the address bar on phones) follows the shown theme. The page carries one
 * theme-color per system setting; a reader's pick goes in a meta of its own, first in <head>,
 * which browsers prefer. The server-rendered tags are left untouched for React.
 */
function syncThemeColor() {
  const explicit = document.documentElement.getAttribute("data-theme") as Theme | null;
  let m = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][data-pick]');
  if (!explicit) {
    m?.remove();
    return;
  }
  if (!m) {
    m = document.createElement("meta");
    m.name = "theme-color";
    m.setAttribute("data-pick", "");
    document.head.prepend(m);
  }
  m.content = THEME_COLOR[explicit];
}

export function setTheme(t: Theme) {
  const root = document.documentElement;
  if (t === systemTheme()) {
    root.removeAttribute("data-theme");
    try { localStorage.removeItem(THEME_KEY); } catch {}
  } else {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  }
  syncThemeColor();
}

/**
 * Runs in <head> before the page paints, so a reader who chose a theme never sees a flash
 * of the other one. Kept tiny and dependency-free; it mirrors setTheme above.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")return;document.documentElement.setAttribute("data-theme",t);var m=document.createElement("meta");m.name="theme-color";m.setAttribute("data-pick","");m.content=t==="dark"?"${THEME_COLOR.dark}":"${THEME_COLOR.light}";document.head.prepend(m)}catch(e){}})();`;
