import React from 'react';
import { ContentBlock } from '../types';
import { InfoIcon } from '../components/Tooltip';

// Helper for highlighting text
const Highlight: React.FC<{color: string, children: React.ReactNode}> = ({ color, children }) => {
    const colorClasses: {[key: string]: string} = {
        yellow: 'bg-yellow-200 dark:bg-yellow-800/60',
        orange: 'bg-orange-200 dark:bg-orange-800/60',
        blue: 'bg-blue-200 dark:bg-blue-800/60',
        red: 'bg-red-200 dark:bg-red-800/60',
        green: 'bg-green-200 dark:bg-green-800/60'
    };
    return <span className={`${colorClasses[color] || 'bg-gray-200'} px-1 rounded font-medium`}>{children}</span>;
};

export const CALCIUM_GUIDE_CONTENT: ContentBlock[] = [
    { type: 'header', content: '🏛️ Cálcio (Ca²⁺): O Pilar da Contração e Sinalização - Guia de Emergência para Cães e Gatos 🏛️' },
    { type: 'subheader', content: 'Introdução: A Moeda Corrente da Célula' },
    {
        type: 'paragraph',
        content: (
            <>
                O cálcio é muito mais do que o principal componente dos ossos. No sangue e nos tecidos, ele atua como um mensageiro intracelular crítico, essencial para a contração muscular, coagulação sanguínea, liberação de neurotransmissores e função hormonal.
                <InfoIcon content="O cálcio é o segundo mensageiro mais importante da célula, atrás apenas do AMP cíclico." />
            </>
        ),
    },
    {
        type: 'warning',
        title: '🚨 Conceito Fundamental: Cálcio Total vs. Cálcio Ionizado',
        content: (
            <>
                Este é o ponto mais importante e uma fonte comum de erro. O que medimos rotineiramente no perfil bioquímico é o <strong>Cálcio Total</strong>, que existe em três formas:
                <br/><br/>
                <strong>Ligado a Proteínas (~40%):</strong> Principalmente à albumina. É inativo.
                <br/><br/>
                <strong>Complexado com Ânions (~10%):</strong> Ligado a citrato, fosfato. É inativo.
                <br/><br/>
                <strong>Ionizado (Livre) (iCa²⁺) (~50%):</strong> <Highlight color="red">Esta é a única forma biologicamente ativa!</Highlight> É o cálcio ionizado que afeta a função celular.
                <br/><br/>
                <strong>Sempre que possível, meça o cálcio ionizado.</strong> Se não for possível, o cálcio total deve ser corrigido pela albumina, pois a hipoalbuminemia causa uma falsa hipocalcemia total.
            </>
        )
    },
    {
        type: 'formula',
        content: "Fórmula de Correção (Cães): Cálcio Corrigido (mg/dL) = Cálcio Total Medido (mg/dL) - Albumina do Paciente (g/dL) + 3.5"
    },
    {
        type: 'subheader',
        content: 'Regulação Hormonal: A Tríade do Poder'
    },
    {
        type: 'paragraph',
        content: (
            <>
                O controle do cálcio é uma dança precisa entre três hormônios:
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Paratormônio (PTH) - O "Elevador":</strong> Produzido pelas paratireoides quando o iCa²⁺ cai.
                    <br/>• <strong>Ação:</strong> Aumenta o cálcio no sangue ao:
                    <br/>• Tirar Ca²⁺ dos ossos (ação osteoclástica).
                    <br/>• Aumentar a reabsorção de Ca²⁺ nos rins.
                    <br/>• Ativar a Vitamina D.
                </li>
                <li><strong>Vitamina D Ativada (Calcitriol) - O "Absorvedor":</strong>
                    <br/>• <strong>Ação:</strong> Principal hormônio responsável pela absorção de Ca²⁺ e Fósforo no intestino.
                </li>
                <li><strong>Calcitonina - O "Redutor":</strong> Produzida pela tireoide quando o iCa²⁺ sobe.
                    <br/>• <strong>Ação:</strong> Diminui o cálcio ao inibir a reabsorção óssea. Tem um papel menos significativo em adultos.
                </li>
            </>
        )
    },
    { type: 'subheader', content: '📉 Seção 1: HIPOCALCEMIA (Déficit de Cálcio)' },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Definição:</strong>
                    <br/>• <strong>Cálcio Total:</strong> {"<"} 8.5 mg/dL (cães); {"<"} 8.0 mg/dL (gatos)
                    <br/>• <strong>Cálcio Ionizado (iCa²⁺):</strong> {"<"} 1.1 mmol/L ou {"<"} 4.4 mg/dL
                </li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiopatologia Explicada: Os Portões Elétricos Abertos'
    },
    {
        type: 'paragraph',
        content: (
            <>
                O cálcio estabiliza os canais de sódio nas membranas dos neurônios e músculos. A hipocalcemia remove essa estabilidade, diminuindo o limiar de disparo.
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Analogia:</strong> Imagine os canais de sódio como portões elétricos. O cálcio é o "peso" que mantém esses portões fechados e difíceis de abrir. Com pouco cálcio, os portões ficam leves e se abrem com qualquer estímulo mínimo, levando à hiperexcitabilidade neuromuscular (tremores, tetania).
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Etiologia: As Causas da Hipocalcemia'
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-1">Causa Principal</th>
                            <th className="border border-gray-600 p-1">Mecanismo</th>
                            <th className="border border-gray-600 p-1">Exemplos Clínicos Comuns</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">Hipoparatireoidismo</td>
                            <td className="border border-gray-600 p-1">Deficiência de PTH</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Primário:</strong> Destruição autoimune das paratireoides<br/>
                                • <strong>Iatrogênico:</strong> Remoção acidental durante tireoidectomia. Causa hipocalcemia profunda e persistente
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Eclampsia (Tetania Puerperal)</td>
                            <td className="border border-gray-600 p-1">Perda de cálcio para a lactação</td>
                            <td className="border border-gray-600 p-1">
                                • A causa mais comum de hipocalcemia sintomática em cadelas (raro em gatas)<br/>
                                • Ocorre em fêmeas de pequeno porte com grandes ninhadas, 2-4 semanas pós-parto
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Doença Renal Crônica (DRC)</td>
                            <td className="border border-gray-600 p-1">Falha na ativação da Vitamina D pelo rim</td>
                            <td className="border border-gray-600 p-1">
                                • A diminuição do Calcitriol leva à menor absorção intestinal de Ca²⁺<br/>
                                • Embora o paciente tenha hiperparatireoidismo secundário, o iCa²⁺ pode ser baixo ou normal
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Pancreatite Aguda</td>
                            <td className="border border-gray-600 p-1">Saponificação da gordura mesentérica</td>
                            <td className="border border-gray-600 p-1">
                                • O cálcio é "sequestrado" e precipitado na gordura inflamada ao redor do pâncreas
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Intoxicação por Etilenoglicol</td>
                            <td className="border border-gray-600 p-1">Quelante de cálcio</td>
                            <td className="border border-gray-600 p-1">
                                • O etilenoglicol é metabolizado a oxalato, que se liga ao cálcio e forma cristais de oxalato de cálcio
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Hipovitaminose D</td>
                            <td className="border border-gray-600 p-1">Deficiência de Vitamina D</td>
                            <td className="border border-gray-600 p-1">
                                • Doenças intestinais que causam má absorção, ou insuficiência hepática (falha na primeira hidroxilação)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: 'Sinais Clínicos: A Tempestade Neuromuscular'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Os sinais refletem a hiperexcitabilidade neuromuscular.
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Leves/Iniciais:</strong> Inquietação, respiração ofegante (panting), esfregar o focinho no chão, salivação.</li>
                <li><strong>Moderados a Graves:</strong> Tremores musculares, fasciculações, tetania (rigidez muscular com espasmos), andar rígido.</li>
                <li><strong>Emergência:</strong> Convulsões generalizadas, hipertermia (pela atividade muscular intensa), arritmias cardíacas.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '🛠️ GUIA DE TRATAMENTO DE EMERGÊNCIA DA HIPOCALCEMIA'
    },
    {
        type: 'warning',
        title: 'Princípio-Chave',
        content: (
            <>
                O tratamento de emergência visa controlar os sinais clínicos (tetania, convulsões), e não necessariamente normalizar o valor do cálcio imediatamente. A correção deve ser lenta e monitorada.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Passo a Passo da Correção'
    },
    {
        type: 'subheader',
        content: '1. Tratamento de Emergência (Tetania/Convulsões)'
    },
    {
        type: 'warning',
        title: '🥇 Droga de Escolha: Gluconato de Cálcio 10%',
        content: (
            <>
                É menos irritante para os vasos que o cloreto de cálcio.
                <br/><br/>
                <strong>Dose:</strong> 0.5 - 1.5 mL/kg (ou 50-150 mg/kg) IV.
                <br/><br/>
                <strong>Administração:</strong> EXTREMAMENTE LENTA, durante 10 a 20 minutos.
                <br/><br/>
                <strong>Monitoramento Obrigatório:</strong> Ausculte o coração ou monitore o ECG continuamente durante a infusão.
            </>
        )
    },
    {
        type: 'warning',
        title: '🚨 Sinais de Alerta (Pare a Infusão!)',
        content: (
            <>
                Bradicardia súbita, encurtamento do intervalo QT, arritmias (VPCs). Se ocorrerem, pare a infusão, espere o ritmo normalizar e recomece mais lentamente.
            </>
        )
    },
    {
        type: 'subheader',
        content: '2. Terapia de Manutenção (Prevenindo a Recorrência)'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Após o bolus inicial controlar os sinais, o paciente precisa de uma <strong>Infusão Contínua (CRI)</strong> para evitar a recorrência, pois o efeito do bolus é curto.
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Como Calcular a CRI:</strong> Adicione a mesma dose total do bolus (ex: 60-90 mg/kg) aos fluidos de manutenção (ex: NaCl 0,9%, Ringer Lactato) para serem infundidos nas próximas 6-8 horas. <Highlight color="red">NÃO adicione cálcio a fluidos contendo bicarbonato, pois ele precipitará.</Highlight>
            </>
        )
    },
    {
        type: 'subheader',
        content: '3. Terapia a Longo Prazo (para causas crônicas)'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Hipoparatireoidismo:</strong> Requer suplementação oral para o resto da vida com Carbonato de Cálcio e Vitamina D Ativada (Calcitriol).</li>
                <li><strong>Eclampsia:</strong> Após a estabilização, os filhotes devem ser afastados da mãe por 24-48h e alimentados com substituto lácteo. A cadela deve receber suplementação oral de cálcio.</li>
            </>
        )
    },
    {
        type: 'warning',
        title: '❌ O que NÃO fazer',
        content: (
            <>
                • NÃO administre cálcio rapidamente. Risco de parada cardíaca.
                <br/>• NÃO administre soluções de cálcio por via subcutânea (SC). Causa necrose tecidual severa e calcinose cutânea.
            </>
        )
    },
    { type: 'subheader', content: '📈 Seção 2: HIPERCALCEMIA (Aumento de Cálcio)' },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Definição:</strong>
                    <br/>• <strong>Cálcio Total:</strong> {">"} 12.0 mg/dL (cães); {">"} 11.0 mg/dL (gatos)
                    <br/>• <strong>Cálcio Ionizado (iCa²⁺):</strong> {">"} 1.4 mmol/L ou {">"} 5.6 mg/dL
                </li>
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                A hipercalcemia persistente é quase sempre um sinal de doença grave subjacente.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiopatologia Explicada: Os Portões Elétricos Travados'
    },
    {
        type: 'paragraph',
        content: (
            <>
                O excesso de cálcio "trava" os portões de sódio, aumentando o limiar de disparo. Isso causa depressão neuromuscular. Além disso, o cálcio alto tem efeitos tóxicos diretos, principalmente nos rins.
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Efeito Renal:</strong> O cálcio alto interfere na ação do ADH nos túbulos coletores, causando Diabetes Insipidus Nefrogênico. O rim perde a capacidade de concentrar a urina, resultando no principal sinal clínico: <Highlight color="blue">Poliúria e Polidipsia (PU/PD)</Highlight>.
            </>
        )
    },
    {
        type: 'warning',
        title: '⚠️ Mineralização de Tecidos Moles',
        content: (
            <>
                Se o produto Cálcio x Fósforo (Ca x P) for {">"} 60-70, há um alto risco de mineralização de tecidos moles, como rins, coração e pulmões, causando danos permanentes.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Etiologia: As Causas da Hipercalcemia (Mnemônico "GOSH DARN IT")'
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-1">Causa Principal</th>
                            <th className="border border-gray-600 p-1">Mnemônico</th>
                            <th className="border border-gray-600 p-1">Exemplos Clínicos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">Hiperparatireoidismo Primário</td>
                            <td className="border border-gray-600 p-1">Granulomatous</td>
                            <td className="border border-gray-600 p-1">
                                Tumor benigno (adenoma) na paratireoide que secreta PTH de forma autônoma
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Hipercalcemia da Malignidade</td>
                            <td className="border border-gray-600 p-1">Osteolytic</td>
                            <td className="border border-gray-600 p-1">
                                A causa mais comum em cães! Tumores produzem PTHrp (peptídeo relacionado ao PTH)<br/>
                                • <strong>Linfoma</strong> (principalmente mediastinal)<br/>
                                • <strong>Adenocarcinoma de Saco Anal</strong><br/>
                                • <strong>Mieloma Múltiplo</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Doença Renal Crônica (DRC)</td>
                            <td className="border border-gray-600 p-1">Spurious (falso)</td>
                            <td className="border border-gray-600 p-1">
                                Menos comum em cães, mais em gatos. É o Hiperparatireoidismo Secundário Renal. O PTH fica altíssimo, mas o iCa²⁺ geralmente é normal ou baixo
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Hipoadrenocorticismo (Addison)</td>
                            <td className="border border-gray-600 p-1">Hypoadrenocorticism</td>
                            <td className="border border-gray-600 p-1">
                                Causa hipercalcemia em até 30% dos casos. Mecanismo incerto
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Vitamina D (Intoxicação)</td>
                            <td className="border border-gray-600 p-1">D-vitamin toxicity</td>
                            <td className="border border-gray-600 p-1">
                                Ingestão de rodenticidas contendo colecalciferol, plantas (jasmim-manga), ou medicamentos humanos
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Outras</td>
                            <td className="border border-gray-600 p-1">Agents, Renal, Nutritional, Idiopathic, Tumors</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Hipercalcemia Idiopática Felina:</strong> Causa comum em gatos, diagnóstico de exclusão<br/>
                                • <strong>Doenças granulomatosas</strong> (blastomicose)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: 'Sinais Clínicos: O Paciente "PU/PD"'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Poliúria / Polidipsia (PU/PD):</strong> O sinal mais comum e consistente.</li>
                <li>Letargia, fraqueza, anorexia.</li>
                <li>Vômito, constipação.</li>
                <li>Tremores musculares.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '🛠️ GUIA DE TRATAMENTO DA HIPERCALCEMIA'
    },
    {
        type: 'warning',
        title: 'Princípio-Chave',
        content: (
            <>
                O tratamento visa aumentar a excreção de cálcio, inibir a reabsorção óssea e, o mais importante, tratar a causa de base.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'A Escada Terapêutica'
    },
    {
        type: 'subheader',
        content: '1. Fluidoterapia Agressiva (O Passo Mais Importante)'
    },
    {
        type: 'warning',
        title: '🥇 Fluido de Escolha: Cloreto de Sódio 0,9% (NaCl 0,9%)',
        content: (
            <>
                <strong>Por quê?</strong> A expansão de volume por si só aumenta a taxa de filtração glomerular. Além disso, o sódio compete com o cálcio pela reabsorção no rim, então uma alta carga de sódio promove calciurese (excreção de cálcio).
                <br/><br/>
                <strong>Taxa:</strong> 2 a 3 vezes a taxa de manutenção.
            </>
        )
    },
    {
        type: 'subheader',
        content: '2. Diuréticos de Alça'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Droga:</strong> Furosemida.</li>
                <li><strong>Quando?</strong> SOMENTE APÓS a reidratação completa do paciente. Administrar a um animal desidratado piorará a azotemia.</li>
                <li><strong>Ação:</strong> Inibe a reabsorção de Na⁺, K⁺, Cl⁻ e Ca²⁺ na alça de Henle, aumentando a calciurese.</li>
                <li><strong>O que NÃO usar:</strong> Diuréticos Tiazídicos (ex: hidroclorotiazida), pois eles aumentam a reabsorção de cálcio.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '3. Glicocorticoides'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Droga:</strong> Prednisona ou Dexametasona.</li>
                <li><strong>Ação:</strong> Útil para tratar hipercalcemia causada por Linfoma, Hipoadrenocorticismo e intoxicação por Vitamina D. Reduzem a reabsorção óssea e a absorção intestinal de cálcio.</li>
                <li><strong>CUIDADO:</strong> Coletar todas as amostras para diagnóstico ANTES de administrar corticoides, pois eles podem mascarar o diagnóstico de linfoma (causando remissão parcial) e interferir em testes como o de ACTH.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '4. Bifosfonatos (Inibidores da Reabsorção Óssea)'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Drogas:</strong> Pamidronato, Zoledronato.</li>
                <li><strong>Ação:</strong> Potentes inibidores da atividade dos osteoclastos. São a terapia de escolha para hipercalcemia da malignidade refratária a fluidos.</li>
                <li><strong>Administração:</strong> Infusão IV lenta, diluída em NaCl 0,9%.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '5. Tratar a Causa Base'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Remoção cirúrgica do tumor da paratireoide ou do saco anal, quimioterapia para linfoma, etc. Este é o tratamento definitivo.
            </>
        )
    },
    {
        type: 'subheader',
        content: '📲 Farmacopeia do Cálcio'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Como a terapia do cálcio é baseada em drogas específicas e não em uma tabela de fluidos, esta farmacopeia é a ferramenta mais útil.
            </>
        )
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-1">Droga</th>
                            <th className="border border-gray-600 p-1">Indicação Principal</th>
                            <th className="border border-gray-600 p-1">Dose</th>
                            <th className="border border-gray-600 p-1">Precauções</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">Gluconato de Cálcio 10%</td>
                            <td className="border border-gray-600 p-1">Tratamento de emergência da hipocalcemia sintomática (tetania)</td>
                            <td className="border border-gray-600 p-1">
                                <strong>Bolus:</strong> 0.5-1.5 mL/kg (50-150 mg/kg) IV LENTAMENTE (10-20 min)<br/>
                                <strong>CRI:</strong> 60-90 mg/kg em fluidos a cada 6-8h
                            </td>
                            <td className="border border-gray-600 p-1">
                                Monitorar ECG para bradicardia/arritmias. Não administrar SC. Irritante perivascular
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Calcitriol (Vitamina D Ativada)</td>
                            <td className="border border-gray-600 p-1">Terapia crônica da hipocalcemia (hipoparatireoidismo)</td>
                            <td className="border border-gray-600 p-1">
                                Dose inicial típica: 2.5-5 ng/kg/dia via oral
                            </td>
                            <td className="border border-gray-600 p-1">
                                Monitorar cálcio e fósforo séricos para evitar hipercalcemia iatrogênica
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">NaCl 0,9% (Soro Fisiológico)</td>
                            <td className="border border-gray-600 p-1">Primeira linha no tratamento da hipercalcemia</td>
                            <td className="border border-gray-600 p-1">
                                2-3x a taxa de manutenção para promover diurese e calciurese
                            </td>
                            <td className="border border-gray-600 p-1">
                                Monitorar volemia e sódio sérico
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Furosemida</td>
                            <td className="border border-gray-600 p-1">Terapia adjuvante da hipercalcemia (após reidratação)</td>
                            <td className="border border-gray-600 p-1">
                                1-4 mg/kg IV, IM, SC a cada 8-12h
                            </td>
                            <td className="border border-gray-600 p-1">
                                NÃO usar em pacientes desidratados. Monitorar hidratação e eletrólitos
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Prednisona / Prednisolona</td>
                            <td className="border border-gray-600 p-1">Hipercalcemia responsiva a esteroides (Linfoma, Addison)</td>
                            <td className="border border-gray-600 p-1">
                                Dose anti-inflamatória a imunossupressora (1-2 mg/kg/dia)
                            </td>
                            <td className="border border-gray-600 p-1">
                                Coletar amostras para diagnóstico ANTES de iniciar. Causa PU/PD
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Pamidronato / Zoledronato (Bifosfonatos)</td>
                            <td className="border border-gray-600 p-1">Hipercalcemia da malignidade refratária</td>
                            <td className="border border-gray-600 p-1">
                                <strong>Pamidronato:</strong> 1.5-2 mg/kg IV diluído em 250 mL de NaCl 0.9% por 2-4h<br/>
                                <strong>Zoledronato:</strong> É mais potente e rápido
                            </td>
                            <td className="border border-gray-600 p-1">
                                Risco de nefrotoxicidade. O paciente deve estar bem hidratado
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: '🎯 Resumo Clínico Prático'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Hipocalcemia:</strong> Gluconato de cálcio IV lento + CRI + tratar causa base</li>
                <li><strong>Hipercalcemia:</strong> Fluidos agressivos + diuréticos + corticoides + bifosfonatos</li>
                <li><strong>Monitoramento:</strong> ECG em hipocalcemia, cálcio ionizado quando possível</li>
                <li><strong>Princípio:</strong> Sempre medir cálcio ionizado, não apenas o total</li>
            </>
        )
    }
];
