import React from 'react';
import { ElectrolyteData, FormularyItem, ContentBlock } from '../types';
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

export const POTASSIUM_REPLACEMENT_TABLE_CONTENT = (
    <div className="text-left">
      <p className="font-bold mb-2">Tabela de Reposição de Potássio (K⁺)</p>
      <p className="text-xs mb-2">Esta tabela oferece uma abordagem empírica e segura para a suplementação de potássio, baseada na concentração sérica atual do paciente. É preferível a fórmulas de déficit, pois evita correções excessivamente rápidas e arriscadas.</p>
      <table className="w-full text-xs border-collapse">
        <thead className="bg-gray-700">
          <tr>
            <th className="border border-gray-600 p-1">K⁺ Sérico (mEq/L)</th>
            <th className="border border-gray-600 p-1">mEq de KCl a adicionar por Litro de fluido</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-600 p-1">{'< 2.0'}</td><td className="border border-gray-600 p-1">80</td></tr>
          <tr><td className="border border-gray-600 p-1">2.1 - 2.5</td><td className="border border-gray-600 p-1">60</td></tr>
          <tr><td className="border border-gray-600 p-1">2.6 - 3.0</td><td className="border border-gray-600 p-1">40</td></tr>
          <tr><td className="border border-gray-600 p-1">3.1 - 3.5</td><td className="border border-gray-600 p-1">28</td></tr>
          <tr><td className="border border-gray-600 p-1">{'> 3.5'}</td><td className="border border-gray-600 p-1">20</td></tr>
        </tbody>
      </table>
      <p className="text-xs mt-2"><strong>Fonte:</strong> Recomendações de fluidoterapia de DiBartola. A taxa máxima de infusão <strong>nunca</strong> deve exceder 0.5 mEq/kg/hora.</p>
    </div>
  );

const SODIUM_DATA: ElectrolyteData = {
    id: 'sodio',
    name: "Sódio (Na⁺)",
    normalValues: {
        dog: "143–150 mEq/L",
        cat: "149–158 mEq/L",
        puppy: "Ligeiramente inferior devido à alimentação líquida",
        elderly: "Risco aumentado de hipernatremia por diminuição da sede"
    },
    content: [
        { type: 'header', content: '👑 Sódio (Na⁺): Guia Prático' },
        
        { type: 'warning', title: '⚠️ REGRA DE OURO', content: 'NUNCA corrigir sódio mais rápido que 0.5 mEq/L/hora. Máximo 12 mEq/L em 24h. Correção rápida pode causar edema cerebral!' },
        
        { type: 'subheader', content: '📉 HIPONATREMIA - Quando está baixo' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Vômito/Diarreia:</strong> Perda de sódio + reposição só com água</li>
                <li><strong>Doença de Addison:</strong> Falta de aldosterona</li>
                <li><strong>Diuréticos:</strong> Furosemida, tiazídicos</li>
                <li><strong>Insuficiência cardíaca:</strong> Excesso de ADH</li>
                <li><strong>Fluidoterapia inadequada:</strong> Muito fluido hipotônico</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>Neurológicos:</strong> Letargia, confusão, fraqueza</li>
                <li><strong>Graves:</strong> Convulsões, coma</li>
                <li>Anorexia, vômito</li>
                <li>Mucosas secas, desidratação</li>
            </>
        )},
        
        { type: 'warning', title: '💧 COMO CORRIGIR HIPONATREMIA', content: (
            <>
                <strong>1. Determinar o status volêmico:</strong>
                <br/>• <strong>Hipovolêmica:</strong> NaCl 0.9% ou Ringer Lactato
                <br/>• <strong>Euvolêmica:</strong> Restringir água, NaCl 0.9% com cuidado
                <br/>• <strong>Hipervolêmica:</strong> Restringir fluidos, diuréticos
                <br/><br/>
                <strong>2. Calcular o déficit:</strong>
                <br/>• Déficit Na⁺ = (Na⁺ desejado - Na⁺ atual) × peso × 0.6
                <br/>• Corrigir metade nas primeiras 12h, metade nas próximas 12h
                <br/><br/>
                <strong>3. Monitorar:</strong>
                <br/>• Na⁺ sérico a cada 4-6h inicialmente
                <br/>• Sinais neurológicos
            </>
        )},
        
        { type: 'subheader', content: '📈 HIPERNATREMIA - Quando está alto' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Diabetes insipidus:</strong> Falta de ADH</li>
                <li><strong>Perda de água:</strong> Febre, hiperventilação, diarreia osmótica</li>
                <li><strong>Intoxicação por sal:</strong> Raro, mas pode acontecer</li>
                <li><strong>Fluidoterapia inadequada:</strong> Muito NaCl 0.9%</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>Neurológicos:</strong> Irritabilidade, convulsões</li>
                <li><strong>PU/PD:</strong> Sede intensa, urina muito</li>
                <li>Mucosas pegajosas</li>
                <li>Desidratação severa</li>
            </>
        )},
        
        { type: 'warning', title: '💧 COMO CORRIGIR HIPERNATREMIA', content: (
            <>
                <strong>1. Calcular déficit de água livre:</strong>
                <br/>• Déficit H₂O = [(Na⁺ atual / 150) - 1] × peso × 0.6
                <br/><br/>
                <strong>2. Fluidos de escolha:</strong>
                <br/>• <strong>Glicose 5%:</strong> Para correção pura
                <br/>• <strong>NaCl 0.45%:</strong> Se também hipovolêmico
                <br/>• <strong>Ringer Lactato:</strong> Se choque
                <br/><br/>
                <strong>3. Taxa de correção:</strong>
                <br/>• Máximo 0.5 mEq/L/hora
                <br/>• Corrigir 50% do déficit em 24h
            </>
        )},
        
        { type: 'subheader', content: '🧮 Fórmulas Úteis:' },
        { type: 'list', content: (
            <>
                <li><strong>Déficit de Na⁺:</strong> (Na⁺ desejado - atual) × peso × 0.6</li>
                <li><strong>Déficit de água:</strong> [(Na⁺ atual / 150) - 1] × peso × 0.6</li>
                <li><strong>Taxa de infusão:</strong> Déficit ÷ tempo desejado (h)</li>
            </>
        )},
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Correção lenta é sempre mais segura</li>
                <li>Monitorar sinais neurológicos constantemente</li>
                <li>Hiponatremia crônica corrige mais devagar</li>
                <li>Na⁺ {"<"} 120 ou {">"} 180 mEq/L = emergência</li>
                <li>Sempre avaliar status volêmico antes de tratar</li>
            </>
        )}
    ]
};

