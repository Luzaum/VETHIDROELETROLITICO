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
        dog: "~145–155 mEq/L",
        cat: "~150–160 mEq/L"
    },
    content: [
        { type: 'header', content: 'Sódio (Na⁺)' },
        { type: 'subheader', content: 'Função e Homeostase' },
        {
            type: 'paragraph',
            content: (
                <>
                    O sódio é o principal cátion do espaço extracelular e exerce papel-chave na manutenção da osmolaridade do plasma, do volume hídrico corporal e do equilíbrio ácido-base. A homeostase é regulada principalmente pelos rins (sistema renina-angiotensina-aldosterona) e pelo eixo sede/hormônio antidiurético (ADH).
                    <InfoIcon content="A bomba Na⁺/K⁺-ATPase mantém alta concentração de Na⁺ fora das células, essencial para a excitação neuromuscular." />
                </>
            ),
        },
        { type: 'subheader', content: 'Distúrbios' },
        {
            type: 'paragraph',
            content: <strong className="text-xl text-blue-600 dark:text-blue-400">Hiponatremia (Sódio Baixo)</strong>
        },
        {
            type: 'paragraph',
            content: (
                <>
                    Ocorre por perda excessiva de sódio ou ganho de água livre. Causas comuns incluem <Highlight color="orange">doença de Addison</Highlight>, insuficiência renal avançada, perdas gastrointestinais (vômitos/diarreia) e diurese osmótica (ex: cetoacidose diabética).
                </>
            )
        },
        {
            type: 'list',
            content: (
                <>
                    <li><strong>Sinais Clínicos:</strong> Letargia, fraqueza, ataxia, convulsões e coma, especialmente se a queda for rápida.</li>
                    <li><strong>Achados Laboratoriais:</strong> Sódio sérico baixo. Em Addison, K⁺ elevado e relação Na:K {"<"} 27:1 é um forte indicativo.</li>
                </>
            )
        },
        {
            type: 'warning',
            title: 'Correção da Hiponatremia',
            content: "A correção deve ser LENTA (não exceder 0.5–0.6 mEq/L por hora ou ~12 mEq/L em 24h) para evitar a síndrome da desmielinização osmótica (mielinólise pontina), uma lesão neurológica grave e irreversível."
        },
        {
            type: 'formula',
            content: "Déficit de Sódio (mEq) = 0.6 * peso(kg) * (Na⁺ desejado – Na⁺ atual)"
        },
        {
            type: 'paragraph',
            content: <strong className="text-xl text-red-600 dark:text-red-400">Hipernatremia (Sódio Alto)</strong>
        },
        {
            type: 'paragraph',
            content: (
                <>
                    Resulta de perda de água livre (desidratação) ou ganho excessivo de sal. Causas incluem privação de água, <Highlight color="blue">diabetes insipidus</Highlight>, perdas gastrointestinais e ingestão de sal. Causa desidratação celular, especialmente no cérebro.
                </>
            )
        },
        {
            type: 'list',
            content: (
                <>
                    <li><strong>Sinais Clínicos:</strong> Sede intensa, mucosas secas, depressão mental, tremores e convulsões.</li>
                    <li><strong>Achados Laboratoriais:</strong> Sódio sérico elevado. Em diabetes insipidus, a urina fica inapropriadamente diluída (hipostenúrica).</li>
                </>
            )
        },
        {
            type: 'warning',
            title: 'Correção da Hipernatremia',
            content: "A correção também deve ser LENTA (não mais que 0.5 mEq/L por hora ou 10-12 mEq/L/dia) para evitar edema cerebral. O objetivo é repor o déficit de água livre."
        },
        {
            type: 'formula',
            content: "Déficit de Água Livre (L) = 0.6 * peso(kg) * [(Na⁺ atual / Na⁺ normal) – 1]"
        }
    ]
};

