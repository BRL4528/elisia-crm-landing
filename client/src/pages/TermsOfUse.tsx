import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfUse() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/">
                        <a className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para Home
                        </a>
                    </Link>
                </div>

                <Card className="border-none shadow-lg">
                    <CardHeader className="pb-4 border-b">
                        <CardTitle className="text-3xl font-bold text-primary">Termos de Uso</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">ZMG SOLUTIONS LTDA</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ScrollArea className="h-[800px] pr-4">
                            <div className="space-y-6 text-muted-foreground">
                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">1. Termos</h2>
                                    <p>
                                        Ao acessar ao site ZMG SOLUTIONS LTDA, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">2. Uso de Licença</h2>
                                    <p className="mb-2">
                                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ZMG SOLUTIONS LTDA , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>modificar ou copiar os materiais;</li>
                                        <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                                        <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site ZMG SOLUTIONS LTDA;</li>
                                        <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                                        <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
                                    </ul>
                                    <p className="mt-4">
                                        Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por ZMG SOLUTIONS LTDA a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">3. Isenção de responsabilidade</h2>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Os materiais no site da ZMG SOLUTIONS LTDA são fornecidos 'como estão'. ZMG SOLUTIONS LTDA não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
                                        <li>Além disso, o ZMG SOLUTIONS LTDA não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">4. Limitações</h2>
                                    <p>
                                        Em nenhum caso o ZMG SOLUTIONS LTDA ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em ZMG SOLUTIONS LTDA, mesmo que ZMG SOLUTIONS LTDA ou um representante autorizado da ZMG SOLUTIONS LTDA tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">5. Precisão dos materiais</h2>
                                    <p>
                                        Os materiais exibidos no site da ZMG SOLUTIONS LTDA podem incluir erros técnicos, tipográficos ou fotográficos. ZMG SOLUTIONS LTDA não garante que qualquer material em seu site seja preciso, completo ou atual. ZMG SOLUTIONS LTDA pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, ZMG SOLUTIONS LTDA não se compromete a atualizar os materiais.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">6. Links</h2>
                                    <p>
                                        O ZMG SOLUTIONS LTDA não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por ZMG SOLUTIONS LTDA do site. O uso de qualquer site vinculado é por conta e risco do usuário.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">Modificações</h2>
                                    <p>
                                        O ZMG SOLUTIONS LTDA pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">Lei aplicável</h2>
                                    <p>
                                        Estes termos e condições são regidos e interpretados de acordo com as leis do ZMG SOLUTIONS LTDA e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                                    </p>
                                </section>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