const POTASSIUM_DATA: ElectrolyteData = {
    id: 'potassio',
    name: "Potássio (K⁺)",
    normalValues: {
        dog: "4.1–5.4 mEq/L",
        cat: "3.8–5.5 mEq/L",
        puppy: "Valores ligeiramente maiores por dieta láctea",
        elderly: "Risco de hipocalemia por medicações (IECA, espironolactona)"
    },
    content: [
        { type: 'header', content: '⚡ Potássio (K⁺): Guia Prático' },
        
        { type: 'warning', title: '⚠️ REGRA DE OURO', content: 'NUNCA infundir potássio IV mais rápido que 0.5 mEq/kg/hora. Pode causar parada cardíaca!' },
        
        { type: 'subheader', content: '📉 HIPOCALEMIA - Quando está baixo' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Doença renal crônica:</strong> Especialmente em gatos - o rim "lava" o potássio</li>
                <li><strong>Vômito/Diarreia:</strong> Perda direta + alcalose que joga K⁺ para dentro da célula</li>
                <li><strong>Anorexia prolongada:</strong> Qualquer doença que diminua apetite por vários dias</li>
                <li><strong>Diuréticos:</strong> Furosemida, tiazídicos</li>
                <li><strong>Cushing:</strong> Excesso de cortisol</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li>Fraqueza muscular generalizada, letargia</li>
                <li><strong>Gatos:</strong> Ventroflexão cervical (cabeça "caída" no peito)</li>
                <li>Anorexia, íleo paralítico</li>
                <li>Arritmias cardíacas</li>
            </>
        )},
        
        { type: 'warning', title: '💉 COMO REPOR POTÁSSIO', content: (
            <>
                <strong>Via Oral (se paciente come):</strong>
                <br/>• Gluconato ou Citrato de K⁺ (mais palatáveis que KCl)
                <br/><br/>
                <strong>Via IV (casos graves ou anorexia):</strong>
                <br/>• Use a tabela abaixo baseada no K⁺ sérico
                <br/>• Adicione KCl ao soro e agite MUITO BEM
                <br/>• NUNCA dê KCl concentrado ou SC
            </>
        )},
        
        { type: 'subheader', content: '📊 Tabela de Reposição IV:' },
        { type: 'table', content: (
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-2">K⁺ Sérico (mEq/L)</th>
                            <th className="border border-gray-600 p-2">KCl por Litro (mEq)</th>
                            <th className="border border-gray-600 p-2">Taxa Máx Fluido (mL/kg/h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="border border-gray-600 p-2">{"<"} 2.0</td><td className="border border-gray-600 p-2">80</td><td className="border border-gray-600 p-2">6</td></tr>
                        <tr><td className="border border-gray-600 p-2">2.1 - 2.5</td><td className="border border-gray-600 p-2">60</td><td className="border border-gray-600 p-2">8</td></tr>
                        <tr><td className="border border-gray-600 p-2">2.6 - 3.0</td><td className="border border-gray-600 p-2">40</td><td className="border border-gray-600 p-2">12</td></tr>
                        <tr><td className="border border-gray-600 p-2">3.1 - 3.5</td><td className="border border-gray-600 p-2">28</td><td className="border border-gray-600 p-2">18</td></tr>
                        <tr><td className="border border-gray-600 p-2">3.6 - 5.0</td><td className="border border-gray-600 p-2">20</td><td className="border border-gray-600 p-2">25</td></tr>
                    </tbody>
                </table>
            </div>
        )},
        
        { type: 'subheader', content: 'Monitoramento:' },
        { type: 'list', content: (
            <>
                <li>Verificar K⁺ sérico a cada 12-24h</li>
                <li>ECG se hipocalemia grave</li>
                <li>Em casos críticos: monitorar a cada 4-6h</li>
            </>
        )},
        
        { type: 'subheader', content: '📈 HIPERCALEMIA - Quando está alto' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Obstrução uretral:</strong> Principalmente gatos machos - urina não sai, K⁺ se acumula</li>
                <li><strong>Doença de Addison:</strong> Falta de aldosterona</li>
                <li><strong>Insuficiência renal aguda:</strong> Fase oligúrica/anúrica</li>
                <li><strong>Uroabdômen:</strong> Urina vaza para abdômen</li>
                <li><strong>Iatrogênica:</strong> Erro na fluidoterapia</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>Bradicardia:</strong> Sinal mais consistente</li>
                <li>Fraqueza muscular, tremores</li>
                <li><strong>ECG:</strong> Ondas T altas → P desaparece → QRS largo → parada cardíaca</li>
            </>
        )},
        
        { type: 'warning', title: '🚨 TRATAMENTO DE EMERGÊNCIA', content: (
            <>
                <strong>Mnemônico C.A.I.G.O.U:</strong>
                <br/>• <strong>C</strong>álcio: Gluconato Ca 10% (0.5-1.5 mL/kg IV lento) - protege coração
                <br/>• <strong>A</strong>lcalinizante: Bicarbonato se acidose
                <br/>• <strong>I</strong>nsulina + Glicose: Joga K⁺ para dentro da célula
                <br/>• <strong>G</strong>licose: 1-2g por unidade de insulina
                <br/>• <strong>O</strong>ut: Fluidoterapia sem K⁺, diuréticos
                <br/>• <strong>U</strong>rgência: Tratar causa base (desobstruir, etc.)
            </>
        )},
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Hipocalemia é mais comum que hipercalemia</li>
                <li>Gatos com DRC quase sempre têm hipocalemia</li>
                <li>Hipercalemia com ECG alterado = emergência absoluta</li>
                <li>Sempre agitar bem a bolsa após adicionar KCl</li>
                <li>Monitorar ECG durante correção rápida</li>
            </>
        )}
    ]
};

const CHLORIDE_DATA: ElectrolyteData = {
    id: 'cloro',
    name: "Cloreto (Cl⁻)",
    normalValues: {
        dog: "106–114 mEq/L",
        cat: "111–124 mEq/L"
    },
    content: [
        { type: 'header', content: '⚖️ Cloreto (Cl⁻): Guia Prático' },
        
        { type: 'warning', title: '💡 CONCEITO CHAVE', content: 'O cloro anda junto com o bicarbonato. Se cloro sobe, bicarbonato desce (acidose). Se cloro desce, bicarbonato sobe (alcalose).' },
        
        { type: 'subheader', content: '📉 HIPOCLOREMIA - Quando está baixo' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Vômito gástrico:</strong> Perde HCl → hipocloremia + alcalose</li>
                <li><strong>Diuréticos de alça:</strong> Furosemida causa perda de Cl⁻</li>
                <li><strong>Fluidoterapia inadequada:</strong> Muito fluido sem cloro</li>
                <li><strong>Sudorese excessiva:</strong> Raro em cães/gatos</li>
            </>
        )},
        
        { type: 'subheader', content: 'Consequências:' },
        { type: 'list', content: (
            <>
                <li><strong>Alcalose metabólica hipoclorêmica</strong></li>
                <li>pH alto, HCO₃⁻ alto, Cl⁻ baixo</li>
                <li>Compensação respiratória (hipoventilação)</li>
            </>
        )},
        
        { type: 'warning', title: '💧 COMO CORRIGIR HIPOCLOREMIA', content: (
            <>
                <strong>Fluido de escolha: NaCl 0.9%</strong>
                <br/>• Rico em cloro (154 mEq/L)
                <br/>• Corrige a alcalose hipoclorêmica
                <br/>• Evitar fluidos balanceados inicialmente
                <br/><br/>
                <strong>Dose:</strong> 1-2x taxa de manutenção
                <br/>• Monitorar eletrólitos a cada 12-24h
                <br/>• Parar quando Cl⁻ normalizar
            </>
        )},
        
        { type: 'subheader', content: '📈 HIPERCLOREMIA - Quando está alto' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Excesso de NaCl 0.9%:</strong> Fluidoterapia excessiva</li>
                <li><strong>Diarreia:</strong> Perde bicarbonato, fica com excesso relativo de cloro</li>
                <li><strong>Acidose tubular renal:</strong> Rim não reabsorve bicarbonato</li>
                <li><strong>Carboanidrase inibida:</strong> Acetazolamida</li>
            </>
        )},
        
        { type: 'subheader', content: 'Consequências:' },
        { type: 'list', content: (
            <>
                <li><strong>Acidose metabólica hiperclorêmica</strong></li>
                <li>pH baixo, HCO₃⁻ baixo, Cl⁻ alto</li>
                <li>Gap aniônico normal</li>
            </>
        )},
        
        { type: 'warning', title: '💧 COMO CORRIGIR HIPERCLOREMIA', content: (
            <>
                <strong>1. Parar NaCl 0.9%</strong>
                <br/>• Trocar por fluidos balanceados
                <br/>• Ringer Lactato ou Plasmalyte
                <br/><br/>
                <strong>2. Fluidos de escolha:</strong>
                <br/>• <strong>Ringer Lactato:</strong> Cl⁻ = 109 mEq/L
                <br/>• <strong>Plasmalyte:</strong> Cl⁻ = 98 mEq/L
                <br/>• Evitar NaCl 0.9% (Cl⁻ = 154 mEq/L)
                <br/><br/>
                <strong>3. Tratar causa base:</strong>
                <br/>• Controlar diarreia
                <br/>• Ajustar medicações
            </>
        )},
        
        { type: 'subheader', content: '📊 Guia de Seleção de Fluidos:' },
        { type: 'table', content: (
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-2">Fluido</th>
                            <th className="border border-gray-600 p-2">Cl⁻ (mEq/L)</th>
                            <th className="border border-gray-600 p-2">Usar quando</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="border border-gray-600 p-2">NaCl 0.9%</td><td className="border border-gray-600 p-2">154</td><td className="border border-gray-600 p-2">Hipocloremia, alcalose</td></tr>
                        <tr><td className="border border-gray-600 p-2">Ringer Lactato</td><td className="border border-gray-600 p-2">109</td><td className="border border-gray-600 p-2">Balanceado, uso geral</td></tr>
                        <tr><td className="border border-gray-600 p-2">Plasmalyte</td><td className="border border-gray-600 p-2">98</td><td className="border border-gray-600 p-2">Hipercloremia, acidose</td></tr>
                        <tr><td className="border border-gray-600 p-2">Glicose 5%</td><td className="border border-gray-600 p-2">0</td><td className="border border-gray-600 p-2">Só água livre</td></tr>
                    </tbody>
                </table>
            </div>
        )},
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Cloro e bicarbonato são inversamente relacionados</li>
                <li>NaCl 0.9% pode causar acidose hiperclorêmica</li>
                <li>Vômito = hipocloremia, diarreia = hipercloremia</li>
                <li>Sempre avaliar junto com gasometria</li>
                <li>Gap aniônico ajuda no diagnóstico</li>
            </>
        )}
    ]
};

