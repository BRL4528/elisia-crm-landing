import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const FORM_SCRIPT_SRC = "https://api.samasc.com.br/t/form.js";

interface Props {
  formId: string;
  formToken: string;
  className?: string;
}

/**
 * Embed do formulário do Elisia/Samasc.
 *
 * O `form.js` externo faz `querySelectorAll('[data-elisia-form-id]')` UMA vez,
 * no momento em que carrega — não observa o DOM depois disso e não expõe API
 * para remontar. Num SPA React isso gera duas armadilhas:
 *   1. Se o script carregar antes da nossa div existir, o form nunca aparece.
 *   2. Ao navegar de volta para a página, a div é nova mas o script já rodou.
 *
 * Solução: a cada mount deste componente, (re)injetamos o script DEPOIS que a
 * div já está no DOM (useEffect roda pós-render). Removemos qualquer instância
 * anterior do script antes, para forçar uma nova varredura. Marcamos a div com
 * `data-elisia-mounted` e limpamos forms órfãos para evitar duplicação quando o
 * script varre todas as divs da página.
 */
export function ElisiaForm({ formId, formToken, className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Começa limpo: evita form duplicado se o efeito rodar duas vezes
    // (StrictMode em dev) ou numa remontagem.
    container.innerHTML = "";

    // Remove instância anterior do loader para que a nova execução volte a
    // varrer o DOM e encontre esta div já montada.
    document
      .querySelectorAll<HTMLScriptElement>(`script[src="${FORM_SCRIPT_SRC}"]`)
      .forEach((s) => s.remove());

    const script = document.createElement("script");
    script.src = FORM_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (container) container.innerHTML = "";
    };
  }, [formId, formToken]);

  return (
    <div
      ref={mountRef}
      data-elisia-form-id={formId}
      data-elisia-form-token={formToken}
      className={cn("elisia-form-embed", className)}
    />
  );
}
