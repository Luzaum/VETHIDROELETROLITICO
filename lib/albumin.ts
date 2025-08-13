export type AlbuminSpecies = 'dog' | 'cat';

export interface AlbuminInputs {
	species: AlbuminSpecies;
	weightKg: number;
	albuminCurrent_gdl: number; // g/dL
	albuminTarget_gdl: number;  // g/dL
	productPercent: 5 | 10 | 25; // HSA 5/10/25%
	infusionHours: number; // tempo planejado para infundir a dose total calculada
}

// Déficit (g) = (alvo (g/L) − medido (g/L)) × (peso (kg) × 0,3)
// g/dL → g/L  (×10)
export function calculateAlbuminDeficitGrams(weightKg: number, current_gdl: number, target_gdl: number): number {
	const delta_gdl = Math.max(0, (target_gdl || 0) - (current_gdl || 0));
	return delta_gdl * 10 * (weightKg * 0.3);
}

// Concentração em % → g/mL (10% = 0.1 g/mL)
export function percentToGramsPerMl(percent: 5 | 10 | 25): number {
	return percent / 100;
}

export function calculateVolumeNeededMl(deficit_g: number, productPercent: 5 | 10 | 25): number {
	const gPerMl = percentToGramsPerMl(productPercent);
	if (gPerMl <= 0) return 0;
	return deficit_g / gPerMl;
}

export function dilutionRecipe(fromPercent: 5 | 10 | 25, toPercent: 5 | 10) {
	if (fromPercent === 25 && toPercent === 10) return { toPercent, text: '1 mL de HSA 25% + 1,5 mL de NaCl 0,9% → 10%', diluentPerMl: 1.5 } as const;
	if (fromPercent === 25 && toPercent === 5) return { toPercent, text: '1 mL de HSA 25% + 4 mL de NaCl 0,9% → 5%', diluentPerMl: 4 } as const;
	if (fromPercent === 10 && toPercent === 5) return { toPercent, text: '1 mL de HSA 10% + 1 mL de NaCl 0,9% → 5%', diluentPerMl: 1 } as const;
	return { toPercent, text: 'Diluição não necessária', diluentPerMl: 0 } as const;
}

export interface AlbuminPlan {
	deficit_g: number;
	totalVolume_ml: number;
	mlPerKgPerHour: number;
	suggestedHours: number;
	dilutionHint?: string;
	warnings: string[];
}

export function makeAlbuminPlan(inputs: AlbuminInputs): AlbuminPlan {
	const deficit_g = calculateAlbuminDeficitGrams(inputs.weightKg, inputs.albuminCurrent_gdl, inputs.albuminTarget_gdl);
	const totalVolume_ml = calculateVolumeNeededMl(deficit_g, inputs.productPercent);
	const mlPerKgPerHour = totalVolume_ml / Math.max(1, inputs.infusionHours) / Math.max(0.001, inputs.weightKg);

	const warnings: string[] = [];
	// Guard-rails práticos baseados em Plumb's/BSAVA
	if (inputs.species === 'dog') {
		const maxDogMlKgH = 1.7; // CRI superior em cães
		if (mlPerKgPerHour > maxDogMlKgH) warnings.push(`Taxa calculada ${mlPerKgPerHour.toFixed(2)} mL/kg/h acima de 1,7 mL/kg/h (Plumb’s). Aumente o tempo ou dilua.`);
	} else {
		const catTypical = 2; // ~2 mL/kg/h por 5–10 h
		if (mlPerKgPerHour > catTypical) warnings.push(`Em gatos prefira ~2 mL/kg/h (Plumb’s). Ajuste as horas para segurança.`);
	}

	let suggestedHours = inputs.infusionHours;
	if (inputs.species === 'dog' && mlPerKgPerHour > 1.7) {
		suggestedHours = Math.ceil(totalVolume_ml / (inputs.weightKg * 1.7));
	}
	if (inputs.species === 'cat' && mlPerKgPerHour > 2) {
		suggestedHours = Math.ceil(totalVolume_ml / (inputs.weightKg * 2));
	}

	let dilutionHint: string | undefined;
	if (inputs.productPercent === 25) {
		dilutionHint = inputs.species === 'cat' ? dilutionRecipe(25, 5).text : dilutionRecipe(25, 10).text;
	}

	return { deficit_g, totalVolume_ml, mlPerKgPerHour, suggestedHours, dilutionHint, warnings };
}