const BICARBONATE_DATA: ElectrolyteData = {
    id: 'bicarbonato',
    name: "Bicarbonato (HCO₃⁻) e pH",
    normalValues: {
        dog: "pH: 7.35–7.45, HCO₃⁻: 14–24 mEq/L",
        cat: "pH: 7.35–7.45, HCO₃⁻: 14–20 mEq/L"
    },
    content: [
        { type: 'header', content: 'Bicarbonato (HCO₃⁻) e pH' },
        { type: 'subheader', content: 'Função e Homeostase' },
        { type: 'paragraph', content: "O bicarbonato é a principal base do sistema tampão sanguíneo, crucial para manter o pH em uma faixa estreita. O equilíbrio é governado pela equação de Henderson-Hasselbalch, com os pulmões regulando o CO₂ (componente ácido) e os rins regulando o HCO₃⁻ (componente básico)." },
        { type: 'paragraph', content: <strong className="text-xl text-red-600 dark:text-red-400">Acidose Metabólica (HCO₃⁻ Baixo)</strong> },
        { type: 'paragraph', content: "Caracterizada por baixo HCO₃⁻ e baixo pH. Pode ser dividida em:" },
        { type: 'list', content: <>
            <li><strong>Com Ânion Gap Aumentado:</strong> Acúmulo de ácidos não medidos, como em <Highlight color="red">cetoacidose diabética</Highlight>, <Highlight color="red">acidose lática</Highlight> (choque), insuficiência renal e intoxicação por etilenoglicol.</li>
            <li><strong>Com Ânion Gap Normal (Hiperclorêmica):</strong> Perda de bicarbonato, como em <Highlight color="orange">diarreia severa</Highlight> ou acidose tubular renal.</li>
        </> },
        { type: 'subheader', content: 'Tratamento da Acidose Metabólica' },
        { type: 'paragraph', content: "O principal é tratar a causa base. A terapia com bicarbonato de sódio é reservada para casos graves (pH < 7.1 ou HCO₃⁻ < 12 mEq/L) devido a riscos como sobrecarga de sódio, hipocalemia e acidose paradoxal do SNC." },
        { type: 'formula', content: "Déficit de Base (mEq) = 0.3 * peso(kg) * (HCO₃⁻ desejado – HCO₃⁻ atual)" },
        { type: 'paragraph', content: <strong className="text-xl text-blue-600 dark:text-blue-400">Alcalose Metabólica (HCO₃⁻ Alto)</strong> },
        { type: 'paragraph', content: <>Caracterizada por alto HCO₃⁻ e alto pH. A principal causa é a <Highlight color="blue">perda de ácido gástrico por vômitos</Highlight>. Outras causas incluem o uso de diuréticos e hiperaldosteronismo.</> },
        { type: 'warning', title: 'Efeitos da Alcalose', content: 'A alcalose diminui o cálcio ionizado, podendo causar sinais de tetania (tremores, espasmos). Também pode causar hipoventilação compensatória.' },
        { type: 'subheader', content: 'Tratamento da Alcalose Metabólica' },
        { type: 'paragraph', content: <>A maioria dos casos responde à correção da causa base e à administração de fluidos ricos em cloreto (<Highlight color='orange'>NaCl 0.9%</Highlight>) com suplementação de potássio (KCl). Isso corrige a volemia e a cloremia, permitindo que os rins excretem o excesso de bicarbonato.</> }
    ]
};

const GLUCOSE_DATA: ElectrolyteData = {
    id: 'glicemia',
    name: "Glicemia",
    normalValues: {
        dog: "68–104 mg/dL",
        cat: "71–182 mg/dL",
        puppy: "Valores inferiores - reservas limitadas de glicogênio"
    },
    content: [
        { type: 'header', content: '🍯 Glicemia: Guia Prático' },
        
        { type: 'warning', title: '⚠️ CONCEITO CHAVE', content: 'Filhotes têm reservas limitadas de glicogênio e podem desenvolver hipoglicemia rapidamente durante jejum ou estresse.' },
        
        { type: 'subheader', content: '📉 HIPOGLICEMIA - Quando está baixa' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Insulinoma:</strong> Tumor pancreático que secreta insulina</li>
                <li><strong>Hepatopatia:</strong> Fígado não produz glicose adequadamente</li>
                <li><strong>Septicemia:</strong> Consumo aumentado de glicose</li>
                <li><strong>Doença de Addison:</strong> Deficiência de cortisol</li>
                <li><strong>Filhotes:</strong> Jejum prolongado, estresse, parasitismo</li>
                <li><strong>Iatrogênica:</strong> Overdose de insulina</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li>Fraqueza, letargia, tremores</li>
                <li><strong>Sinais neurológicos:</strong> Convulsões, coma</li>
                <li>Taquicardia, sudorese (raro em cães/gatos)</li>
                <li>Fome intensa (se consciente)</li>
            </>
        )},
        
        { type: 'warning', title: '🚨 TRATAMENTO DE EMERGÊNCIA', content: (
            <>
                <strong>Em casa:</strong>
                <br/>• Friccionar mel ou xarope de milho na mucosa oral
                <br/><br/>
                <strong>No hospital:</strong>
                <br/>• <strong>Dextrose 50%:</strong> 0.5-1 mL/kg diluída 1:2 IV lentamente
                <br/>• <strong>Repetir se necessário</strong> a cada 15-30 min
                <br/>• <strong>Infusão contínua:</strong> Dextrose 2.5-5% para manter 60-150 mg/dL
                <br/>• <strong>Neonatos:</strong> Podem precisar dextrose 12.5% (diluir 50% em 1:3)
            </>
        )},
        
        { type: 'subheader', content: 'Para Hipoglicemia Refratária:' },
        { type: 'list', content: (
            <>
                <li><strong>Glucagon:</strong> 50 ng/kg IV bolus + 15 ng/kg/min CRI</li>
                <li><strong>Corticoides:</strong> Se suspeita de hipoadrenocorticismo</li>
                <li>Investigar causa base (insulinoma, hepatopatia)</li>
            </>
        )},
        
        { type: 'subheader', content: '📈 HIPERGLICEMIA - Quando está alta' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Diabetes mellitus:</strong> Deficiência de insulina</li>
                <li><strong>Cetoacidose diabética:</strong> Complicação do diabetes</li>
                <li><strong>Pancreatite:</strong> Inflamação destrói células beta</li>
                <li><strong>Estresse (gatos):</strong> Hiperglicemia de estresse pode chegar a 400 mg/dL</li>
                <li><strong>Medicações:</strong> Glicocorticoides, dextrose excessiva</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>PU/PD:</strong> Diurese osmótica</li>
                <li>Perda de peso com polifagia</li>
                <li>Desidratação, letargia</li>
                <li><strong>CAD:</strong> Vômito, hálito cetônico, taquipneia</li>
            </>
        )},
        
        { type: 'warning', title: '💧 TRATAMENTO DA HIPERGLICEMIA', content: (
            <>
                <strong>1. Fluidoterapia:</strong>
                <br/>• NaCl 0.9% ou Ringer Lactato (sem dextrose inicialmente)
                <br/>• Corrigir desidratação primeiro
                <br/><br/>
                <strong>2. Insulinoterapia:</strong>
                <br/>• Insulina regular IV/IM em bolus e CRI
                <br/>• Meta: reduzir 50-100 mg/dL por hora
                <br/>• Quando glicose ≤ 250 mg/dL: adicionar dextrose 2.5-5%
                <br/><br/>
                <strong>3. Monitorar eletrólitos:</strong>
                <br/>• K⁺, P, Mg²⁺ caem com insulina
                <br/>• Suplementar conforme necessário
            </>
        )},
        
        { type: 'subheader', content: '🧮 Fórmula de Correção do Sódio:' },
        { type: 'formula', content: 'Na⁺ Corrigido = Na⁺ medido + 1.6 × (Glicose - 100)/100' },
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Filhotes desenvolvem hipoglicemia rapidamente</li>
                <li>Gatos podem ter hiperglicemia de estresse (até 400 mg/dL)</li>
                <li>CAD: corrigir desidratação antes de insulina</li>
                <li>Monitorar glicemia a cada 30 min durante tratamento</li>
                <li>Evitar correção muito rápida - risco de edema cerebral</li>
            </>
        )}
    ]
};

