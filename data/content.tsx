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
        dog: "145–155 mEq/L",
        cat: "150–160 mEq/L"
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
        dog: "3.5–5.5 mEq/L",
        cat: "3.5–5.5 mEq/L"
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
        dog: "105–115 mEq/L",
        cat: "110–125 mEq/L"
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
        dog: "pH: 7.35–7.45, HCO₃⁻: 18–26 mEq/L",
        cat: "pH: 7.35–7.45, HCO₃⁻: 17–22 mEq/L"
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

const GLUCOSE_OSMOLARITY_DATA: ElectrolyteData = {
    id: 'glicose-osmolaridade',
    name: "Glicemia e Osmolaridade",
    normalValues: {
        dog: "Osm: ~290–310 mOsm/kg",
        cat: "Osm: ~300–330 mOsm/kg"
    },
    content: [
        { type: 'header', content: 'Glicemia e Osmolaridade' },
        { type: 'subheader', content: 'Função e Importância' },
        { type: 'paragraph', content: "A osmolaridade plasmática representa a concentração total de solutos e é crucial para o balanço hídrico celular. É determinada principalmente pelo sódio, glicose e ureia. Alterações significativas, especialmente na glicemia, podem levar a distúrbios osmóticos graves." },
        { type: 'subheader', content: 'Hiperglicemia e Síndrome Hiperglicêmica Hiperosmolar (SHH)' },
        { type: 'paragraph', content: <>A hiperglicemia severa (glicose {'>'} 600 mg/dL), como vista na <Highlight color="red">SHH</Highlight> (comum em gatos diabéticos) ou cetoacidose diabética (CDA), aumenta drasticamente a osmolaridade plasmática. Isso 'puxa' água para fora das células, causando desidratação celular grave (especialmente no cérebro) e diluição do sódio (pseudohiponatremia).</> },
        { type: 'formula', content: "Osmolaridade Calculada (mOsm/kg) = 2 * (Na⁺ + K⁺) + Glicose/18 + Ureia/2.8" },
        { type: 'warning', title: 'Correção do Sódio na Hiperglicemia', content: "Para cada 100 mg/dL de aumento na glicose acima do normal, o sódio medido deve ser corrigido para cima em aproximadamente 1.6 a 2.4 mEq/L para estimar o sódio real." },
        { type: 'subheader', content: 'Tratamento de Distúrbios Hiperosmolares' },
        { type: 'paragraph', content: "A correção deve ser gradual para evitar edema cerebral. O tratamento envolve:" },
        { type: 'list', content: <>
            <li><strong>Fluidoterapia Cautelosa:</strong> Inicialmente com NaCl 0.9% para restaurar a perfusão, mesmo que o sódio esteja alto.</li>
            <li><strong>Insulinoterapia:</strong> Em baixas doses e infusão contínua após a reidratação inicial. O objetivo é baixar a glicose lentamente (50-100 mg/dL por hora).</li>
            <li><strong>Reposição de Eletrólitos:</strong> Monitorar e repor potássio, fósforo e magnésio, que tendem a cair rapidamente com a insulinoterapia.</li>
        </> }
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
    GLUCOSE_OSMOLARITY_DATA,
    CALCIUM_DATA
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
    }
];