const POTASSIUM_DATA: ElectrolyteData = {
    id: 'potassio',
    name: "Potássio (K⁺)",
    normalValues: {
        dog: "~4.0–5.0 mEq/L",
        cat: "~4.0–5.5 mEq/L"
    },
    content: [
        { type: 'header', content: 'Potássio (K⁺)' },
        { type: 'subheader', content: 'Função e Homeostase' },
        {
            type: 'paragraph',
            content: "O potássio é o principal cátion intracelular, crítico para o potencial de repouso das membranas de células excitáveis (músculos, neurônios). Pequenas alterações no K⁺ extracelular causam mudanças significativas na excitabilidade cardíaca e neuromuscular. A homeostase é regulada pelos rins (aldosterona) e pela insulina/catecolaminas, que promovem a entrada de K⁺ nas células.",
        },
        { type: 'subheader', content: 'Distúrbios' },
        {
            type: 'paragraph',
            content: <strong className="text-xl text-blue-600 dark:text-blue-400">Hipocalemia (Potássio Baixo)</strong>
        },
        {
            type: 'paragraph',
            content: (
                <>
                    Mais comum em gatos, especialmente com <Highlight color="orange">doença renal crônica (DRC)</Highlight>. Causas incluem perdas renais ou gastrointestinais, redistribuição para o meio intracelular (alcalose, terapia com insulina) e baixa ingestão.
                </>
            )
        },
        {
            type: 'list',
            content: (
                <>
                    <li><strong>Sinais Clínicos:</strong> Fraqueza muscular generalizada, apatia, anorexia. Em gatos, é clássica a <Highlight color="yellow">ventroflexão cervical</Highlight> (incapacidade de levantar a cabeça). Casos graves podem levar à paralisia respiratória.</li>
                    <li><strong>ECG:</strong> Ondas T achatadas, depressão do segmento ST e aparecimento de ondas U.</li>
                </>
            )
        },
        {
            type: 'warning',
            title: 'Taxa de Infusão de Potássio',
            content: "A taxa máxima segura de infusão de potássio IV é de 0.5 mEq/kg/hora. Taxas superiores podem causar arritmias cardíacas fatais."
        },
        {
            type: 'paragraph',
            content: <strong className="text-xl text-red-600 dark:text-red-400">Hipercalemia (Potássio Alto)</strong>
        },
        {
            type: 'paragraph',
            content: "Ocorre quando a excreção renal está comprometida, há liberação maciça de K⁺ do meio intracelular ou aporte excessivo. É uma emergência médica devido aos seus efeitos cardíacos."
        },
        {
            type: 'list',
            content: (
                <>
                    <li><strong>Causas Comuns:</strong> <Highlight color="red">Obstrução uretral</Highlight> (especialmente em gatos machos), insuficiência renal aguda (oligoanúrica), doença de Addison.</li>
                    <li><strong>Sinais Clínicos:</strong> Fraqueza muscular flácida, bradicardia, pulso fraco.</li>
                    <li><strong>ECG (Clássico):</strong> Ondas T apiculadas, ausência de onda P, alargamento do complexo QRS. Pode progredir para fibrilação ventricular e assistolia.</li>
                </>
            )
        },
        {
            type: 'subheader',
            content: "Tratamento de Emergência da Hipercalemia"
        },
        {
            type: 'list',
            content: (
                <>
                   <li><strong>1. Antagonizar Efeitos Cardíacos:</strong> Gluconato de Cálcio 10% IV (0.5-1.5 mL/kg) lento. Protege o miocárdio, mas não baixa o K⁺.</li>
                   <li><strong>2. Mover K⁺ para dentro das células:</strong> Insulina regular (0.25-0.5 UI/kg IV) + Glicose (1-2g por UI de insulina); Bicarbonato de sódio (1-2 mEq/kg IV lento) se houver acidose.</li>
                   <li><strong>3. Remover K⁺ do corpo:</strong> Fluidoterapia sem K⁺, diuréticos (furosemida 2-4 mg/kg IV) se o paciente urina, e tratamento da causa base (ex: desobstrução uretral).</li>
                </>
            )
        }
    ]
};

const CHLORIDE_DATA: ElectrolyteData = {
    id: 'cloro',
    name: "Cloreto (Cl⁻)",
    normalValues: {
        dog: "107–113 mEq/L",
        cat: "117–123 mEq/L"
    },
    content: [
        { type: 'header', content: 'Cloreto (Cl⁻)' },
        { type: 'subheader', content: 'Função e Homeostase' },
        { type: 'paragraph', content: "Principal ânion extracelular, o cloreto acompanha o sódio para manter a neutralidade elétrica e a osmolaridade. É fundamental no equilíbrio ácido-base, atuando em um mecanismo de troca com o bicarbonato (HCO₃⁻) nos rins e eritrócitos." },
        { type: 'paragraph', content: <strong className="text-xl text-blue-600 dark:text-blue-400">Hipocloremia (Cloreto Baixo)</strong> },
        { type: 'paragraph', content: <>Quase sempre associada a <Highlight color="blue">alcalose metabólica</Highlight>. A causa clássica é a perda de ácido gástrico por vômitos (obstrução pilórica), resultando em alcalose metabólica hipoclorêmica. O uso de diuréticos (furosemida) também é uma causa comum.</> },
        { type: 'warning', title: 'Urina Paradoxalmente Ácida', content: 'Em casos de alcalose hipoclorêmica severa, o rim tenta conservar Cl⁻ e acaba excretando H⁺, o que pode levar a uma urina ácida apesar da alcalose sistêmica.' },
        { type: 'subheader', content: 'Tratamento da Hipocloremia' },
        { type: 'paragraph', content: <>O tratamento visa corrigir a causa base e repor o cloreto. A fluidoterapia com <Highlight color="orange">Solução Fisiológica (NaCl 0.9%)</Highlight> é o tratamento de escolha, pois fornece tanto Cl⁻ quanto Na⁺, permitindo que os rins excretem o excesso de bicarbonato e corrijam a alcalose. A reposição de potássio (KCl) é frequentemente necessária.</> },
        { type: 'paragraph', content: <strong className="text-xl text-red-600 dark:text-red-400">Hipercloremia (Cloreto Alto)</strong> },
        { type: 'paragraph', content: <>Frequentemente associada a <Highlight color="red">acidose metabólica com ânion gap normal</Highlight>. Causas incluem diarreia severa (perda de HCO₃⁻), acidose tubular renal e administração excessiva de fluidos com NaCl 0.9%.</> },
        { type: 'subheader', content: 'Tratamento da Hipercloremia' },
        { type: 'paragraph', content: <>Focar na causa subjacente. Utilizar fluidos com menor concentração de cloreto e que contenham um precursor de base, como <Highlight color="yellow">Ringer Lactato ou Plasmalyte</Highlight>. O lactato/acetato é metabolizado em bicarbonato, ajudando a corrigir a acidose. Se a acidose for grave (pH {'<'} 7.1), a administração de bicarbonato de sódio pode ser indicada.</> }
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
        dog: "Total: 9.0–11.5 mg/dL, Ionizado: 1.15–1.38 mmol/L",
        cat: "Total: 8.0–11.5 mg/dL, Ionizado: 1.13–1.38 mmol/L"
    },
    content: [{type: 'header', content: 'Cálcio (Ca²⁺)'}, {type: 'paragraph', content: 'Conteúdo sobre cálcio a ser adicionado.'}]
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