const MAGNESIUM_DATA: ElectrolyteData = {
    id: 'magnesio',
    name: "Magnésio (Mg²⁺)",
    normalValues: {
        dog: "1.5–2.1 mEq/L",
        cat: "1.7–2.2 mEq/L"
    },
    content: [
        { type: 'header', content: '🧲 Magnésio (Mg²⁺): Guia Prático' },
        
        { type: 'warning', title: '⚠️ CONCEITO CHAVE', content: 'Magnésio é cofator essencial para bomba Na⁺/K⁺-ATPase. Hipomagnesemia frequentemente causa hipocalemia RESISTENTE ao tratamento.' },
        
        { type: 'subheader', content: '📉 HIPOMAGNESEMIA - Quando está baixo' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Anorexia prolongada:</strong> Qualquer doença que diminua apetite</li>
                <li><strong>Diuréticos:</strong> Furosemida, tiazídicos</li>
                <li><strong>Hipercalcemia:</strong> Compete com magnésio</li>
                <li><strong>Hipoparatireoidismo:</strong> Após cirurgia de tireoide</li>
                <li><strong>Lactação:</strong> Tetania da lactação (comum em ruminantes)</li>
                <li><strong>Síndrome de realimentação:</strong> Deslocamento intracelular</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li>Tremores, fasciculações musculares</li>
                <li><strong>Convulsões:</strong> Especialmente tetânicas</li>
                <li>Fraqueza, letargia</li>
                <li><strong>Arritmias cardíacas</strong></li>
                <li><strong>Hipocalemia resistente:</strong> Não melhora só com K⁺</li>
                <li><strong>Hipocalcemia associada</strong></li>
            </>
        )},
        
        { type: 'warning', title: '💉 TRATAMENTO DA HIPOMAGNESEMIA', content: (
            <>
                <strong>Sulfato de Magnésio IV:</strong>
                <br/>• <strong>Dose:</strong> 0.1-0.3 mEq/kg/h (1.6-2.5 mg/kg/h)
                <br/>• <strong>Diluir em NaCl 0.9% ou dextrose 5%</strong>
                <br/>• <strong>Infundir lentamente</strong> (em 6-8 horas)
                <br/><br/>
                <strong>Via Oral (casos leves):</strong>
                <br/>• Óxido de magnésio: 10-20 mg/kg/dia
                <br/>• Dividir em 2-3 doses
                <br/><br/>
                <strong>Monitoramento:</strong>
                <br/>• Reflexos patelares (hipermagnesemia causa perda)
                <br/>• Creatinina (risco em insuficiência renal)
                <br/>• Mg²⁺ sérico a cada 12-24h
            </>
        )},
        
        { type: 'subheader', content: '📈 HIPERMAGNESEMIA - Quando está alto' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Suplementação iatrogênica:</strong> Overdose de sulfato de Mg</li>
                <li><strong>Insuficiência renal:</strong> Rim não excreta adequadamente</li>
                <li><strong>Lise celular:</strong> Liberação de Mg intracelular</li>
                <li><strong>Antiácidos:</strong> Uso excessivo de hidróxido de magnésio</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>Depressão do SNC:</strong> Sedação, coma</li>
                <li><strong>Bradicardia, hipotensão</strong></li>
                <li><strong>Perda de reflexos:</strong> Primeiro patelar, depois outros</li>
                <li><strong>Paralisia respiratória:</strong> Em casos graves</li>
            </>
        )},
        
        { type: 'warning', title: '🚨 TRATAMENTO DA HIPERMAGNESEMIA', content: (
            <>
                <strong>1. Suspender administração de Mg</strong>
                <br/><br/>
                <strong>2. Gluconato de Cálcio 10%:</strong>
                <br/>• 0.5-1 mL/kg IV lentamente
                <br/>• Antagoniza efeitos do magnésio
                <br/><br/>
                <strong>3. Fluidoterapia e diuréticos:</strong>
                <br/>• Se função renal normal
                <br/>• Furosemida 1-2 mg/kg
                <br/><br/>
                <strong>4. Hemodiálise:</strong>
                <br/>• Em casos graves com insuficiência renal
            </>
        )},
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Sempre suspeitar em hipocalemia resistente</li>
                <li>Lactação aumenta muito as necessidades</li>
                <li>Monitorar reflexos durante suplementação</li>
                <li>Cuidado redobrado em insuficiência renal</li>
                <li>Magnésio ionizado é a fração ativa</li>
            </>
        )}
    ]
};

const PHOSPHORUS_DATA: ElectrolyteData = {
    id: 'fosforo',
    name: "Fósforo (P) / Fosfato (PO₄³⁻)",
    normalValues: {
        dog: "2.7–5.4 mg/dL",
        cat: "2.6–5.5 mg/dL",
        puppy: "Valores fisiologicamente mais altos devido à deposição óssea"
    },
    content: [
        { type: 'header', content: '⚡ Fósforo (P): Guia Prático' },
        
        { type: 'warning', title: '⚠️ CONCEITO CHAVE', content: 'Fósforo é essencial para ATP, função eritrocitária e estrutura óssea. Filhotes têm valores naturalmente mais altos.' },
        
        { type: 'subheader', content: '📉 HIPOFOSFATEMIA - Quando está baixo' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Síndrome de realimentação:</strong> Deslocamento intracelular massivo</li>
                <li><strong>Insulinoterapia:</strong> CAD, hiperglicemia - insulina leva P para dentro da célula</li>
                <li><strong>Alcalose respiratória:</strong> Hiperventilação</li>
                <li><strong>Diuréticos:</strong> Perda renal aumentada</li>
                <li><strong>Hiperparatireoidismo:</strong> PTH aumenta excreção renal</li>
                <li><strong>Desnutrição:</strong> Ingestão inadequada</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>Fraqueza muscular:</strong> Falta de ATP</li>
                <li><strong>Hemólise:</strong> Eritrócitos ficam frágeis</li>
                <li><strong>Depressão, letargia</strong></li>
                <li><strong>Convulsões:</strong> Em casos graves</li>
                <li><strong>Imunossupressão:</strong> Função leucocitária comprometida</li>
            </>
        )},
        
        { type: 'warning', title: '💉 TRATAMENTO DA HIPOFOSFATEMIA', content: (
            <>
                <strong>Via Oral (preferida):</strong>
                <br/>• <strong>Fosfato monossódico ou dissódico</strong>
                <br/>• <strong>Fosfato monopotássico</strong> se hipocalemia concomitante
                <br/>• Dose: 0.03-0.12 mmol/kg/dia dividida
                <br/><br/>
                <strong>Via IV (casos graves):</strong>
                <br/>• <strong>K-Phos® (fosfato de potássio)</strong>
                <br/>• Contém 3 mmol P + 4.4 mEq K por mL
                <br/>• <strong>Taxa:</strong> 0.01-0.12 mmol/kg/h conforme gravidade
                <br/>• <strong>INCOMPATÍVEL com Ringer Lactato</strong> (contém cálcio)
                <br/>• Usar NaCl 0.9% ou dextrose 5%
            </>
        )},
        
        { type: 'subheader', content: 'Taxas de Infusão IV por Gravidade:' },
        { type: 'table', content: (
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="border border-gray-600 p-2">Gravidade</th>
                            <th className="border border-gray-600 p-2">P sérico (mg/dL)</th>
                            <th className="border border-gray-600 p-2">Taxa (mmol/kg/h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="border border-gray-600 p-2">Leve</td><td className="border border-gray-600 p-2">2.0-2.5</td><td className="border border-gray-600 p-2">0.01-0.02</td></tr>
                        <tr><td className="border border-gray-600 p-2">Moderada</td><td className="border border-gray-600 p-2">1.5-2.0</td><td className="border border-gray-600 p-2">0.03-0.06</td></tr>
                        <tr><td className="border border-gray-600 p-2">Severa</td><td className="border border-gray-600 p-2">{"<"} 1.5</td><td className="border border-gray-600 p-2">0.06-0.12</td></tr>
                    </tbody>
                </table>
            </div>
        )},
        
        { type: 'subheader', content: '📈 HIPERFOSFATEMIA - Quando está alto' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Insuficiência renal crônica:</strong> Causa mais comum em animais</li>
                <li><strong>Hemoconcentração:</strong> Desidratação</li>
                <li><strong>Hipervitaminose D:</strong> Intoxicação, rodenticidas</li>
                <li><strong>Lise celular:</strong> Quimioterapia, rabdomiólise</li>
                <li><strong>Acidose metabólica:</strong> Saída de P das células</li>
            </>
        )},
        
        { type: 'subheader', content: 'Consequências:' },
        { type: 'list', content: (
            <>
                <li><strong>Hipocalcemia:</strong> Precipitação de fosfato de cálcio</li>
                <li><strong>Tetania:</strong> Por hipocalcemia secundária</li>
                <li><strong>Mineralização tecidual:</strong> Se Ca × P {">"} 70</li>
                <li><strong>Progressão da doença renal</strong></li>
            </>
        )},
        
        { type: 'warning', title: '💧 TRATAMENTO DA HIPERFOSFATEMIA', content: (
            <>
                <strong>1. Tratar causa primária:</strong>
                <br/>• Fluidoterapia para desidratação
                <br/>• Controle da doença renal
                <br/><br/>
                <strong>2. Quelantes de fósforo:</strong>
                <br/>• <strong>Hidróxido de alumínio:</strong> 30-100 mg/kg/dia com comida
                <br/>• <strong>Sevelamer:</strong> Quelante não-cálcico
                <br/><br/>
                <strong>3. Dieta renal:</strong>
                <br/>• Restrição de fósforo
                <br/>• Suplementação de cálcio se necessário
                <br/><br/>
                <strong>4. Em casos agudos com hipocalcemia:</strong>
                <br/>• Gluconato de cálcio IV
                <br/>• Correção da acidose
            </>
        )},
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Filhotes têm P naturalmente mais alto</li>
                <li>K-Phos é incompatível com fluidos contendo cálcio</li>
                <li>Monitorar Ca × P (deve ser {"<"} 70)</li>
                <li>Síndrome de realimentação é emergência</li>
                <li>Hiperfosfatemia crônica acelera doença renal</li>
            </>
        )}
    ]
};


