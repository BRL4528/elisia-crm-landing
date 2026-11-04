import { useEffect, useId, useState, type ReactNode } from "react";
import { ArrowRight, Bell, Download, Plus, RefreshCw, ShieldCheck } from "lucide-react";
import "@/landing/landing.css";
import { LandingHeader } from "@/landing/LandingHeader";
import { LandingFooter } from "@/landing/LandingFooter";
import { LINKS } from "@/landing/content";
import { Tick } from "@/landing/LandingBits";
import { useLandingTheme } from "@/landing/useLandingTheme";

type Os = "windows" | "mac" | "linux";
type Detected = Os | "mobile" | "unknown";

interface Asset {
  name: string;
  size: number;
  url: string;
}

interface Release {
  version: string;
  assets: Asset[];
}

type ReleaseState =
  | { status: "loading" }
  | { status: "ready"; release: Release }
  | { status: "error" };

interface FileKind {
  label: string;
  match: RegExp;
}

interface Platform {
  id: Os;
  name: string;
  requirement: string;
  /** O primeiro é o arquivo do botão principal; os demais aparecem como alternativa. */
  files: FileKind[];
}

const PLATFORMS: Platform[] = [
  {
    id: "windows",
    name: "Windows",
    requirement: "Windows 10 ou 11, 64 bits",
    files: [
      { label: "Instalador (.exe)", match: /_x64-setup\.exe$/ },
      { label: "Pacote MSI para TI (.msi)", match: /\.msi$/ },
    ],
  },
  {
    id: "mac",
    name: "macOS",
    requirement: "macOS 10.15 ou mais novo, Apple Silicon e Intel",
    files: [{ label: "Imagem de disco (.dmg)", match: /\.dmg$/ }],
  },
  {
    id: "linux",
    name: "Linux",
    requirement: "64 bits, Ubuntu 22.04, Debian 12, Fedora 38 ou mais novos",
    files: [
      // Só o AppImage recebe a atualização automática do Tauri no Linux.
      { label: "AppImage (recomendado)", match: /\.AppImage$/ },
      { label: "Ubuntu e Debian (.deb)", match: /\.deb$/ },
      { label: "Fedora e openSUSE (.rpm)", match: /\.rpm$/ },
    ],
  },
];

const BENEFITS = [
  {
    icon: <Bell size={18} strokeWidth={2} />,
    title: "Aviso de cada conversa",
    body: "Notificação do sistema e contador no ícone, mesmo com a janela minimizada.",
  },
  {
    icon: <RefreshCw size={18} strokeWidth={2} />,
    title: "Sempre atualizado",
    body: "O app baixa as novas versões sozinho e instala quando você quiser.",
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={2} />,
    title: "Mesmo login, mesmos dados",
    body: "É a Elisia inteira, com as permissões da sua conta. Nada fica salvo fora do sistema.",
  },
];

const HELP = [
  {
    q: "O Windows mostrou “O Windows protegeu o computador”",
    a: "O aviso aparece porque o instalador ainda é novo para o filtro da Microsoft. Clique em “Mais informações” e depois em “Executar assim mesmo”.",
  },
  {
    q: "O macOS não deixa abrir o app",
    a: "Abra o arquivo .dmg e arraste a Elisia para Aplicativos. Na primeira vez, se aparecer um aviso, vá em Ajustes do Sistema, Privacidade e Segurança, e clique em “Abrir mesmo assim”.",
  },
  {
    q: "Como abrir o AppImage no Linux?",
    a: "Dê permissão de execução (botão direito, Propriedades, Permitir executar, ou chmod +x no terminal) e abra com dois cliques. Quem usa Ubuntu ou Fedora pode preferir o .deb ou o .rpm.",
  },
  {
    q: "Preciso desinstalar a versão antiga?",
    a: "Não. Quem já tem o app recebe a versão nova pela atualização automática. Instalar por cima também funciona.",
  },
];

function detectOs(): Detected {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || navigator.platform || "";
  // iPadOS se apresenta como Mac; o toque denuncia.
  if (/Android|iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1)) {
    return "mobile";
  }
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
  if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) return "mac";
  if (/CrOS/i.test(ua)) return "unknown";
  if (/Linux|X11/i.test(platform) || /Linux/i.test(ua)) return "linux";
  return "unknown";
}

function useLatestRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>({ status: "loading" });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(LINKS.desktopReleasesApi, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { tag_name: string; assets: { name: string; size: number; browser_download_url: string }[] }) => {
        setState({
          status: "ready",
          release: {
            version: data.tag_name.replace(/^v/, ""),
            assets: data.assets
              .filter((a) => !a.name.endsWith(".sig"))
              .map((a) => ({ name: a.name, size: a.size, url: a.browser_download_url })),
          },
        });
      })
      .catch((err: unknown) => {
        if ((err as Error).name !== "AbortError") setState({ status: "error" });
      });
    return () => ctrl.abort();
  }, []);

  return state;
}

function findAsset(state: ReleaseState, kind: FileKind): Asset | null {
  if (state.status !== "ready") return null;
  return state.release.assets.find((a) => kind.match.test(a.name)) ?? null;
}

const sizeFmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
function formatSize(bytes: number) {
  return `${sizeFmt.format(bytes / 1024 / 1024)} MB`;
}

/** Sem a API do GitHub (limite por IP, rede bloqueada), o link cai na página da release. */
function hrefFor(state: ReleaseState, kind: FileKind) {
  return findAsset(state, kind)?.url ?? LINKS.desktopReleasesPage;
}

export default function Downloads() {
  useLandingTheme();
  const release = useLatestRelease();
  const [os, setOs] = useState<Detected>("unknown");

  useEffect(() => {
    setOs(detectOs());
    // Navegação pelo wouter não volta o scroll para o topo.
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Baixar o app da Elisia para Windows, macOS e Linux";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const current = PLATFORMS.find((p) => p.id === os);

  return (
    <div className="lp">
      <a className="skip" href="#top">
        Pular para o conteúdo
      </a>
      <LandingHeader />

      <section className="hero dl-hero" id="top">
        <div className="wrap">
          <div className="hero-c">
            <span className="eyebrow">App para computador</span>
            <h1>
              A Elisia inteira, <em>direto no seu computador</em>
            </h1>
            <p className="hero-s">
              Abra com um clique, receba aviso de cada conversa nova e deixe o sistema se
              atualizar sozinho. É o mesmo login que você já usa no navegador.
            </p>

            <div className="dl-main">
              {current ? (
                <>
                  <DownloadButton platform={current} release={release} />
                  <p className="dl-hint">
                    {current.requirement}.{" "}
                    <a href="#plataformas">Outras plataformas</a>
                  </p>
                </>
              ) : (
                <div className="dl-other">
                  <p>
                    {os === "mobile"
                      ? "O app é para computador. No celular, use a Elisia direto no navegador."
                      : "Escolha abaixo a versão do seu sistema."}
                  </p>
                  <div className="hero-a">
                    {os === "mobile" && (
                      <a className="btn btn-p btn-lg" href={LINKS.webApp}>
                        Abrir no navegador
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </a>
                    )}
                    <a className="btn btn-g btn-lg" href="#plataformas">
                      Ver todas as versões
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="dl-benefits">
            {BENEFITS.map((b) => (
              <div className="feat" key={b.title}>
                <div className="feat-i" aria-hidden>
                  {b.icon}
                </div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" id="plataformas">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Todas as versões</span>
            <h2 className="h2">Escolha o seu sistema</h2>
            <p className="lead">
              {release.status === "ready"
                ? `Versão ${release.release.version}, a mesma para todos os sistemas.`
                : "A mesma versão para todos os sistemas."}
            </p>
          </div>
          <div className="dl-grid">
            {PLATFORMS.map((p) => (
              <div className="dl-card" key={p.id} data-current={p.id === os}>
                <div className="dl-card-h">
                  <span className="dl-os" aria-hidden>
                    <OsIcon os={p.id} />
                  </span>
                  <div>
                    <h3>{p.name}</h3>
                    {p.id === os && <span className="dl-you">Seu sistema</span>}
                  </div>
                </div>
                <p className="dl-req">{p.requirement}</p>
                <ul className="dl-files">
                  {p.files.map((f) => {
                    const asset = findAsset(release, f);
                    return (
                      <li key={f.label}>
                        <a href={hrefFor(release, f)}>
                          <Download size={15} strokeWidth={2.2} aria-hidden />
                          <span>{f.label}</span>
                          {asset && <span className="dl-size">{formatSize(asset.size)}</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="dl-all">
            Prefere usar sem instalar? <a href={LINKS.webApp}>Abra a Elisia no navegador</a>.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="faq">
            <div>
              <span className="eyebrow">Instalação</span>
              <h2 className="h2" style={{ fontSize: 34 }}>
                Se aparecer algum aviso
              </h2>
              <p className="lead" style={{ fontSize: "15.5px" }}>
                Ficou travado em algum passo? Fale com a gente pelo WhatsApp que o time ajuda na
                hora.
              </p>
              <a className="btn btn-g" href="/#contato" style={{ marginTop: 22 }}>
                Falar com o time
              </a>
            </div>
            <div className="faq-l">
              {HELP.map((item) => (
                <details className="q" key={item.q}>
                  <summary>
                    {item.q}
                    <Plus className="pm" size={18} strokeWidth={2.4} aria-hidden />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function DownloadButton({ platform, release }: { platform: Platform; release: ReleaseState }) {
  const kind = platform.files[0];
  const asset = findAsset(release, kind);
  const ext = asset?.name.split(".").pop();

  let detail = "Buscando a versão mais recente";
  if (release.status === "ready" && asset) {
    detail = `Versão ${release.release.version} · ${formatSize(asset.size)} · .${ext}`;
  } else if (release.status !== "loading") {
    detail = "Abre a página da versão mais recente";
  }

  return (
    <a className="dl-btn" href={hrefFor(release, kind)} aria-busy={release.status === "loading"}>
      <span className="dl-btn-i" aria-hidden>
        <OsIcon os={platform.id} />
      </span>
      <span className="dl-btn-t">
        <span className="t1">Baixar para {platform.name}</span>
        <span className="t2">{detail}</span>
      </span>
      <Download className="dl-btn-a" size={20} strokeWidth={2.2} aria-hidden />
    </a>
  );
}

function OsIcon({ os }: { os: Os }): ReactNode {
  // O id do React 18 traz ":" e quebraria a referência url(#...).
  const maskId = `tux${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  if (os === "windows") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M3 5.1 10.4 4v7.2H3V5.1Zm0 13.8 7.4 1.1v-7.1H3v6Zm8.3 1.2L21 21.5V12.9h-9.7v7.2Zm0-16.2v7.3H21V2.5l-9.7 1.4Z" />
      </svg>
    );
  }
  if (os === "mac") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M16.37 12.6c-.03-2.6 2.13-3.86 2.23-3.92-1.22-1.78-3.11-2.02-3.78-2.05-1.6-.16-3.13.95-3.94.95-.82 0-2.07-.93-3.4-.9-1.75.03-3.37 1.02-4.27 2.58-1.83 3.17-.47 7.85 1.31 10.42.87 1.26 1.9 2.67 3.25 2.62 1.31-.05 1.8-.84 3.38-.84s2.02.84 3.4.82c1.41-.03 2.3-1.28 3.15-2.54 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.74-1.05-2.76-4.19ZM13.78 5c.72-.88 1.21-2.09 1.08-3.3-1.04.04-2.3.69-3.04 1.57-.67.77-1.25 2.01-1.1 3.2 1.16.09 2.35-.59 3.06-1.47Z" />
      </svg>
    );
  }
  // Pinguim simplificado: silhueta com barriga e olhos vazados.
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <mask id={maskId}>
        <rect width="24" height="24" fill="#fff" />
        <ellipse cx="12" cy="15.4" rx="4.1" ry="5.4" fill="#000" />
        <circle cx="10.4" cy="7.4" r="1.05" fill="#000" />
        <circle cx="13.6" cy="7.4" r="1.05" fill="#000" />
      </mask>
      <path
        mask={`url(#${maskId})`}
        fill="currentColor"
        d="M12 2C9 2 7.2 4.5 7.2 7.8c0 1.3-.6 2.5-1.6 3.9C4.3 13.4 3.2 15.5 3.2 18c0 1 .5 1.7 1.3 2L7.4 21.5h9.2l2.9-1.5c.8-.3 1.3-1 1.3-2 0-2.5-1.1-4.6-2.4-6.3-1-1.4-1.6-2.6-1.6-3.9C16.8 4.5 15 2 12 2Z"
      />
    </svg>
  );
}
