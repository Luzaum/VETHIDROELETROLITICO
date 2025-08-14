import React from 'react';

// Ajuda agrupada por eletrólito/doença (conteúdo pronto para os botões "?")

export const HELP_NA_HYPERNATREMIA_PATHO = (
  <div className="space-y-2">
    <p><strong>Fisiopatologia:</strong> Hipernatremia = excesso <em>relativo</em> de Na⁺ em relação à água. Causas: perda de água pura (DI, hipodipsia/calor), perda de fluido hipotônico (GI/renal/diuréticos) ou ganho de sódio (hipertônicos/NaHCO₃, intoxicação por sal).</p>
    <p><strong>Risco:</strong> Hiperosmolalidade puxa água do SNC → sinais neurológicos. <strong>Correção rápida</strong> pode causar edema cerebral.</p>
    <p className="italic">Fonte: Nelson & Couto – Distúrbios de Na⁺ (cap. de eletrólitos).</p>
  </div>
);

export const HELP_NA_ADDISON_WHY_HYPONATREMIA = (
  <div className="space-y-2">
    <p><strong>Por quê Addison ↓Na⁺?</strong> Deficiência mineralocorticoide → perda renal de Na⁺ e retenção de K⁺; a água é retida de forma desproporcional ao sódio → hipoNa⁺ <em>dilucional</em>.</p>
    <p className="italic">Fontes: BSAVA – Manual de Emergências Adrenais; Nelson & Couto – Seção de Addison.</p>
  </div>
);

export const HELP_K_HYPER_EMERGENCY = (
  <div className="space-y-2">
    <p><strong>Emergência na hipercalemia:</strong> ECG de risco/bradicardia → <strong>Gluconato de cálcio 10% 0,5–1,5 mL/kg IV lento</strong> (10–20 min) para estabilizar membrana (não reduz K⁺).</p>
    <p>Depois: <strong>Insulina regular 0,2–0,5 UI/kg IV</strong> + dextrose (~2 g por UI); considerar NaHCO₃ se acidose refratária.</p>
    <p className="italic">Fontes: BSAVA – Emergências; capítulos de renal/adrenal.</p>
  </div>
);

export const HELP_K_DKA_FALLS = (
  <div className="space-y-2">
    <p><strong>Por que K⁺ cai na DKA?</strong> Déficit corporal total é grande. Reidratação, insulina e correção da acidose empurram K⁺ para o intracelular, revelando hipocalemia mesmo se o valor inicial estava "normal".</p>
    <p className="italic">Fontes: BSAVA – DKA; Nelson & Couto – Cap. DKA.</p>
  </div>
);

export const HELP_P_KIDNEY_BINDERS = (
  <div className="space-y-2">
    <p><strong>Por que quelar fósforo na DRC?</strong> Reduz hiperfosfatemia, atenua hiperparatireoidismo renal e calcificações. Administrar com as refeições para maior eficácia.</p>
    <p><strong>Posologias iniciais:</strong> Hidróxido de alumínio 30–100 mg/kg/dia divididos; ajustar conforme P sérico.</p>
    <p className="italic">Fontes: DiBartola – Distúrbios do Fósforo; Plumb’s.</p>
  </div>
);

export const HELP_MG_AND_K_LINK = (
  <div className="space-y-2">
    <p><strong>Mg e K caminham juntos:</strong> Mg²⁺ é cofator da Na⁺/K⁺-ATPase; deficiência de Mg impede retenção renal de K⁺ → hipocalemia <em>refratária</em>. Corrija Mg para permitir correção do K⁺.</p>
    <p className="italic">Fonte: BSAVA – Distúrbios do Magnésio.</p>
  </div>
);

export const HELP_HCO3_AVOID_BOLUS = (
  <div className="space-y-2">
    <p><strong>Por que evitar bolus de NaHCO₃?</strong> Distribui-se lentamente; pode ↑PCO₂ e causar <em>acidose paradoxal</em> no SNC se ventilação não elimina CO₂. Preferir dividir a dose e reavaliar gasometria.</p>
    <p className="italic">Fonte: DiBartola – Acidose/Acid–Base.</p>
  </div>
);

export const HELP_CL_SID = (
  <div className="space-y-2">
    <p><strong>NaCl 0,9% pode acidificar:</strong> ↑Cl⁻ reduz o <em>strong ion difference</em> (SID) → acidose metabólica hiperclorêmica.</p>
    <p className="italic">Fonte: Revisões de acidose hiperclorêmica (Morais/Constable).</p>
  </div>
);

export const HELP_GLU_SEPSIS = (
  <div className="space-y-2">
    <p><strong>Hipoglicemia na sepse:</strong> ↑ consumo tecidual, ↓ neoglicogênese hepática e hiperinsulinemia relativa; risco de convulsões → tratar prontamente.</p>
    <p className="italic">Fonte: Nelson & Couto – Cap. Hipoglicemia.</p>
  </div>
);


