import React, { useMemo, useState } from 'react';
import { makeAlbuminPlan, AlbuminSpecies } from '../lib/albumin';
import { InfoIcon } from './Tooltip';

const inputCls = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white";

const AlbuminCalculator: React.FC = () => {
	const [species, setSpecies] = useState<AlbuminSpecies>('dog');
	const [weightKg, setWeightKg] = useState<number>(10);
	const [albNow, setAlbNow] = useState<number>(1.6);
	const [albTarget, setAlbTarget] = useState<number>(2.2);
	const [productPercent, setProductPercent] = useState<5|10|25>(10);
	const [hours, setHours] = useState<number>(8);

	const plan = useMemo(() => makeAlbuminPlan({ species, weightKg, albuminCurrent_gdl: albNow, albuminTarget_gdl: albTarget, productPercent, infusionHours: hours }), [species, weightKg, albNow, albTarget, productPercent, hours]);

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reposição de Albumina (HSA)</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label className="block font-medium mb-1">Espécie</label>
					<select value={species} onChange={(e)=> setSpecies(e.target.value as AlbuminSpecies)} className={inputCls}>
						<option value="dog">Cão</option>
						<option value="cat">Gato</option>
					</select>
				</div>
				<div>
					<label className="block font-medium mb-1">Peso (kg)</label>
					<input type="number" value={weightKg} onChange={(e)=> setWeightKg(Number(e.target.value))} className={inputCls} />
				</div>
				<div>
					<label className="block font-medium mb-1">Albumina atual (g/dL)</label>
					<input type="number" step="0.1" value={albNow} onChange={(e)=> setAlbNow(Number(e.target.value))} className={inputCls} />
				</div>
				<div>
					<label className="block font-medium mb-1">Alvo (g/dL)
						<span className="ml-1 align-middle"><InfoIcon ariaLabel="Como calcular o déficit" content={<div className="text-xs">Déficit (g) = (alvo (g/L) − medido (g/L)) × (peso (kg) × 0,3).<br/>Ex.: cão 20 kg, 15 → 25 g/L = (25−15)×(20×0,3)=60 g.<br/><em>Fontes: BSAVA ECC; DiBartola.</em></div>} /></span>
					</label>
					<input type="number" step="0.1" value={albTarget} onChange={(e)=> setAlbTarget(Number(e.target.value))} className={inputCls} />
				</div>
				<div>
					<label className="block font-medium mb-1">Produto</label>
					<select value={productPercent} onChange={(e)=> setProductPercent(Number(e.target.value) as 5|10|25)} className={inputCls}>
						<option value={5}>HSA 5%</option>
						<option value={10}>HSA 10%</option>
						<option value={25}>HSA 25%</option>
					</select>
				</div>
				<div>
					<label className="block font-medium mb-1">Infusão em (h)</label>
					<input type="number" min={1} step={1} value={hours} onChange={(e)=> setHours(Number(e.target.value))} className={inputCls} />
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<div className="text-xs text-gray-600 dark:text-gray-300">Déficit (g)</div>
					<div className="text-xl font-bold">{plan.deficit_g.toFixed(1)}</div>
				</div>
				<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<div className="text-xs text-gray-600 dark:text-gray-300">Volume total (mL)</div>
					<div className="text-xl font-bold">{plan.totalVolume_ml.toFixed(0)}</div>
				</div>
				<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<div className="text-xs text-gray-600 dark:text-gray-300">Taxa (mL/kg/h)</div>
					<div className={`text-xl font-bold ${plan.mlPerKgPerHour > (species==='dog'?1.7:2)?'text-red-600':'text-emerald-600'}`}>{plan.mlPerKgPerHour.toFixed(2)}</div>
				</div>
				<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<div className="text-xs text-gray-600 dark:text-gray-300">Sugestão (h)</div>
					<div className="text-xl font-bold">{plan.suggestedHours}</div>
				</div>
			</div>

			{plan.dilutionHint && (
				<div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-900 dark:text-blue-100">
					<strong>Diluição sugerida:</strong> {plan.dilutionHint} <em>(Plumb’s)</em>
				</div>
			)}

			{plan.warnings.length > 0 && (
				<div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-yellow-900 dark:text-yellow-100">
					<ul className="list-disc list-inside space-y-1">
						{plan.warnings.map((w,i)=> <li key={i}>{w}</li>)}
					</ul>
				</div>
			)}

			<div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
				Metas: albumina 2–2,5 g/dL; COP 14–20 mmHg. <em>Plumb’s; BSAVA.</em>
			</div>
		</div>
	);
};

export default AlbuminCalculator;


