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

export const SODIUM_GUIDE_CONTENT: ContentBlock[] = [
    { type: 'header', content: '👑 Guia Mestre de Sódio (Na⁺): Da Fisiologia à Correção na Clínica de Cães e Gatos 👑' },
    { type: 'subheader', content: 'Introdução: O Rei do Compartimento Extracelular' },
    {
        type: 'paragraph',
        content: (
            <>
                O sódio (Na⁺) é o principal cátion do fluido extracelular (FEC) e o maior determinante da osmolalidade plasmática. Por isso, a regra de ouro é: <Highlight color="yellow">aonde o sódio vai, a água vai atrás</Highlight>.
                <InfoIcon content="A bomba Na⁺/K⁺-ATPase mantém alta concentração de Na⁺ fora das células, essencial para a excitação neuromuscular." />
            </>
        ),
    },
    {
        type: 'paragraph',
        content: (
            <>
                No entanto, a maioria dos distúrbios de sódio não reflete um problema com o balanço de sódio em si, mas sim um distúrbio no balanço da <Highlight color="blue">ÁGUA</Highlight>.
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Hiponatremia:</strong> Geralmente, um excesso de água em relação ao sódio.</li>
                <li><strong>Hipernatremia:</strong> Quase sempre, um déficit de água em relação ao sódio.</li>
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                O controle da água corporal é feito primariamente pelo Hormônio Antidiurético (ADH). Portanto, entender o ADH é a chave para dominar os distúrbios do sódio.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiologia Essencial'
    },
    {
        type: 'paragraph',
        content: (
            <>
                O ADH é liberado pela hipófise em resposta a dois estímulos principais: aumento da osmolalidade plasmática e diminuição do volume sanguíneo efetivo. Ele atua nos túbulos coletores renais, inserindo canais de água (aquaporinas-2) que permitem a reabsorção de água livre, concentrando a urina.
            </>
        )
    },
    { type: 'subheader', content: '📉 Seção 1: HIPONATREMIA (Déficit ou Diluição de Sódio)' },
    {
        type: 'paragraph',
        content: (
            <>
                A hiponatremia é o distúrbio eletrolítico mais comum em pequenos animais.
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Definição:</strong> Concentração sérica de sódio {"<"} 140 mEq/L em cães e {"<"} 149 mEq/L em gatos.</li>
                <li><strong>Leve:</strong> 135-139 mEq/L (cães)</li>
                <li><strong>Moderada:</strong> 130-134 mEq/L (cães)</li>
                <li><strong>Grave:</strong> {"<"} 130 mEq/L (cães)</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiopatologia Explicada: O "Suco Aguado"'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Imagine um copo de suco concentrado (o sódio corporal total). Hiponatremia é como adicionar água demais a esse copo. O suco fica aguado (diluído), mesmo que a quantidade de pó de suco (sódio) não tenha diminuído. A causa raiz é quase sempre uma incapacidade do rim de excretar água livre, geralmente devido à presença contínua de ADH.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Etiologia: As Causas da Hiponatremia'
    },
    {
        type: 'paragraph',
        content: (
            <>
                A abordagem diagnóstica se baseia na classificação conforme o estado de hidratação do paciente.
            </>
        )
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="border border-gray-600 p-1">Tipo de Hiponatremia</th>
                            <th className="border border-gray-600 p-1">Status Volêmico</th>
                            <th className="border border-gray-600 p-1">Mecanismo Principal</th>
                            <th className="border border-gray-600 p-1">Exemplos Clínicos Comuns</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">Hipovolêmica</td>
                            <td className="border border-gray-600 p-1">📉 Desidratado</td>
                            <td className="border border-gray-600 p-1">Perda de Na⁺ e água, com reposição de fluidos hipotônicos</td>
                            <td className="border border-gray-600 p-1">
                                • Perdas Gastrointestinais: Vômito, diarreia profusa<br/>
                                • Perdas Renais: Hipoadrenocorticismo (Addison), nefropatias perdedoras de sal<br/>
                                • Perdas para 3º espaço: Uroabdômen, efusões
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Euvolemica</td>
                            <td className="border border-gray-600 p-1">💧 Hidratado</td>
                            <td className="border border-gray-600 p-1">Ganho de água pura com Na⁺ corporal normal</td>
                            <td className="border border-gray-600 p-1">
                                • Síndrome da Secreção Inapropriada de ADH (SIADH)<br/>
                                • Hipoadrenocorticismo (Addison)<br/>
                                • Hipotireoidismo Grave (Mixedema)<br/>
                                • Polidipsia Psicogênica
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Hipervolêmica</td>
                            <td className="border border-gray-600 p-1">🌊 Hiper-hidratado (Edema)</td>
                            <td className="border border-gray-600 p-1">Ganho de água maior que o ganho de Na⁺</td>
                            <td className="border border-gray-600 p-1">
                                • Insuficiência Cardíaca Congestiva (ICC)<br/>
                                • Síndrome Nefrótica<br/>
                                • Insuficiência Hepática Grave (Cirrose)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'warning',
        title: '‼️ Pseudohiponatremia',
        content: (
            <>
                Condições que "diluem" artificialmente a amostra de sangue no laboratório:
                <br/><br/>
                <strong>Hiperglicemia Severa:</strong> A glicose alta puxa água para o plasma. Para cada 100 mg/dL de aumento na glicemia acima do normal, o Na⁺ diminui cerca de 1.6 a 2.4 mEq/L.
                <br/><br/>
                <strong>Hiperlipidemia ou Hiperproteinemia Severa:</strong> O excesso de lipídios/proteínas ocupa espaço na amostra.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Sinais Clínicos: O Cérebro Incha'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Os sinais são primariamente neurológicos e ocorrem porque a baixa osmolalidade do plasma faz a água se mover para dentro das células cerebrais, causando edema cerebral.
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Aguda ({"<"} 48h):</strong> Mais perigosa! Letargia, náusea, vômito, convulsões, coma, morte.</li>
                <li><strong>Crônica ({">"} 48h):</strong> O cérebro se adapta perdendo solutos. Os sinais são mais brandos ou ausentes (letargia, desorientação).</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: '🛠️ GUIA DE TRATAMENTO DA HIPONATREMIA'
    },
    {
        type: 'warning',
        title: 'Princípio-Chave',
        content: (
            <>
                Corrigir LENTAMENTE para evitar a Mielinólise Pontina Central (Síndrome de Desmielinização Osmótica). Uma correção rápida puxa a água para fora das células cerebrais adaptadas, causando sua destruição.
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
                <li><strong>1. Definir a Urgência:</strong>
                    <br/>• Paciente com sinais neurológicos graves (convulsão, coma)? A correção deve ser mais rápida inicialmente.
                    <br/>• Paciente assintomático ou com sinais leves? A correção deve ser muito lenta e cautelosa.
                </li>
                <li><strong>2. Estabelecer a "Velocidade Máxima" de Correção:</strong>
                    <br/>• Regra de Ouro: Não exceder um aumento de 0.5 mEq/L/hora.
                    <br/>• Meta Máxima em 24h: Aumento total de 8 a 12 mEq/L.
                </li>
                <li><strong>3. Calcular o Déficit de Sódio (se necessário):</strong>
                    <br/>Esta fórmula calcula quanto sódio seria necessário para normalizar o paciente, mas NÃO deve ser reposto de uma vez.
                </li>
            </>
        )
    },
    {
        type: 'formula',
        content: "Déficit de Na⁺ (mEq) = (Na⁺ desejado – Na⁺ do paciente) × Água Corporal Total (ACT)"
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>ACT:</strong> 0.6 × Peso Corporal (kg)
            </>
        )
    },
    {
        type: 'subheader',
        content: '4. Escolher o Fluido Correto'
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="border border-gray-600 p-1">Fluido</th>
                            <th className="border border-gray-600 p-1">[Na⁺] (mEq/L)</th>
                            <th className="border border-gray-600 p-1">Uso Principal na Hiponatremia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">NaCl 0,9% (Soro Fisiológico)</td>
                            <td className="border border-gray-600 p-1">154</td>
                            <td className="border border-gray-600 p-1">
                                • Hiponatremia hipovolêmica (reestabelece o volume)<br/>
                                • Hiponatremia leve a moderada assintomática
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">NaCl 3% (Solução Hipertônica)</td>
                            <td className="border border-gray-600 p-1">513</td>
                            <td className="border border-gray-600 p-1">
                                • EMERGÊNCIA: Hiponatremia aguda com sinais neurológicos graves.<br/>
                                • Usar em bolus ou infusão lenta por pouco tempo.
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">NaCl 7,5% (Solução Hipertônica)</td>
                            <td className="border border-gray-600 p-1">1283</td>
                            <td className="border border-gray-600 p-1">
                                • Uso muito restrito, principalmente em reanimação de grandes animais. Cautela extrema.
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Ringer com Lactato</td>
                            <td className="border border-gray-600 p-1">130</td>
                            <td className="border border-gray-600 p-1">
                                • Não é ideal para elevar o sódio, mas pode ser usada em casos hipovolêmicos leves.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: '5. Calcular a Taxa de Infusão (O Coração do App)'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Existem duas maneiras principais de abordar o cálculo:
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Método A (Clássico - para hiponatremia sintomática):</strong>
                    <br/>• Meta inicial rápida: Aumentar o Na⁺ em 2-4 mEq/L nas primeiras 2-3 horas para controlar os sinais neurológicos.
                    <br/>• Use a fórmula do déficit para calcular os mEq necessários para essa pequena elevação.
                    <br/>• Administre esse déficit usando NaCl 3%.
                </li>
                <li><strong>Método B (Fórmula Mestre - para infusão contínua):</strong>
                    <br/>Esta é a fórmula mais precisa para prever como uma infusão contínua vai alterar o sódio sérico.
                </li>
            </>
        )
    },
    {
        type: 'formula',
        content: "Mudança no Na⁺ sérico (mEq/L/h) = [(Na⁺ do fluido – Na⁺ do paciente) × Taxa de infusão (L/h)] / (ACT + 1)"
    },
    {
        type: 'paragraph',
        content: (
            <>
                Você pode reorganizar a fórmula para encontrar a taxa de infusão necessária para atingir sua "velocidade máxima" (ex: 0.5 mEq/L/h).
            </>
        )
    },
    {
        type: 'formula',
        content: "Taxa de infusão (L/h) = [Mudança desejada no Na⁺ (mEq/L/h) × (ACT + 1)] / (Na⁺ do fluido – Na⁺ do paciente)"
    },
    {
        type: 'subheader',
        content: 'Exemplo Clínico Aplicado (Hiponatremia Grave)'
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Paciente:</strong> "Addie", um Poodle de 8 kg com crise Addisoniana.
                <br/><br/>
                <strong>Dados:</strong> Na⁺ sérico = 118 mEq/L. Paciente com letargia severa e tremores.
                <br/><br/>
                <strong>Meta:</strong> Aumentar o Na⁺ em 0.5 mEq/L por hora.
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Cálculo com a Fórmula Mestre (usando NaCl 0,9%):</strong>
                <br/><br/>
                <strong>Água Corporal Total (ACT):</strong> 0.6 × 8 kg = 4.8 L
                <br/><br/>
                <strong>Taxa de Infusão (L/h):</strong>
                <br/>Taxa (L/h) = [0.5 × (4.8 + 1)] / (154 - 118) = (0.5 × 5.8) / 36 = 2.9 / 36 ≈ 0.080 L/h
                <br/><br/>
                Converter para mL/h: 0.080 L/h × 1000 = 80 mL/h
                <br/><br/>
                Portanto, uma infusão de NaCl 0,9% a 80 mL/h deverá aumentar o sódio do "Addie" na velocidade segura de 0.5 mEq/L por hora.
            </>
        )
    },
    {
        type: 'warning',
        title: '❌ O Que NÃO Fazer',
        content: (
            <>
                • NÃO corrija o sódio mais rápido que 12 mEq/L em 24 horas.
                <br/>• NÃO administre um bolus de salina hipertônica em um paciente assintomático.
                <br/>• NÃO use fluidos hipotônicos (ex: D5W, NaCl 0,45%) em um paciente hiponatrêmico, a menos que seja um caso muito específico de hipervolemia e sob monitoramento intenso.
            </>
        )
    },
    {
        type: 'subheader',
        content: '✅ Monitoramento'
    },
    {
        type: 'list',
        content: (
            <>
                <li>Meça o Na⁺ sérico a cada 2-4 horas no início da terapia.</li>
                <li>Após estabilização, meça a cada 6-12 horas.</li>
                <li>Avalie o estado neurológico e a volemia constantemente.</li>
            </>
        )
    },
    { type: 'subheader', content: '📈 Seção 2: HIPERNATREMIA (Aumento de Sódio)' },
    {
        type: 'paragraph',
        content: (
            <>
                Menos comum, mas frequentemente mais perigosa que a hiponatremia.
            </>
        )
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Definição:</strong> Concentração sérica de sódio {">"} 155 mEq/L em cães e {">"} 165 mEq/L em gatos.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Fisiopatologia Explicada: O "Suco Concentrado"'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Hipernatremia é um estado de déficit de água livre. O "suco" está muito forte porque a água evaporou. A causa é sempre uma de três: perda de água, falha no mecanismo da sede ou, raramente, ganho excessivo de sal.
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Etiologia: As Causas da Hipernatremia'
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="border border-gray-600 p-1">Causa Principal</th>
                            <th className="border border-gray-600 p-1">Mecanismo</th>
                            <th className="border border-gray-600 p-1">Exemplos Clínicos Comuns</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">Perda de Água Livre</td>
                            <td className="border border-gray-600 p-1">Perda de água em excesso ao sódio</td>
                            <td className="border border-gray-600 p-1">
                                • Diabetes Insipidus (Central ou Nefrogênico): Deficiência ou falta de resposta ao ADH<br/>
                                • Perdas Insensíveis: Febre alta, golpe de calor (heatstroke), queimação extensa
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Perda de Fluido Hipotônico</td>
                            <td className="border border-gray-600 p-1">Perda de água e sódio, com a perda de água sendo maior</td>
                            <td className="border border-gray-600 p-1">
                                • Perdas Gastrointestinais: Vômito, diarreia aquosa<br/>
                                • Perdas Renais: Diurese osmótica (glicemia, manitol)
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Ganho de Sódio (raro)</td>
                            <td className="border border-gray-600 p-1">Ingestão ou administração excessiva de sódio</td>
                            <td className="border border-gray-600 p-1">
                                • Intoxicação por sal: Ingestão de sal de cozinha, água do mar, massa de pão caseira<br/>
                                • Administração iatrogênica: Uso incorreto de fluidos hipertônicos, bicarbonato de sódio
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Acesso Limitado à Água</td>
                            <td className="border border-gray-600 p-1">Incapacidade de beber</td>
                            <td className="border border-gray-600 p-1">
                                • Animais presos, imobilizados, com alterações neurológicas que afetam a sede
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: 'Sinais Clínicos: O Cérebro Encolhe'
    },
    {
        type: 'paragraph',
        content: (
            <>
                Os sinais também são neurológicos. O plasma hipertônico puxa água de dentro das células cerebrais, causando desidratação e encolhimento celular. Isso pode levar à ruptura de vasos cerebrais e hemorragia.
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Sinais:</strong> Letargia, fraqueza, ataxia, tremores, convulsões, coma. Sede intensa é um sinal inicial característico.
            </>
        )
    },
    {
        type: 'subheader',
        content: '🛠️ GUIA DE TRATAMENTO DA HIPERNATREMIA'
    },
    {
        type: 'warning',
        title: 'Princípio-Chave',
        content: (
            <>
                Corrigir LENTAMENTE para evitar o Edema Cerebral. Um cérebro cronicamente desidratado produz "osmoles idiogênicos" para se proteger. Uma reidratação rápida faz com que a água entre abruptamente nessas células, causando edema cerebral fatal.
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
                <li><strong>1. Definir a "Velocidade Máxima" de Correção:</strong>
                    <br/>• Regra de Ouro: Não reduzir o Na⁺ mais rápido que 0.5 mEq/L/hora.
                    <br/>• Meta Máxima em 24h: Redução total de 8 a 12 mEq/L.
                </li>
                <li><strong>2. Calcular o Déficit de Água Livre:</strong>
                    <br/>Esta fórmula estima a quantidade de água pura que o paciente "perdeu".
                </li>
            </>
        )
    },
    {
        type: 'formula',
        content: "Déficit de Água Livre (L) = [(Na⁺ do paciente / Na⁺ normal) – 1] × ACT"
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Na⁺ normal:</strong> Pode-se usar o ponto médio da faixa de referência (ex: 145 mEq/L para cães).
            </>
        )
    },
    {
        type: 'subheader',
        content: '3. Escolher o Fluido Correto'
    },
    {
        type: 'paragraph',
        content: (
            <>
                O objetivo é fornecer água livre de eletrólitos ou com baixo teor de sódio.
            </>
        )
    },
    {
        type: 'table',
        content: (
            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="border border-gray-600 p-1">Fluido</th>
                            <th className="border border-gray-600 p-1">[Na⁺] (mEq/L)</th>
                            <th className="border border-gray-600 p-1">Uso Principal na Hipernatremia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 p-1">Dextrose 5% em Água (D5W)</td>
                            <td className="border border-gray-600 p-1">0</td>
                            <td className="border border-gray-600 p-1">
                                • Fluido ideal. Fornece água livre (a dextrose é metabolizada)<br/>
                                • Cuidado: pode causar glicosúria se infundida rapidamente
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">NaCl 0,45% (Meia Salina)</td>
                            <td className="border border-gray-600 p-1">77</td>
                            <td className="border border-gray-600 p-1">
                                • Boa opção, especialmente se houver alguma depleção de volume<br/>
                                • Menos agressivo que D5W
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 p-1">Ringer com Lactato ou NaCl 0,9%</td>
                            <td className="border border-gray-600 p-1">130 ou 154</td>
                            <td className="border border-gray-600 p-1">
                                • Apenas se o paciente estiver em choque hipovolêmico! Primeiro, restaure a perfusão com esses fluidos e, em seguida, mude para um fluido hipotônico para corrigir o Na⁺
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        type: 'subheader',
        content: '4. Calcular a Taxa de Infusão'
    },
    {
        type: 'list',
        content: (
            <>
                <li><strong>Repor o Déficit de Água:</strong> Divida o volume do déficit calculado pelo tempo desejado de correção (geralmente 24-48 horas).</li>
                <li><strong>Calcular a Manutenção:</strong> Use a fórmula padrão (40-60 mL/kg/dia).</li>
                <li><strong>Estimar Perdas Atuais:</strong> Adicione o volume de vômito/diarreia.</li>
                <li><strong>Somar tudo:</strong> (Déficit / Tempo) + Manutenção + Perdas = Taxa de Infusão Total.</li>
            </>
        )
    },
    {
        type: 'subheader',
        content: 'Exemplo Clínico Aplicado (Hipernatremia Grave)'
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Paciente:</strong> "Kitty", uma gata de 4 kg com suspeita de Diabetes Insipidus.
                <br/><br/>
                <strong>Dados:</strong> Na⁺ sérico = 180 mEq/L. A gata está desidratada (8%) e com ataxia.
            </>
        )
    },
    {
        type: 'paragraph',
        content: (
            <>
                <strong>Cálculo da Correção:</strong>
                <br/><br/>
                <strong>ACT:</strong> 0.6 × 4 kg = 2.4 L
                <br/><br/>
                <strong>Déficit de Água Livre (L):</strong>
                <br/>Déficit (L) = [(180/155) – 1] × 2.4 = [1.16 – 1] × 2.4 = 0.16 × 2.4 ≈ 0.384 L
                <br/>Déficit = 384 mL de água livre.
                <br/><br/>
                <strong>Planejamento:</strong> Vamos repor este déficit em 48 horas.
                <br/><br/>
                <strong>Taxa de reposição do déficit:</strong> 384 mL / 48 h = 8 mL/h
                <br/><br/>
                <strong>Manutenção:</strong> 50 mL/kg/dia = 50 × 4 = 200 mL/dia = 8.3 mL/h
                <br/><br/>
                <strong>Taxa de Infusão Total (usando D5W):</strong>
                <br/>Taxa Total = Reposição do Déficit + Manutenção = 8 mL/h + 8.3 mL/h = 16.3 mL/h
                <br/><br/>
                A gata "Kitty" deve receber D5W a uma taxa de aproximadamente 16-17 mL/h. Isso irá lentamente repor seu déficit de água e baixar o sódio de forma segura.
            </>
        )
    },
    {
        type: 'warning',
        title: '❌ O Que NÃO Fazer',
        content: (
            <>
                • NÃO diminua o sódio mais rápido que 12 mEq/L em 24 horas.
                <br/>• NÃO administre um bolus de fluido hipotônico.
                <br/>• NÃO use a via oral (dar água para beber à vontade) como único método em pacientes com hipernatremia grave ou com estado mental alterado, pois a ingestão não pode ser controlada.
            </>
        )
    },
    {
        type: 'subheader',
        content: '✅ Monitoramento'
    },
    {
        type: 'list',
        content: (
            <>
                <li>Meça o Na⁺ sérico a cada 2-4 horas no início, depois a cada 6-12 horas.</li>
                <li>Monitore o estado neurológico, débito urinário e glicemia (se usando D5W).</li>
            </>
        )
    }
];
