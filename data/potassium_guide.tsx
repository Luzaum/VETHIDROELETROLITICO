import React from 'react';
import { ContentBlock } from '../types';
import { InfoIcon } from '../components/Tooltip';

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

export const POTASSIUM_GUIDE_CONTENT: ContentBlock[] = [
    { type: 'header', content: '⚡ Potássio (K⁺): O Maestro da Célula - Guia de Correção para Cães e Gatos ⚡' },
    { type: 'subheader', content: 'Introdução: A Bateria Celular' },
    {
        type: 'paragraph',
        content: (
            <>
                O potássio (K⁺) é o principal cátion intracelular. Mais de 98% do potássio corporal está dentro das células. Essa enorme diferença de concentração entre o interior (rico em K⁺) e o exterior da célula (pobre em K⁺) cria o potencial de repouso da membrana, que é a base para a excitabilidade de nervos e músculos.
                <InfoIcon content="O potássio é essencial para a condução nervosa, contração muscular e ritmo cardíaco." />
            </>
        ),
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Analogia:</strong> Pense no potássio como a carga de uma bateria. A célula precisa de uma carga muito específica para funcionar. Pouca carga (hipocalemia) ou carga excessiva (hipercalemia) impede que a "bateria" dispare corretamente, afetando principalmente músculos e o coração.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiologia Essencial'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Bomba de Na⁺/K⁺ ATPase:</strong> Mantém o K⁺ dentro da célula.</li>
                <li><strong>Excreção Renal:</strong> Controlada principalmente pela aldosterona nos túbulos distais. A aldosterona promove a excreção de K⁺ em troca da reabsorção de Na⁺.</li>
            </>
        )
    },
    { type: 'subheader', content: '📉 Seção 1: HIPOCALEMIA (Déficit de Potássio)' },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Definição:</strong> Concentração sérica de potássio {"<"} 3.5 mEq/L em cães e gatos.</li>
                <li><strong>Leve:</strong> 3.0 - 3.4 mEq/L</li>
                <li><strong>Moderada:</strong> 2.5 - 2.9 mEq/L</li>
                <li><strong>Grave:</strong> {"<"} 2.5 mEq/L</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiopatologia Explicada: O "Cofre" Celular Vazio'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Aumento da Perda:</strong> É a causa mais comum. O corpo perde potássio mais rápido do que ingere.</li>
                <li><strong>Redução da Ingestão:</strong> Anorexia ou dietas deficientes.</li>
                <li><strong>Desvio Transcelular:</strong> O potássio se move do sangue para dentro das células (ex: alcalose, ação da insulina).</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Etiologia: As Causas da Hipocalemia'
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
                            <td className="border border-gray-600 p-1">Perda Renal</td>
                            <td className="border border-gray-600 p-1">Excreção excessiva pelos rins</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Doença Renal Crônica (DRC):</strong> Principalmente em gatos! A poliúria "lava" o potássio<br/>
                                • <strong>Diurese Pós-Obstrutiva:</strong> Após desobstrução uretral<br/>
                                • <strong>Uso de Diuréticos:</strong> Furosemida, diuréticos tiazídicos<br/>
                                • <strong>Diurese Osmótica:</strong> Glicosúria na Diabetes Mellitus<br/>
                                • <strong>Hiperadrenocorticismo (Cushing):</strong> Excesso de cortisol com efeito mineralocorticoide
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Perda Gastrointestinal</td>
                            <td className="border border-gray-600 p-1">Perda de secreções ricas em potássio</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Vômito e Diarreia:</strong> Perdas diretas e alcalose metabólica associada (que joga K⁺ para dentro da célula)<br/>
                                • <strong>Obstruções intestinais</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Redução da Ingestão</td>
                            <td className="border border-gray-600 p-1">Falta de "matéria-prima"</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Anorexia ou Inanição:</strong> Qualquer doença que cause diminuição do apetite por vários dias
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Desvio Transcelular</td>
                            <td className="border border-gray-600 p-1">K⁺ "se esconde" dentro das células</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Alcalose Metabólica:</strong> O corpo joga H⁺ para fora da célula em troca de K⁺<br/>
                                • <strong>Terapia com Insulina:</strong> A insulina ativa a bomba de Na⁺/K⁺ ATPase
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Iatrogênica</td>
                            <td className="border border-gray-600 p-1">Causado pelo tratamento</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Administração de fluidos sem suplementação de potássio</strong> para pacientes anoréticos
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: 'Sinais Clínicos: A Fraqueza Generalizada'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Sinais Musculares:</strong> Fraqueza muscular generalizada, letargia, relutância em andar, íleo paralítico (paralisia da musculatura intestinal).</li>
                <li><strong>Sinal Patognomônico em Gatos 🐈:</strong> <Highlight color="orange">Ventroflexão cervical</Highlight>. A fraqueza dos músculos do pescoço faz com que o gato não consiga sustentar a cabeça, que fica "caída" sobre o peito.</li>
                <li><strong>Sinais Cardíacos:</strong> Arritmias (complexos atriais e ventriculares prematuros).</li>
                <li><strong>Sinais Renais:</strong> Pode piorar a função renal (nefropatia hipocalêmica).</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '🛠️ GUIA DE TRATAMENTO DA HIPOCALEMIA'
    },
    {
        type: 'warning',
        title: '🚨 REGRA DE OURO INVIOLÁVEL 🚨',
        content: (
            <>
                A taxa de infusão de potássio intravenoso <Highlight color="red">NUNCA deve exceder 0.5 mEq/kg/hora</Highlight>.
                <br/><br/>
                Esta é a informação de segurança mais importante e deve ser um alerta vermelho no seu app.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Passo a Passo da Correção'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>1. Definir a Via de Administração:</strong>
                    <br/>• <strong>Hipocalemia Leve e Paciente Comendo:</strong> Suplementação oral (Gluconato de potássio ou Citrato de potássio são mais palatáveis que o Cloreto de potássio).
                    <br/>• <strong>Hipocalemia Moderada a Grave ou Paciente Anorético/Vomitando:</strong> Suplementação intravenosa (IV).
                </li>
                <li><strong>2. Preparar a Fluidoterapia IV:</strong>
                    <br/>• <strong>Fluido Base:</strong> Qualquer cristaloide de manutenção serve como veículo (NaCl 0.9%, Ringer Lactato, etc.).
                    <br/>• <strong>Aditivo:</strong> Cloreto de Potássio (KCl). Geralmente vem em ampolas concentradas (ex: 19,1%, que equivale a 2.5 mEq/mL).
                </li>
                <li><strong>3. Calcular a Quantidade de KCl a Adicionar:</strong>
                    <br/>O Método Padrão: Em vez de fórmulas complexas de déficit, a prática clínica utiliza uma tabela de suplementação padronizada. O cálculo exato do déficit de K⁺ é impreciso, pois a maior parte dele é intracelular.
                </li>
                <li><strong>4. Monitoramento:</strong>
                    <br/>• Meça o K⁺ sérico a cada 12-24 horas. Em casos graves ou com infusões próximas ao limite máximo, monitore a cada 4-6 horas.
                    <br/>• Monitore o ECG em pacientes com hipocalemia grave ou que recebem taxas de infusão mais altas.
                </li>
            </>
        )
    },
    {
        type: 'warning',
        title: 'CUIDADO',
        content: (
            <>
                Sempre agite MUITO BEM a bolsa de fluido após adicionar o KCl para garantir a homogeneização. Bolsões de potássio não diluído podem ser letais se infundidos.
            </>
        )
    },
    { type: 'subheader', content: '📈 Seção 2: HIPERCALEMIA (Aumento de Potássio)' },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Definição:</strong> Concentração sérica de potássio {">"} 5.5 mEq/L em cães e gatos.</li>
                <li><strong>Leve:</strong> 5.6 - 6.5 mEq/L</li>
                <li><strong>Moderada:</strong> 6.6 - 8.0 mEq/L</li>
                <li><strong>Grave:</strong> {">"} 8.0 mEq/L</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiopatologia Explicada: A "Bateria" em Curto-Circuito'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Redução da Excreção Renal:</strong> Causa disparada mais comum. O rim falha em eliminar o potássio.</li>
                <li><strong>Desvio Transcelular:</strong> O potássio sai de dentro das células para o sangue (ex: acidose severa, destruição celular maciça).</li>
                <li><strong>Aumento da Ingestão:</strong> Quase sempre iatrogênico (sobredosagem na fluidoterapia).</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Etiologia: As Causas da Hipercalemia'
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
                            <td className="border border-gray-600 p-1">Redução da Excreção Renal</td>
                            <td className="border border-gray-600 p-1">Falha do rim em excretar K⁺</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Hipoadrenocorticismo (Doença de Addison):</strong> A falta de aldosterona impede a excreção de K⁺. Causa clássica!<br/>
                                • <strong>Obstrução Uretral:</strong> Principalmente em gatos machos. A urina não sai, o K⁺ se acumula<br/>
                                • <strong>Uroabdômen:</strong> A urina (rica em K⁺) vaza para o abdômen e é reabsorvida<br/>
                                • <strong>Insuficiência Renal Aguda (IRA):</strong> Especialmente na fase oligúrica/anúrica
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Desvio Transcelular</td>
                            <td className="border border-gray-600 p-1">K⁺ sai da célula para o sangue</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Acidose Metabólica:</strong> O corpo joga H⁺ para dentro da célula em troca de K⁺<br/>
                                • <strong>Lesão Tecidual Extensa:</strong> Rabdomiólise, trauma maciço, síndrome de reperfusão. As células destruídas liberam seu K⁺
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Iatrogênica</td>
                            <td className="border border-gray-600 p-1">Erro de medicação/terapia</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Sobredosagem de KCl</strong> na fluidoterapia
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">‼️ Pseudohipercalemia</td>
                            <td className="border border-gray-600 p-1">Falso aumento laboratorial</td>
                            <td className="border border-gray-600 p-1">
                                • <strong>Trombocitose</strong> (plaquetas liberam K⁺ na coagulação da amostra)<br/>
                                • <strong>Hemólise da amostra</strong> (principalmente em raças como Akita, Shiba Inu)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: 'Sinais Clínicos e ECG: A Ameaça ao Coração ❤️‍🩹'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Sinais Musculares:</strong> Fraqueza muscular, tremores.</li>
                <li><strong>Sinais Cardíacos:</strong> Bradicardia é o sinal clínico mais consistente.</li>
                <li><strong>ECG (Eletrocardiograma):</strong> O ECG é FUNDAMENTAL. As alterações progridem de forma clássica:</li>
                <li>Ondas T altas e apiculadas (sinal mais precoce).</li>
                <li>Achatamento e desaparecimento da onda P.</li>
                <li>Aumento do intervalo PR.</li>
                <li>Alargamento do complexo QRS.</li>
                <li>A fusão do QRS com a onda T cria um padrão de "onda senoidal" (sine wave).</li>
                <li>Fibrilação ventricular e parada cardíaca.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '🛠️ GUIA DE TRATAMENTO DE EMERGÊNCIA DA HIPERCALEMIA'
    },
    {
        type: 'warning',
        title: 'Princípio-Chave',
        content: (
            <>
                A hipercalemia com alterações no ECG é uma emergência absoluta! O tratamento tem 3 objetivos:
                <br/><br/>
                1. <strong>Proteger o coração</strong> (antagonismo)
                <br/>2. <strong>Mover o K⁺ para dentro das células</strong> (redistribuição)
                <br/>3. <strong>Eliminar o K⁺ do corpo</strong> (remoção)
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Mnemônico de Emergência:</strong> "C.A.I.G.O.U"
                <br/>• <strong>C</strong>álcio
                <br/>• <strong>A</strong>lcalinizante
                <br/>• <strong>I</strong>nsulina + Glicose
                <br/>• <strong>O</strong>ut (Remover)
                <br/>• <strong>U</strong>rgência!
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Passo a Passo do Tratamento de Emergência'
    },
    {
        type: 'subheader',
        content: 'Passo 1: PROTEGER O CORAÇÃO (Antagonismo)'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Droga:</strong> Gluconato de Cálcio 10%</li>
                <li><strong>Ação:</strong> Não baixa o potássio sérico! Ele restaura o potencial de limiar da membrana cardíaca, protegendo o coração dos efeitos do K⁺ por ~20-30 minutos. É uma ponte para as outras terapias fazerem efeito.</li>
                <li><strong>Dose:</strong> 0.5 - 1.5 mL/kg, IV LENTAMENTE (em 5-10 minutos), monitorando o ECG.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Passo 2: MOVER O K⁺ PARA DENTRO DA CÉLULA (Redistribuição)'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Opção A: Insulina + Glicose</strong>
                    <br/>• <strong>Ação:</strong> A insulina ativa a bomba de Na⁺/K⁺ ATPase, movendo o K⁺ para o interior da célula. A glicose é dada junto para prevenir hipoglicemia.
                    <br/>• <strong>Dose:</strong> Insulina Regular (0.25 - 0.5 UI/kg) IV, seguida por um bolus de Glicose (1-2 g por unidade de insulina) e/ou infusão contínua de fluidos com dextrose 2.5-5%.
                </li>
                <li><strong>Opção B: Alcalinizante (Bicarbonato de Sódio)</strong>
                    <br/>• <strong>Ação:</strong> Usado se houver acidose metabólica concomitante. A correção da acidose promove a entrada de K⁺ na célula.
                    <br/>• <strong>Dose:</strong> Administrado em infusão lenta.
                </li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Passo 3: REMOVER O K⁺ DO CORPO'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Fluidoterapia:</strong> Use fluidos sem potássio, como NaCl 0,9%. A expansão de volume promove a diurese e a excreção renal de K⁺.</li>
                <li><strong>Tratar a Causa Base:</strong> A medida mais importante! Desobstruir a uretra, iniciar o tratamento para Addison, etc.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '📲 Tabela de Reposição de Potássio IV'
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-1">K⁺ Sérico (mEq/L)</th>
                            <th className="border border-gray-600 p-1">KCl a Adicionar por Litro (mEq)</th>
                            <th className="border border-gray-600 p-1">Taxa Máxima de Fluido (mL/kg/h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">{"<"} 2.0</td>
                            <td className="border border-gray-600 p-1">80</td>
                            <td className="border border-gray-600 p-1">6</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">2.1 - 2.5</td>
                            <td className="border border-gray-600 p-1">60</td>
                            <td className="border border-gray-600 p-1">8</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">2.6 - 3.0</td>
                            <td className="border border-gray-600 p-1">40</td>
                            <td className="border border-gray-600 p-1">12</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">3.1 - 3.5</td>
                            <td className="border border-gray-600 p-1">28</td>
                            <td className="border border-gray-600 p-1">18</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">3.6 - 5.0</td>
                            <td className="border border-gray-600 p-1">20</td>
                            <td className="border border-gray-600 p-1">25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'warning',
        title: '⚠️ AVISO DE SEGURANÇA',
        content: (
            <>
                <strong>NUNCA exceda a taxa de infusão de 0.5 mEq/kg/hora.</strong> Monitore o ECG e o potássio sérico de perto em taxas de suplementação mais altas.
            </>
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
                <li><strong>Hipocalemia:</strong> Repor lentamente (máx 0.5 mEq/kg/h) com KCl diluído</li>
                <li><strong>Hipercalemia:</strong> Emergência! Proteger coração → Redistribuir → Remover</li>
                <li><strong>Monitoramento:</strong> ECG em casos graves, K⁺ sérico a cada 12-24h</li>
                <li><strong>Princípio:</strong> A segurança é mais importante que a velocidade de correção</li>
            </>
        )
    }
];
