import { Link } from "wouter";
import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.05] mt-8 backdrop-blur-md bg-background/40">
      <div className="container py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <BrandMark size={26} />
              <div className="flex flex-col leading-none">
                <span className="text-[14px] font-semibold tracking-tight">Elisia CRM</span>
                <span className="mono text-[9px] text-muted-foreground tracking-widest uppercase">
                  operational intelligence
                </span>
              </div>
            </div>
            <p className="mt-5 text-[13px] text-foreground/60 leading-relaxed max-w-sm font-light">
              O sistema operacional para empresas que tratam conversas, dados e
              decisões como uma única coisa.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            <div>
              <h4 className="mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70 mb-4">
                Produto
              </h4>
              <ul className="space-y-2 text-[13px] text-foreground/65">
                <li><a href="#core" className="hover:text-foreground transition-colors">Núcleo</a></li>
                <li><a href="#influx" className="hover:text-foreground transition-colors">Canais</a></li>
                <li><a href="#synapse" className="hover:text-foreground transition-colors">Automação</a></li>
                <li><a href="#command" className="hover:text-foreground transition-colors">Operação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70 mb-4">
                Empresa
              </h4>
              <ul className="space-y-2 text-[13px] text-foreground/65">
                <li><Link href="/privacy-policy"><a className="hover:text-foreground transition-colors">Privacidade</a></Link></li>
                <li><Link href="/terms-of-use"><a className="hover:text-foreground transition-colors">Termos de uso</a></Link></li>
                <li><a href="mailto:contato@elisiacrm.com" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70 mb-4">
                Plataforma
              </h4>
              <ul className="space-y-2 text-[13px] text-foreground/65">
                <li><a href="https://app.elisiacrm.com/sign-in" className="hover:text-foreground transition-colors">Entrar</a></li>
                <li><a href="https://app.elisiacrm.com/sign-up" className="hover:text-foreground transition-colors">Realizar cadastro</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            © 2025 Elisia CRM · operational intelligence system
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground inline-flex items-center gap-2">
            <span className="size-1 rounded-full bg-emerald-400 pulse-dot" />
            sistema operando
          </p>
        </div>
      </div>
    </footer>
  );
}