const CALCIUM_DATA: ElectrolyteData = {
    id: 'calcio',
    name: "Cálcio (Ca²⁺)",
    normalValues: {
        dog: "8.5–11.5 mg/dL (total); 1.1–1.4 mmol/L (ionizado)",
        cat: "8.0–11.0 mg/dL (total); 1.1–1.4 mmol/L (ionizado)"
    },
    content: [
        { type: 'header', content: '🏛️ Cálcio (Ca²⁺): Guia Prático' },
        
        { type: 'warning', title: '⚠️ IMPORTANTE', content: 'Sempre que possível, meça o CÁLCIO IONIZADO. O cálcio total pode ser enganoso se a albumina estiver baixa.' },
        
        { type: 'subheader', content: '📉 HIPOCALCEMIA - Quando está baixo' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Eclampsia:</strong> Cadelas pequenas com muitos filhotes, 2-4 semanas após o parto</li>
                <li><strong>Hipoparatireoidismo:</strong> Após cirurgia de tireoide ou doença autoimune</li>
                <li><strong>Doença renal crônica:</strong> Rim não ativa a vitamina D</li>
                <li><strong>Pancreatite aguda:</strong> Cálcio é "sequestrado" na gordura inflamada</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li>Tremores, inquietação, respiração ofegante</li>
                <li><strong>Tetania:</strong> Rigidez muscular, espasmos</li>
                <li><strong>Convulsões</strong> (emergência!)</li>
                <li>Hipertermia pela atividade muscular</li>
            </>
        )},
        
        { type: 'warning', title: '🚨 TRATAMENTO DE EMERGÊNCIA', content: (
            <>
                <strong>Gluconato de Cálcio 10%</strong>
                <br/>• <strong>Dose:</strong> 0.5-1.5 mL/kg IV MUITO LENTAMENTE (10-20 min)
                <br/>• <strong>MONITORAR ECG:</strong> Se bradicardia → PARE a infusão
                <br/>• <strong>NUNCA SC:</strong> Causa necrose tecidual
                <br/>• <strong>Depois:</strong> CRI com 60-90 mg/kg em fluidos por 6-8h
            </>
        )},
        
        { type: 'subheader', content: 'Tratamento de Longo Prazo:' },
        { type: 'list', content: (
            <>
                <li><strong>Carbonato de Cálcio:</strong> 100-200 mg/kg/dia VO</li>
                <li><strong>Calcitriol (Vitamina D ativa):</strong> 2.5-5 ng/kg/dia VO</li>
                <li><strong>Eclampsia:</strong> Afastar filhotes por 24-48h</li>
            </>
        )},
        
        { type: 'subheader', content: '📈 HIPERCALCEMIA - Quando está alto' },
        
        { type: 'subheader', content: 'Principais Situações:' },
        { type: 'list', content: (
            <>
                <li><strong>Câncer:</strong> Linfoma, adenocarcinoma de saco anal (causa mais comum!)</li>
                <li><strong>Doença de Addison:</strong> Em 30% dos casos</li>
                <li><strong>Intoxicação por vitamina D:</strong> Rodenticidas, plantas</li>
                <li><strong>Hiperparatireoidismo:</strong> Tumor na paratireoide</li>
            </>
        )},
        
        { type: 'subheader', content: 'Sinais Clínicos:' },
        { type: 'list', content: (
            <>
                <li><strong>PU/PD:</strong> Bebe e urina muito (sinal mais comum)</li>
                <li>Letargia, fraqueza, anorexia</li>
                <li>Vômito, constipação</li>
                <li><strong>Cuidado:</strong> Se Ca×P {">"} 70 → risco de mineralização!</li>
            </>
        )},
        
        { type: 'warning', title: '💧 TRATAMENTO DA HIPERCALCEMIA', content: (
            <>
                <strong>1. Fluidoterapia agressiva:</strong>
                <br/>• <strong>NaCl 0,9%</strong> a 2-3x taxa de manutenção
                <br/>• O sódio compete com cálcio no rim
                <br/><br/>
                <strong>2. Furosemida:</strong> 1-4 mg/kg (APÓS reidratação)
                <br/><br/>
                <strong>3. Corticoides:</strong> Para linfoma, Addison, intoxicação vit D
                <br/><br/>
                <strong>4. Tratar a causa:</strong> Quimio, cirurgia, etc.
            </>
        )},
        
        { type: 'subheader', content: '🧮 Fórmula de Correção:' },
        { type: 'formula', content: 'Cálcio Corrigido = Cálcio Total - Albumina + 3.5' },
        
        { type: 'subheader', content: '⚠️ Lembretes Importantes:' },
        { type: 'list', content: (
            <>
                <li>Sempre corrigir cálcio total pela albumina</li>
                <li>Cálcio ionizado é mais confiável</li>
                <li>Monitorar ECG durante infusão de cálcio</li>
                <li>Produto Ca×P deve ser {"<"} 70</li>
                <li>Hipercalcemia persistente = investigar câncer</li>
            </>
        )}
    ]
};

export const ELECTROLYTE_LIBRARY: ElectrolyteData[] = [
    SODIUM_DATA,
    POTASSIUM_DATA,
    CHLORIDE_DATA,
    BICARBONATE_DATA,
    GLUCOSE_DATA,
    MAGNESIUM_DATA,
    PHOSPHORUS_DATA,
    CALCIUM_DATA
];

