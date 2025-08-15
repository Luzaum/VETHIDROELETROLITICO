import React from 'react';

export const TIP_K_HYPO_PATHO = (
	<div className="text-left space-y-2">
		<p><strong>Conceito:</strong> K⁺ é majoritariamente intracelular; pequenas quedas séricas refletem depleção corporal importante. Sinais: fraqueza, íleo, arritmias; piora quando K⁺ {'<'} 2,5 mEq/L.</p>
		<p><strong>5 causas comuns:</strong> perdas GI; diuréticos; insulinoterapia/DKA em correção; hiperaldosteronismo (gatos); drogas (p.ex. anfotericina B).</p>
		<p><em>DiBartola – Distúrbios do Potássio; Nelson & Couto – Electrolyte Imbalances.</em></p>
	</div>
);

export const TIP_K_IV_LIMITS = (
	<div className="text-left space-y-2">
		<p><strong>Segurança:</strong> não exceder <strong>0,5 mEq/kg/h</strong> de K⁺ IV. Em hipocalemia grave, considerar até 1,0 mEq/kg/h com <strong>ECG contínuo</strong>.</p>
		<p>Prefira ≤ 60 mEq/L em acesso periférico para evitar flebite. Concentração de KCl 19,1% ≈ 2,56 mEq/mL.</p>
		<p><em>Fontes: BSAVA Manual (Fluids/Acid–Base); DiBartola (Cap. Potássio); Plumb’s (KCl injetável).</em></p>
	</div>
);

export const TIP_K_DILUTION = (
	<div className="text-left space-y-2">
		<p><strong>Diluição passo a passo:</strong> mL de KCl a adicionar = mEq desejados ÷ 2,56 (mEq/mL).</p>
		<p>Ex.: 40 mEq/L em 1000 mL → 15,6 mL de KCl 19,1% (agitar vigorosamente a bolsa).</p>
		<p><em>Fontes: DiBartola (tabelas práticas de K⁺); Plumb’s – KCl.</em></p>
	</div>
);

export const TIP_NA_CORRECTION_RATE = (
	<div className="text-left space-y-2">
		<p><strong>Meta de segurança:</strong> ≤ 0,5 mEq/L/h e ≤ 10–12 mEq/L/24h (hiponatremia crônica). Hipernatremia: mesma limitação de queda.</p>
		<p>Use TBW: cão 0,6×kg; gato 0,5–0,6×kg. Calcule déficit de água livre e fraccione em 24–48 h.</p>
		<p><em>Fontes: BSAVA – Distúrbios do Sódio; DiBartola – Água/Na⁺.</em></p>
	</div>
);

export const TIP_HCO3_FORMULA = (
	<div className="text-left space-y-2">
		<p><strong>Déficit de HCO₃⁻ (mEq):</strong> 0,3–0,4 × peso(kg) × (HCO₃⁻ alvo − medido). Repor 1/3–1/2 e reavaliar (gasometria).</p>
		<p><em>Fontes: DiBartola – Acid–Base; Nelson & Couto – Acidose.</em></p>
	</div>
);

export const TIP_OSM_FORMULA = (
	<div className="text-left">
		<p><strong>Osmolalidade sérica (estimada):</strong> 2×(Na⁺+K⁺) + glicose/18 + BUN/2,8 (mg/dL).</p>
		<p className="mt-2"><em>DiBartola – Osmolaridade.</em></p>
	</div>
);

export const TIP_CA_GLUCONATE_EMERGENCY = (
	<div className="text-left space-y-2">
		<p><strong>Hipercalemia/hipocalcemia sintomática:</strong> Gluconato de cálcio 10% <strong>0,5–1,5 mL/kg IV lento</strong> (10–20 min) com ECG. Não reduz K⁺, estabiliza membrana.</p>
		<p><em>BSAVA – Emergências; Nelson & Couto.</em></p>
	</div>
);


