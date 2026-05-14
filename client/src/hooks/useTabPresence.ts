import { useEffect } from "react";

const DEFAULT_TITLE = "Elisia CRM · cérebro operacional";

/**
 * Messages that cycle through the document.title while the user is on
 * another tab. Designed to read as the system *operating in the background*
 * — magnetic, never desperate.
 */
const AWAY_MESSAGES = [
  "🟢 Elisia em operação",
  "↩ você tem leads esperando",
  "Agent Elisia processando…",
  "🎯 nova oportunidade capturada",
  "↩ volte ao cérebro operacional",
];

/**
 * Favicon shown while the tab is BACKGROUND — emerald dot in the corner
 * signals "novo evento" subliminarmente, sem ser intrusivo.
 */
const FAVICON_DEFAULT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
      <defs>
        <radialGradient id='c' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#5eead4'/>
          <stop offset='60%' stop-color='#10b981'/>
          <stop offset='100%' stop-color='#0f766e' stop-opacity='0'/>
        </radialGradient>
        <linearGradient id='r' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#34d399'/>
          <stop offset='100%' stop-color='#22d3ee'/>
        </linearGradient>
      </defs>
      <rect width='32' height='32' rx='6' fill='#0b1418'/>
      <circle cx='16' cy='16' r='12' stroke='url(#r)' stroke-width='1.6' fill='none' opacity='0.85'/>
      <circle cx='16' cy='16' r='8' stroke='url(#r)' stroke-width='1' fill='none' opacity='0.55'/>
      <circle cx='16' cy='16' r='5' fill='url(#c)'/>
      <circle cx='16' cy='16' r='2' fill='#a5f3fc'/>
    </svg>`,
  );

const FAVICON_ALERT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
      <defs>
        <radialGradient id='c' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#5eead4'/>
          <stop offset='60%' stop-color='#10b981'/>
          <stop offset='100%' stop-color='#0f766e' stop-opacity='0'/>
        </radialGradient>
      </defs>
      <rect width='32' height='32' rx='6' fill='#0b1418'/>
      <circle cx='16' cy='16' r='5' fill='url(#c)' opacity='0.55'/>
      <!-- Bright pulse dot in the corner = "novo evento" -->
      <circle cx='25' cy='7' r='6' fill='#34d399'/>
      <circle cx='25' cy='7' r='3' fill='#a7f3d0'/>
    </svg>`,
  );

export function useTabPresence() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    let messageInterval: number | null = null;
    let faviconInterval: number | null = null;
    let messageIdx = 0;
    let faviconToggle = false;

    const setFavicon = (href: string) => {
      const link = document.getElementById("favicon") as HTMLLinkElement | null;
      if (link) link.href = href;
    };

    const startAwayMode = () => {
      messageIdx = 0;
      document.title = AWAY_MESSAGES[0];
      // Cycle messages every 2.6s — readable, not jittery
      messageInterval = window.setInterval(() => {
        messageIdx = (messageIdx + 1) % AWAY_MESSAGES.length;
        document.title = AWAY_MESSAGES[messageIdx];
      }, 2600);

      // Soft favicon pulse — alternate alert ↔ default each 1.2s
      faviconToggle = false;
      setFavicon(FAVICON_ALERT);
      faviconInterval = window.setInterval(() => {
        faviconToggle = !faviconToggle;
        setFavicon(faviconToggle ? FAVICON_DEFAULT : FAVICON_ALERT);
      }, 1200);
    };

    const stopAwayMode = () => {
      if (messageInterval) {
        clearInterval(messageInterval);
        messageInterval = null;
      }
      if (faviconInterval) {
        clearInterval(faviconInterval);
        faviconInterval = null;
      }
      document.title = DEFAULT_TITLE;
      setFavicon(FAVICON_DEFAULT);
    };

    const onVisibility = () => {
      if (document.hidden) startAwayMode();
      else stopAwayMode();
    };

    document.title = DEFAULT_TITLE;
    setFavicon(FAVICON_DEFAULT);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopAwayMode();
    };
  }, []);
}