// Dados das doenças e protocolos terapêuticos
export const DISEASE_PROTOCOLS = [
    {
        id: 'addison',
        name: 'Hipoadrenocorticismo (Doença de Addison)',
        electrolytes: ['Hiponatremia', 'Hipercalemia', 'Hipocloremia', 'Acidose'],
        content: [
            { type: 'header', content: '🏥 Doença de Addison - Protocolo Completo' },
            
            { type: 'subheader', content: 'Fisiopatologia:' },
            { type: 'paragraph', content: 'Deficiência de mineralocorticoides (aldosterona) e glicocorticoides (cortisol). A falta de aldosterona causa perda de sódio e retenção de potássio.' },
            
            { type: 'subheader', content: 'Achados Laboratoriais Típicos:' },
            { type: 'list', content: (
                <>
                    <li><strong>Na⁺/K⁺ {"<"} 27:</strong> Altamente sugestivo (normal {">"} 30)</li>
                    <li><strong>Hiponatremia:</strong> Geralmente 120-135 mEq/L</li>
                    <li><strong>Hipercalemia:</strong> 5.5-8.0 mEq/L</li>
                    <li><strong>Hipocloremia e acidose metabólica leve</strong></li>
                    <li><strong>Azotemia pré-renal:</strong> Por desidratação</li>
                    <li><strong>Hipercalcemia:</strong> Em 30% dos casos</li>
                </>
            )},
            
            { type: 'warning', title: '🚨 TRATAMENTO DE EMERGÊNCIA', content: (
                <>
                    <strong>1. Fluidoterapia agressiva:</strong>
                    <br/>• <strong>NaCl 0.9%</strong> a 2-3x taxa de manutenção
                    <br/>• Corrige hiponatremia e hipovolemia
                    <br/>• Evitar fluidos com potássio inicialmente
                    <br/><br/>
                    <strong>2. Tratar hipercalemia se {">"} 6.5 mEq/L:</strong>
                    <br/>• Gluconato de cálcio 10%: 0.5-1 mL/kg IV lento
                    <br/>• Dextrose + insulina se necessário
                    <br/>• ECG contínuo
                    <br/><br/>
                    <strong>3. Corticoterapia:</strong>
                    <br/>• <strong>Hidrocortisona:</strong> 5-10 mg/kg IV (preferida)
                    <br/>• <strong>Prednisolona:</strong> 1-2 mg/kg IV se hidrocortisona indisponível
                    <br/>• <strong>Dexametasona:</strong> Evitar - interfere com teste ACTH
                </>
            )},
            
            { type: 'subheader', content: 'Tratamento de Longo Prazo:' },
            { type: 'list', content: (
                <>
                    <li><strong>Fludrocortisona:</strong> 0.01-0.02 mg/kg/dia VO</li>
                    <li><strong>Prednisolona:</strong> 0.2-0.5 mg/kg/dia VO</li>
                    <li><strong>Monitorar:</strong> Eletrólitos semanalmente no início</li>
                    <li><strong>Meta:</strong> Na⁺/K⁺ entre 30-35</li>
                </>
            )}
        ]
    },
    {
        id: 'dka',
        name: 'Cetoacidose Diabética (CAD)',
        electrolytes: ['Hipernatremia aparente', 'Hipocalemia', 'Hipofosfatemia', 'Acidose'],
        content: [
            { type: 'header', content: '🍯 Cetoacidose Diabética - Protocolo Completo' },
            
            { type: 'subheader', content: 'Fisiopatologia:' },
            { type: 'paragraph', content: 'Deficiência absoluta ou relativa de insulina causa hiperglicemia, cetogênese e acidose metabólica. Diurese osmótica leva à desidratação e perdas eletrolíticas.' },
            
            { type: 'subheader', content: 'Achados Laboratoriais:' },
            { type: 'list', content: (
                <>
                    <li><strong>Hiperglicemia:</strong> Geralmente {">"} 250 mg/dL</li>
                    <li><strong>Cetonemia/cetonúria:</strong> Positiva</li>
                    <li><strong>Acidose metabólica:</strong> pH {"<"} 7.3, HCO₃⁻ {"<"} 15</li>
                    <li><strong>Pseudohipernatremia:</strong> Corrigir pela glicose</li>
                    <li><strong>Hipocalemia total:</strong> Mesmo com K⁺ sérico normal</li>
                    <li><strong>Hipofosfatemia:</strong> Desenvolve com insulinoterapia</li>
                </>
            )},
            
            { type: 'warning', title: '🚨 PROTOCOLO DE TRATAMENTO', content: (
                <>
                    <strong>FASE 1 - Estabilização (0-6h):</strong>
                    <br/>• <strong>Fluidoterapia:</strong> NaCl 0.9% ou Ringer Lactato
                    <br/>• Taxa: 1.5-2x manutenção (sem insulina ainda)
                    <br/>• Corrigir desidratação primeiro
                    <br/><br/>
                    <strong>FASE 2 - Insulinoterapia (após 2-4h):</strong>
                    <br/>• <strong>Insulina regular:</strong> 0.1 U/kg/h CRI
                    <br/>• <strong>Meta:</strong> Reduzir glicose 50-100 mg/dL/h
                    <br/>• <strong>Quando glicose ≤ 250:</strong> Adicionar dextrose 2.5-5%
                    <br/><br/>
                    <strong>FASE 3 - Reposição eletrolítica:</strong>
                    <br/>• <strong>KCl:</strong> 20-40 mEq/L (insulina causa hipocalemia)
                    <br/>• <strong>K-Phos:</strong> Se hipofosfatemia {"<"} 2.0 mg/dL
                    <br/>• <strong>MgSO₄:</strong> Se hipomagnesemia
                </>
            )},
            
            { type: 'subheader', content: 'Monitoramento:' },
            { type: 'list', content: (
                <>
                    <li><strong>Glicemia:</strong> A cada 1-2h inicialmente</li>
                    <li><strong>Eletrólitos:</strong> A cada 4-6h</li>
                    <li><strong>Gasometria:</strong> A cada 6-8h</li>
                    <li><strong>Cetonas:</strong> Devem negativar em 12-24h</li>
                </>
            )}
        ]
    },
    {
        id: 'ckd',
        name: 'Doença Renal Crônica',
        electrolytes: ['Hiperfosfatemia', 'Hipocalcemia', 'Acidose metabólica', 'Hiper/hipocalemia'],
        content: [
            { type: 'header', content: '🔬 Doença Renal Crônica - Manejo Eletrolítico' },
            
            { type: 'subheader', content: 'Distúrbios Eletrolíticos Típicos:' },
            { type: 'list', content: (
                <>
                    <li><strong>Hiperfosfatemia:</strong> Rim não excreta P adequadamente</li>
                    <li><strong>Hipocalcemia:</strong> Secundária ao ↑P e ↓calcitriol</li>
                    <li><strong>Acidose metabólica:</strong> Perda de HCO₃⁻ renal</li>
                    <li><strong>Hipocalemia:</strong> Especialmente em gatos (poliúria)</li>
                    <li><strong>Hipercalemia:</strong> Em estágios avançados (oligúria)</li>
                </>
            )},
            
            { type: 'warning', title: '💊 PROTOCOLO DE TRATAMENTO', content: (
                <>
                    <strong>1. Controle do Fósforo:</strong>
                    <br/>• <strong>Dieta renal:</strong> Restrição de P
                    <br/>• <strong>Quelantes:</strong> Hidróxido de alumínio 30-100 mg/kg/dia
                    <br/>• <strong>Meta:</strong> P {"<"} 4.5 mg/dL (cães), {"<"} 5.0 (gatos)
                    <br/><br/>
                    <strong>2. Correção da Acidose:</strong>
                    <br/>• <strong>Bicarbonato de sódio:</strong> 8-12 mg/kg/dia VO
                    <br/>• <strong>Meta:</strong> HCO₃⁻ 18-24 mEq/L
                    <br/><br/>
                    <strong>3. Manejo do Potássio:</strong>
                    <br/>• <strong>Hipocalemia:</strong> Gluconato de K⁺ 2-6 mEq/dia VO
                    <br/>• <strong>Hipercalemia:</strong> Dieta renal, quelantes de K⁺
                </>
            )}
        ]
    },
    {
        id: 'refeeding',
        name: 'Síndrome de Realimentação',
        electrolytes: ['Hipofosfatemia', 'Hipocalemia', 'Hipomagnesemia', 'Hipoglicemia'],
        content: [
            { type: 'header', content: '🍽️ Síndrome de Realimentação - Protocolo' },
            
            { type: 'subheader', content: 'Fisiopatologia:' },
            { type: 'paragraph', content: 'Reintrodução rápida de carboidratos após jejum prolongado causa liberação de insulina, que desloca P, K⁺ e Mg²⁺ para dentro das células, causando depleção sérica grave.' },
            
            { type: 'subheader', content: 'Pacientes de Risco:' },
            { type: 'list', content: (
                <>
                    <li>Anorexia {">"} 5-7 dias</li>
                    <li>Desnutrição severa</li>
                    <li>Animais resgatados</li>
                    <li>Pós-cirúrgico com jejum prolongado</li>
                </>
            )},
            
            { type: 'warning', title: '🚨 PREVENÇÃO E TRATAMENTO', content: (
                <>
                    <strong>1. Reintrodução gradual:</strong>
                    <br/>• Começar com 25-50% das necessidades calóricas
                    <br/>• Aumentar gradualmente em 3-5 dias
                    <br/><br/>
                    <strong>2. Suplementação profilática:</strong>
                    <br/>• <strong>K-Phos:</strong> Para P e K⁺
                    <br/>• <strong>MgSO₄:</strong> 0.1-0.2 mEq/kg/h
                    <br/>• <strong>Tiamina:</strong> 25-50 mg IM/dia
                    <br/><br/>
                    <strong>3. Monitoramento intensivo:</strong>
                    <br/>• Eletrólitos a cada 6-12h nos primeiros 3 dias
                    <br/>• ECG se alterações eletrolíticas
                </>
            )}
        ]
    }
];

