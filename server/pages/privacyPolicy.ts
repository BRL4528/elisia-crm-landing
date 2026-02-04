export function generatePrivacyPolicyHtml(baseUrl: string): string {
  // Garante que baseUrl não tem barra final
  const base = baseUrl.replace(/\/+$/, "");

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta property="fb:app_id" content="1377626990609802" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Política de Privacidade – Elisia CRM</title>
    <meta name="description" content="Política de Privacidade da ZMG SOLUTIONS LTDA – conheça como coletamos, usamos e protegemos os seus dados pessoais." />

    <!-- Open Graph (Facebook) -->
    <meta property="og:title" content="Política de Privacidade – Elisia CRM" />
    <meta property="og:description" content="Política de Privacidade da ZMG SOLUTIONS LTDA – conheça como coletamos, usamos e protegemos os seus dados pessoais." />
    <meta property="og:image" content="${base}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${base}/privacy-policy" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Elisia CRM" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: "Inter", sans-serif;
        background-color: #ffffff;
        color: #374151;
        line-height: 1.7;
        padding: 2rem 1rem;
        min-height: 100vh;
      }

      .container { max-width: 800px; margin: 0 auto; }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: #6b7280;
        text-decoration: none;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        transition: color 0.2s;
      }
      .back-link:hover { color: #111827; }
      .back-link svg { width: 16px; height: 16px; }

      .card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        overflow: hidden;
      }

      .card-header {
        padding: 1.75rem 2rem 1.25rem;
        border-bottom: 1px solid #e5e7eb;
      }
      .card-header h1 { font-size: 1.875rem; font-weight: 700; color: #6366f1; }
      .card-header p { font-size: 0.85rem; color: #9ca3af; margin-top: 0.5rem; }

      .card-body { padding: 2rem; }
      .card-body section { margin-bottom: 1.75rem; }
      .card-body h2 { font-size: 1.2rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; }
      .card-body h3 { font-size: 1.05rem; font-weight: 500; color: #111827; margin-top: 1rem; margin-bottom: 0.5rem; }
      .card-body p { margin-bottom: 0.75rem; }
      .card-body ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; }
      .card-body ul li { margin-bottom: 0.4rem; }
      .card-body strong { color: #111827; }

      @media (max-width: 600px) {
        body { padding: 1rem 0.75rem; }
        .card-header, .card-body { padding-left: 1.25rem; padding-right: 1.25rem; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="/" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Voltar para Home
      </a>

      <div class="card">
        <div class="card-header">
          <h1>Política de Privacidade</h1>
          <p>Elisia CRM – ZMG SOLUTIONS LTDA</p>
          <p style="margin-top: 0.25rem; font-size: 0.8rem;">Última atualização: 04 de fevereiro de 2026</p>
        </div>

        <div class="card-body">
          <section>
            <p>A ZMG SOLUTIONS LTDA, pessoa jurídica de direito privado, doravante denominada "Elisia CRM", "nós" ou "nosso", respeita a privacidade e a proteção dos dados pessoais de seus usuários, clientes e visitantes, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD) e com as políticas e termos aplicáveis da Meta Platforms, Inc., incluindo o uso da WhatsApp Business API.</p>
            <p>Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os dados pessoais tratados por meio do site https://www.elisiacrm.com e das funcionalidades do Elisia CRM.</p>
          </section>

          <section>
            <h2>1. DADOS PESSOAIS COLETADOS</h2>
            <p>Os dados pessoais tratados pelo Elisia CRM variam de acordo com a forma de interação do usuário com nossos serviços e podem incluir, entre outros:</p>
            <h3>1.1 Dados fornecidos diretamente pelo usuário</h3>
            <ul>
              <li>Nome completo ou nome empresarial;</li>
              <li>Número de telefone;</li>
              <li>Endereço de e-mail;</li>
              <li>Conteúdo das mensagens enviadas por meio de canais de comunicação integrados, incluindo WhatsApp;</li>
              <li>Informações fornecidas voluntariamente em formulários, cadastros ou atendimentos.</li>
            </ul>
            <h3>1.2 Dados coletados automaticamente</h3>
            <ul>
              <li>Endereço IP;</li>
              <li>Data e hora de acesso;</li>
              <li>Informações sobre dispositivo, navegador e sistema operacional;</li>
              <li>Registros de acesso e logs de atividades;</li>
              <li>Metadados de comunicação (status de envio, entrega e leitura de mensagens, quando aplicável).</li>
            </ul>
          </section>

          <section>
            <h2>2. FINALIDADE DO TRATAMENTO DOS DADOS</h2>
            <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
            <ul>
              <li>Viabilizar o funcionamento do Elisia CRM;</li>
              <li>Realizar atendimentos, comunicações e interações com usuários e clientes;</li>
              <li>Automatizar fluxos de atendimento e relacionamento;</li>
              <li>Registrar e organizar históricos de comunicação no CRM;</li>
              <li>Integrar serviços de mensagens, incluindo a WhatsApp Business API;</li>
              <li>Melhorar a experiência do usuário e a qualidade dos serviços prestados;</li>
              <li>Cumprir obrigações legais, regulatórias e contratuais;</li>
              <li>Garantir a segurança da plataforma e prevenir fraudes.</li>
            </ul>
          </section>

          <section>
            <h2>3. BASE LEGAL PARA O TRATAMENTO</h2>
            <p>O tratamento de dados pessoais realizado pelo Elisia CRM possui fundamento nas seguintes bases legais previstas na LGPD, conforme aplicável:</p>
            <ul>
              <li>Consentimento do titular;</li>
              <li>Execução de contrato ou de procedimentos preliminares relacionados a contrato;</li>
              <li>Cumprimento de obrigação legal ou regulatória;</li>
              <li>Exercício regular de direitos em processo judicial, administrativo ou arbitral;</li>
              <li>Legítimo interesse, respeitados os direitos e liberdades fundamentais do titular.</li>
            </ul>
          </section>

          <section>
            <h2>4. TRATAMENTO DE DADOS POR INTEGRAÇÕES COM WHATSAPP (META)</h2>
            <p>O Elisia CRM utiliza integrações com produtos da Meta Platforms, Inc., incluindo a WhatsApp Business API, para possibilitar comunicações, atendimentos automatizados e gestão de relacionamento com clientes.</p>
            <p>No contexto dessas integrações, poderão ser tratados os seguintes dados pessoais, conforme disponibilizados pelo próprio titular por meio do WhatsApp:</p>
            <ul>
              <li>Número de telefone;</li>
              <li>Nome e informações do perfil do WhatsApp;</li>
              <li>Conteúdo das mensagens trocadas;</li>
              <li>Data, hora e metadados das interações;</li>
              <li>Identificadores técnicos necessários para a entrega e gestão das mensagens.</li>
            </ul>
            <p>Esses dados são utilizados exclusivamente para as finalidades descritas nesta Política.</p>
            <p>A ZMG SOLUTIONS LTDA atua como controladora independente dos dados pessoais tratados no âmbito do Elisia CRM, em conformidade com a LGPD e com os termos e políticas da Meta.</p>
          </section>

          <section>
            <h2>5. COMPARTILHAMENTO DE DADOS</h2>
            <p>Os dados pessoais poderão ser compartilhados nas seguintes hipóteses:</p>
            <ul>
              <li>Com a Meta Platforms, Inc., estritamente para viabilizar o uso da WhatsApp Business API;</li>
              <li>Com fornecedores e prestadores de serviço essenciais para a operação da plataforma, como serviços de hospedagem em nuvem, infraestrutura tecnológica, automação, análise de dados e suporte técnico;</li>
              <li>Com autoridades públicas, administrativas ou judiciais, quando houver obrigação legal ou determinação competente.</li>
            </ul>
            <p>O Elisia CRM não vende, aluga ou comercializa dados pessoais.</p>
          </section>

          <section>
            <h2>6. ARMAZENAMENTO E RETENÇÃO DOS DADOS</h2>
            <p>Os dados pessoais serão armazenados em ambientes seguros e controlados, pelo período necessário para cumprir as finalidades para as quais foram coletados, bem como para atender obrigações legais, contratuais ou regulatórias.</p>
            <p>Após o término da finalidade ou mediante solicitação do titular, os dados poderão ser eliminados ou anonimizados, respeitados os prazos legais aplicáveis.</p>
          </section>

          <section>
            <h2>7. DIREITOS DOS TITULARES DE DADOS</h2>
            <p>Nos termos da LGPD, o titular dos dados pessoais poderá, a qualquer momento, solicitar:</p>
            <ul>
              <li>Confirmação da existência de tratamento de dados;</li>
              <li>Acesso aos dados pessoais;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>Portabilidade dos dados, quando aplicável;</li>
              <li>Eliminação dos dados tratados com base no consentimento;</li>
              <li>Informações sobre compartilhamento de dados;</li>
              <li>Revogação do consentimento, quando aplicável.</li>
            </ul>
          </section>

          <section>
            <h2>8. SOLICITAÇÕES E CANAL DE CONTATO</h2>
            <p>As solicitações relacionadas a dados pessoais poderão ser realizadas por meio do seguinte canal:</p>
            <p><strong>E-mail:</strong> privacidade@elisiacrm.com</p>
            <p>As solicitações serão analisadas e respondidas dentro dos prazos previstos em lei.</p>
          </section>

          <section>
            <h2>9. SEGURANÇA DA INFORMAÇÃO</h2>
            <p>O Elisia CRM adota medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, destruição, perda, alteração, comunicação ou difusão indevida, em conformidade com os padrões de segurança da informação e exigências regulatórias aplicáveis.</p>
          </section>

          <section>
            <h2>10. TRANSFERÊNCIA INTERNACIONAL DE DADOS</h2>
            <p>Os dados pessoais poderão ser transferidos e tratados em servidores localizados fora do Brasil, especialmente em razão da utilização de serviços de infraestrutura em nuvem e integrações com fornecedores internacionais, incluindo a Meta Platforms, Inc., sempre observadas as garantias adequadas previstas na LGPD.</p>
          </section>

          <section>
            <h2>11. ALTERAÇÕES NESTA POLÍTICA</h2>
            <p>Esta Política de Privacidade poderá ser atualizada a qualquer momento, visando refletir alterações legais, regulatórias ou operacionais. A versão mais recente estará sempre disponível no site do Elisia CRM.</p>
          </section>

          <section>
            <h2>12. DISPOSIÇÕES GERAIS</h2>
            <p>Ao utilizar os serviços do Elisia CRM, o usuário declara estar ciente e de acordo com os termos desta Política de Privacidade.</p>
          </section>
        </div>
      </div>
    </div>
  </body>
</html>`;
}
