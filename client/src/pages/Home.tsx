import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { Target, CheckSquare, Award, MessageCircle, TrendingUp, Users, Zap, Shield, Filter, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl">Elisia CRM</span>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Funcionalidades
            </a>
            <a href="#agent" className="text-sm font-medium hover:text-primary transition-colors">
              Agent Elisia
            </a>
            <a href="#integrations" className="text-sm font-medium hover:text-primary transition-colors">
              Integrações
            </a>
            <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefícios
            </a>
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <a href="https://elisiacrm.vercel.app" target="_blank" rel="noopener noreferrer">
                Acessar Plataforma
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              variants={itemVariants}
            >
              CRM Inteligente para
              <span className="text-primary"> Resultados Extraordinários</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              variants={itemVariants}
            >
              Elisia é o CRM moderno e prático que combina inteligência artificial com gestão eficiente.
              Controle metas, atribua ações, configure premiações e conte com a Agent Elisia para manter tudo sob controle.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8">
                  Experimentar Grátis
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Ver Demonstração
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seu time e alcançar suas metas
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Target}
              title="Controle de Metas"
              description="Defina, acompanhe e alcance suas metas com dashboards intuitivos e relatórios em tempo real."
              delay={0}
            />
            <FeatureCard
              icon={CheckSquare}
              title="Atribuição de Ações"
              description="Distribua tarefas para sua equipe de forma inteligente e acompanhe o progresso de cada ação."
              delay={0.1}
            />
            <FeatureCard
              icon={Award}
              title="Sistema de Premiações"
              description="Configure recompensas automáticas e motive seu time com gamificação inteligente."
              delay={0.2}
            />
            <FeatureCard
              icon={Filter}
              title="Funil de CRM"
              description="Visualize e gerencie seu pipeline de vendas com funil inteligente e automação de processos."
              delay={0.3}
            />
            <FeatureCard
              icon={MessageCircle}
              title="Integração WhatsApp"
              description="Conecte-se com a API oficial do WhatsApp Business e centralize toda comunicação."
              delay={0.4}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Análise com IA"
              description="Insights inteligentes e previsões baseadas em inteligência artificial para decisões estratégicas."
              delay={0.5}
            />
            <FeatureCard
              icon={Users}
              title="Gestão de Equipe"
              description="Gerencie seu time de forma eficiente com visão completa de performance e produtividade."
              delay={0.6}
            />
            <FeatureCard
              icon={Bot}
              title="Agent Elisia"
              description="Assistente pessoal com IA que interage com vendedores e envia reports diários via WhatsApp."
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* Agent Elisia Section */}
      <section id="agent" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Inteligência Artificial</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Conheça a Agent Elisia
                <span className="text-primary"> Sua Assistente Pessoal</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                A Agent Elisia é uma assistente com inteligência artificial que trabalha 24/7 para manter
                tudo sob controle. Ela interage proativamente com seus vendedores, monitora métricas importantes
                e te mantém informado com reports diários personalizados.
              </p>
              <motion.ul
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Interação Inteligente</strong>
                    <span className="text-muted-foreground">Conversa naturalmente com sua equipe, tira dúvidas e oferece sugestões</span>
                  </div>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Reports Diários via WhatsApp</strong>
                    <span className="text-muted-foreground">Receba análises completas e insights diretamente no seu WhatsApp</span>
                  </div>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Automação Proativa</strong>
                    <span className="text-muted-foreground">Identifica problemas e oportunidades antes que você precise procurar</span>
                  </div>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Sempre Vigilante</strong>
                    <span className="text-muted-foreground">Monitora metas, prazos e performance em tempo real</span>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-background rounded-2xl p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Bot className="w-32 h-32 text-primary" />
                  </motion.div>
                </div>
                <motion.div
                  className="mt-6 space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-primary/5 rounded-lg p-3 border border-primary/20"
                    variants={itemVariants}
                  >
                    <p className="text-sm font-medium">💬 "Bom dia! Suas vendas aumentaram 15% esta semana."</p>
                  </motion.div>
                  <motion.div
                    className="bg-primary/5 rounded-lg p-3 border border-primary/20"
                    variants={itemVariants}
                  >
                    <p className="text-sm font-medium">📊 "3 leads precisam de follow-up hoje."</p>
                  </motion.div>
                  <motion.div
                    className="bg-primary/5 rounded-lg p-3 border border-primary/20"
                    variants={itemVariants}
                  >
                    <p className="text-sm font-medium">🎯 "João está a 90% da meta mensal!"</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Integration Section */}
      <section id="integrations" className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="bg-background rounded-2xl p-8 shadow-xl border-2 border-primary/20">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MessageCircle className="w-32 h-32 text-primary relative z-10" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Integração Oficial com WhatsApp Business
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Conecte seu CRM diretamente com a API oficial do WhatsApp Business.
                Automatize mensagens, gerencie conversas e mantenha todo histórico de interações
                com seus clientes em um só lugar.
              </p>
              <motion.ul
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Mensagens Automáticas</strong>
                    <span className="text-muted-foreground">Configure respostas automáticas e workflows inteligentes</span>
                  </div>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Segurança e Conformidade</strong>
                    <span className="text-muted-foreground">API oficial com criptografia de ponta a ponta</span>
                  </div>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={itemVariants}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block">Histórico Centralizado</strong>
                    <span className="text-muted-foreground">Todas as conversas sincronizadas no CRM</span>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-primary/5">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher o Elisia CRM?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mais do que um CRM, uma plataforma completa para transformar sua gestão
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Rápido e Intuitivo</h3>
              <p className="text-muted-foreground">
                Interface moderna e fácil de usar. Sua equipe aprende em minutos.
              </p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Resultados Comprovados</h3>
              <p className="text-muted-foreground">
                Aumente sua produtividade em até 40% com automação inteligente.
              </p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Seguro e Confiável</h3>
              <p className="text-muted-foreground">
                Seus dados protegidos com os mais altos padrões de segurança.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar sua gestão?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a centenas de empresas que já estão alcançando resultados extraordinários com o Elisia CRM.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8">
                Começar Gratuitamente
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl">Elisia CRM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                CRM moderno e inteligente para resultados extraordinários.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li>
                  <a href="/privacy-policy" className="hover:text-primary transition-colors">Política de Privacidade</a>
                </li>
                <li>
                  <Link href="/terms-of-use">
                    <a className="hover:text-primary transition-colors">Termos de Uso</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Elisia CRM. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