// Sistema de compatibilidade de fluidos
export const FLUID_COMPATIBILITY = [
    {
        id: 'kcl',
        name: 'Cloreto de Potássio (KCl)',
        compatible: ['NaCl 0.9%', 'Ringer Lactato', 'Plasmalyte', 'Dextrose 5%', 'Dextrose 2.5%'],
        incompatible: [],
        warnings: [
            'NUNCA administrar sem diluição adequada',
            'Taxa máxima: 0.5 mEq/kg/h',
            'Misturar bem a bolsa após adição',
            'Monitorar ECG se hipercalemia prévia'
        ]
    },
    {
        id: 'k_phos',
        name: 'Fosfato de Potássio (K-Phos)',
        compatible: ['NaCl 0.9%', 'Dextrose 5%', 'Dextrose 2.5%'],
        incompatible: ['Ringer Lactato', 'Plasmalyte'],
        warnings: [
            'INCOMPATÍVEL com fluidos contendo cálcio',
            'Precipitação com Ringer Lactato',
            'Taxa máxima: 0.12 mmol/kg/h',
            'Contém 4.4 mEq K+ por mL'
        ]
    },
    {
        id: 'calcium_gluconate',
        name: 'Gluconato de Cálcio 10%',
        compatible: ['NaCl 0.9%', 'Dextrose 5%'],
        incompatible: ['Bicarbonato de Sódio', 'Fosfatos'],
        warnings: [
            'NUNCA administrar SC (necrose)',
            'Infundir muito lentamente (10-20 min)',
            'Monitorar ECG durante infusão',
            'Incompatível com bicarbonato'
        ]
    },
    {
        id: 'sodium_bicarbonate',
        name: 'Bicarbonato de Sódio 8.4%',
        compatible: ['NaCl 0.9%', 'Dextrose 5%'],
        incompatible: ['Gluconato de Cálcio', 'Ringer Lactato'],
        warnings: [
            'Sempre diluir antes da infusão',
            'Incompatível com cálcio',
            'Risco de hipernatremia',
            'Administrar ¼ a ⅓ do déficit'
        ]
    },
    {
        id: 'magnesium_sulfate',
        name: 'Sulfato de Magnésio',
        compatible: ['NaCl 0.9%', 'Dextrose 5%', 'Ringer Lactato'],
        incompatible: [],
        warnings: [
            'Monitorar reflexos patelares',
            'Cuidado em insuficiência renal',
            'Taxa: 0.1-0.3 mEq/kg/h',
            'Infundir lentamente (6-8h)'
        ]
    }
];

export const FORMULARY_LIBRARY: FormularyItem[] = [
    {
        id: 'nacl09',
        name: 'Solução Fisiológica (NaCl 0.9%)',
        content: [
            { type: 'header', content: 'Solução Fisiológica (NaCl 0.9%)' },
            { type: 'paragraph', content: 'É uma solução cristaloide isotônica (ou ligeiramente hipertônica para cães e gatos), sendo a base para muitas terapias de reposição.'},
            { type: 'subheader', content: 'Composição'},
            { type: 'list', content: <>
                <li>Sódio (Na⁺): 154 mEq/L</li>
                <li>Cloreto (Cl⁻): 154 mEq/L</li>
                <li>Osmolaridade: ~308 mOsm/L</li>
            </>},
            { type: 'subheader', content: 'Indicações'},
            { type: 'list', content: <>
                <li><strong>Cães e Gatos:</strong> Expansão de volume em choque hipovolêmico, tratamento de desidratação, correção de hiponatremia e alcalose metabólica hipoclorêmica (ex: vômitos).</li>
                <li><strong>Veículo:</strong> Usado como diluente para diversos medicamentos intravenosos.</li>
                <li><strong>Doenças Específicas:</strong> Fluido de escolha na <Highlight color="orange">doença de Addison</Highlight> e <Highlight color="red">cetoacidose diabética</Highlight> (na fase inicial).</li>
            </>},
            { type: 'warning', title: 'Precauções', content: 'O uso prolongado ou em grandes volumes pode levar a acidose metabólica hiperclorêmica dilucional. Usar com extrema cautela em pacientes com insuficiência cardíaca congestiva, doença renal oligúrica ou outras condições com retenção de sódio.'}
        ]
    },
    {
        id: 'gluconato_calcio10',
        name: 'Gluconato de Cálcio 10%',
        content: [
            { type: 'header', content: 'Gluconato de Cálcio 10%' },
            { type: 'paragraph', content: 'Sais de cálcio para estabilização de membrana em hipercalemia e tratamento de hipocalcemia sintomática.'},
            { type: 'subheader', content: 'Indicações'},
            { type: 'list', content: <>
                <li>Hipocalcemia sintomática (tetania, convulsões)</li>
                <li>Hipercalemia com alterações de ECG (estabilização de membrana)</li>
            </>},
            { type: 'subheader', content: 'Doses e Administração'},
            { type: 'list', content: <>
                <li><strong>Dose:</strong> 0,5–1,5 mL/kg IV lento (10–20 min) com ECG contínuo</li>
                <li><strong>NÃO</strong> administrar SC (necrose tecidual)</li>
            </>},
            { type: 'warning', title: 'Precauções', content: <>
                Incompatível com bicarbonato e fosfatos. Monitorar bradicardia; parar infusão se ocorrer.
                <br/>
                <em>BSAVA – Emergências; Nelson & Couto.</em>
            </>}
        ]
    },
    {
        id: 'kphos',
        name: 'Fosfato de Potássio (K-Phos)',
        content: [
            { type: 'header', content: 'Fosfato de Potássio (K-Phos)' },
            { type: 'paragraph', content: 'Fonte IV de fosfato e potássio para hipofosfatemia, especialmente em DKA e síndrome de realimentação.'},
            { type: 'subheader', content: 'Concentração'},
            { type: 'list', content: <>
                <li>3 mmol de P + 4,4 mEq de K por mL</li>
            </>},
            { type: 'subheader', content: 'Taxas'},
            { type: 'list', content: <>
                <li>0,01–0,03 mmol/kg/h (até 0,12 em casos graves) com monitorização</li>
            </>},
            { type: 'warning', title: 'Compatibilidade', content: <>
                <strong>INCOMPATÍVEL</strong> com fluidos contendo cálcio (RL/Plasmalyte). Usar NaCl 0,9% ou D5W.
                <br/>
                <em>DiBartola – Fosfato; Nelson & Couto.</em>
            </>}
        ]
    },
    {
        id: 'mgso4',
        name: 'Sulfato de Magnésio (MgSO₄)',
        content: [
            { type: 'header', content: 'Sulfato de Magnésio (MgSO₄)' },
            { type: 'paragraph', content: 'Reposição de magnésio em hipomagnesemia, frequentemente associada à hipocalemia resistente.'},
            { type: 'subheader', content: 'Taxas'},
            { type: 'list', content: <>
                <li>0,1–0,3 mEq/kg/h (1,6–2,5 mg/kg/h) IV</li>
                <li>Infundir em 6–8 horas; monitorar reflexos patelares e função renal</li>
            </>},
            { type: 'warning', title: 'Cuidados', content: <>
                Cuidado em insuficiência renal; risco de depressão SNC/respiratória em excesso.
                <br/>
                <em>Nelson & Couto; BSAVA.</em>
            </>}
        ]
    },
    {
        id: 'kcl191',
        name: 'Cloreto de Potássio (KCl 19.1%)',
        content: [
            { type: 'header', content: 'Cloreto de Potássio (KCl 19.1%)' },
            { type: 'paragraph', content: 'Solução concentrada de potássio para adição em fluidos IV para correção de hipocalemia.'},
            { type: 'subheader', content: 'Concentração'},
            { type: 'list', content: <>
                <li><strong>KCl 19.1%</strong>: Contém 191 mg de KCl por mL.</li>
                <li>Isso equivale a <Highlight color="yellow">2.56 mEq de K⁺ por mL</Highlight>. <InfoIcon content="Cálculo: (191 mg/mL / 74.55 mg/mmol) = 2.56 mmol/mL = 2.56 mEq/mL." /></li>
            </>},
            { type: 'subheader', content: 'Como Usar'},
            { type: 'paragraph', content: 'O volume necessário de KCl é calculado com base na concentração de potássio desejada no fluido (veja a tabela de reposição na calculadora) e no volume da bolsa de fluido.'},
            {type: 'formula', content: 'Volume de KCl (mL) = (mEq K⁺ desejado / 2.56 mEq/mL)'},
            { type: 'warning', title: 'ADMINISTRAÇÃO SEGURA', content: <>
                <p><strong>NUNCA</strong> administrar em bolus ou sem diluição adequada. O KCl é cardiotóxico em altas concentrações.</p>
                <p><strong>SEMPRE</strong> misture a bolsa de fluido vigorosamente após adicionar o KCl para garantir uma diluição homogênea.</p>
                <p>A taxa de infusão <strong>NÃO DEVE EXCEDER 0.5 mEq/kg/hora</strong>.</p>
            </>}
        ]
    },
    {
        id: 'ringer_lactato',
        name: 'Ringer Lactato',
        content: [
            { type: 'header', content: 'Ringer Lactato (Solução de Hartmann)' },
            { type: 'paragraph', content: 'Cristaloide balanceado, isotônico, que mimetiza melhor a composição eletrolítica do plasma.'},
            { type: 'subheader', content: 'Composição'},
            { type: 'list', content: <>
                <li>Sódio (Na⁺): 130 mEq/L</li>
                <li>Cloreto (Cl⁻): 109 mEq/L</li>
                <li>Potássio (K⁺): 4 mEq/L</li>
                <li>Cálcio (Ca²⁺): 3 mEq/L</li>
                <li>Lactato: 28 mEq/L (convertido em bicarbonato)</li>
                <li>Osmolaridade: ~273 mOsm/L</li>
            </>},
            { type: 'subheader', content: 'Vantagens'},
            { type: 'list', content: <>
                <li><strong>Balanceado:</strong> Menos risco de acidose hiperclorêmica</li>
                <li><strong>Lactato:</strong> Convertido em bicarbonato pelo fígado</li>
                <li><strong>Uso geral:</strong> Adequado para maioria das situações</li>
            </>},
            { type: 'warning', title: 'Precauções', content: 'Evitar em hepatopatia severa (metabolismo do lactato comprometido) e hipercalemia (contém K⁺). Não misturar com fosfatos (precipitação com cálcio).'}
        ]
    },
    {
        id: 'plasmalyte',
        name: 'Plasmalyte/Normosol',
        content: [
            { type: 'header', content: 'Plasmalyte (Normosol-R)' },
            { type: 'paragraph', content: 'Cristaloide balanceado com composição mais próxima ao plasma que o Ringer Lactato.'},
            { type: 'subheader', content: 'Composição'},
            { type: 'list', content: <>
                <li>Sódio (Na⁺): 140 mEq/L</li>
                <li>Cloreto (Cl⁻): 98 mEq/L</li>
                <li>Potássio (K⁺): 5 mEq/L</li>
                <li>Magnésio (Mg²⁺): 3 mEq/L</li>
                <li>Acetato: 27 mEq/L</li>
                <li>Gluconato: 23 mEq/L</li>
            </>},
            { type: 'subheader', content: 'Indicações Especiais'},
            { type: 'list', content: <>
                <li><strong>Acidose hiperclorêmica:</strong> Menor teor de Cl⁻</li>
                <li><strong>Hepatopatia:</strong> Não depende do fígado para metabolismo</li>
                <li><strong>Grandes volumes:</strong> Menor risco de distúrbios ácido-base</li>
            </>},
            { type: 'warning', title: 'Cuidados', content: 'Contém K⁺ e Mg²⁺ - evitar em hipercalemia e hipermagnesemia. Mais caro que outras soluções.'}
        ]
    },
    {
        id: 'dextrose5',
        name: 'Dextrose 5% em Água',
        content: [
            { type: 'header', content: 'Dextrose 5% em Água (D5W)' },
            { type: 'paragraph', content: 'Solução hipotônica que fornece água livre e glicose. Osmolaridade inicial de ~278 mOsm/L, mas torna-se hipotônica após metabolização da glicose.'},
            { type: 'subheader', content: 'Composição'},
            { type: 'list', content: <>
                <li>Dextrose: 50 g/L (5%)</li>
                <li>Calorias: ~200 kcal/L</li>
                <li>Sem eletrólitos</li>
            </>},
            { type: 'subheader', content: 'Indicações'},
            { type: 'list', content: <>
                <li><strong>Hipernatremia:</strong> Fornece água livre</li>
                <li><strong>Hipoglicemia:</strong> Manutenção da glicemia</li>
                <li><strong>Veículo:</strong> Para medicamentos incompatíveis com eletrólitos</li>
                <li><strong>Nutrição:</strong> Suporte calórico mínimo</li>
            </>},
            { type: 'warning', title: 'Precauções', content: 'NUNCA usar como único fluido de reposição. Pode causar hiponatremia e edema cerebral. Monitorar glicemia - pode causar hiperglicemia em diabéticos.'}
        ]
    },
    {
        id: 'bicarbonato',
        name: 'Bicarbonato de Sódio 8.4%',
        content: [
            { type: 'header', content: 'Bicarbonato de Sódio 8.4%' },
            { type: 'paragraph', content: 'Solução alcalinizante para correção de acidose metabólica grave.'},
            { type: 'subheader', content: 'Concentração'},
            { type: 'list', content: <>
                <li><strong>Bicarbonato:</strong> 1 mEq/mL (84 mg/mL)</li>
                <li><strong>Sódio:</strong> 1 mEq/mL</li>
                <li><strong>Osmolaridade:</strong> ~2000 mOsm/L (hipertônica)</li>
            </>},
            { type: 'subheader', content: 'Indicações'},
            { type: 'list', content: <>
                <li><strong>Acidose severa:</strong> pH {"<"} 7.1 ou HCO₃⁻ {"<"} 12 mEq/L</li>
                <li><strong>Hipercalemia:</strong> Desloca K⁺ para dentro das células</li>
                <li><strong>Intoxicações:</strong> Antidepressivos tricíclicos, aspirina</li>
            </>},
            { type: 'warning', title: '⚠️ ADMINISTRAÇÃO CUIDADOSA', content: (
                <>
                    <strong>Fórmula do déficit:</strong>
                    <br/>• Déficit = 0.3 × peso(kg) × (HCO₃⁻ desejado - atual)
                    <br/>• Administrar ¼ a ⅓ do déficit lentamente
                    <br/>• Diluir sempre antes da infusão
                    <br/>• <strong>Riscos:</strong> Hipernatremia, hipocalemia, alcalose
                </>
            )}
        ]
    }
];