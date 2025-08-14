export interface FluidInfo {
  key: string;
  label: string; // label amigável para selects
  Na: number; // mEq/L
  Cl: number; // mEq/L
  K?: number; // mEq/L
  Ca?: number; // mEq/L
  Mg?: number; // mEq/L
  buffer?: string; // descrição do tampão
  osmolaridade?: number; // mOsm/L aproximada
}

export const FLUIDS: Record<string, FluidInfo> = {
  'D5W': {
    key: 'D5W',
    label: 'Dextrose 5% (D5W) — sem eletrólitos (≈252–253 mOsm/L)',
    Na: 0,
    Cl: 0,
    osmolaridade: 253,
  },
  'NaCl 0.45%': {
    key: 'NaCl 0.45%',
    label: 'NaCl 0,45% — Na⁺ 77 / Cl⁻ 77 mEq/L (≈154 mOsm/L)',
    Na: 77,
    Cl: 77,
    osmolaridade: 154,
  },
  'Ringer Lactato': {
    key: 'Ringer Lactato',
    label: 'Ringer Lactato — Na⁺ 130 / Cl⁻ 109 / K⁺ 4 / Ca²⁺ 2,7; Lactato 28 mEq/L (≈273 mOsm/L)',
    Na: 130,
    Cl: 109,
    K: 4,
    Ca: 2.7,
    osmolaridade: 273,
    buffer: 'Lactato 28',
  },
  'NaCl 0.9%': {
    key: 'NaCl 0.9%',
    label: 'NaCl 0,9% — Na⁺ 154 / Cl⁻ 154 mEq/L (≈308 mOsm/L)',
    Na: 154,
    Cl: 154,
    osmolaridade: 308,
  },
  'NaCl 3%': {
    key: 'NaCl 3%',
    label: 'NaCl 3% — Na⁺ 513 / Cl⁻ 513 mEq/L (≈1026 mOsm/L)',
    Na: 513,
    Cl: 513,
    osmolaridade: 1026,
  },
  'Plasmalyte': {
    key: 'Plasmalyte',
    label: 'Plasma-Lyte/Normosol-R — Na⁺ 140 / Cl⁻ 98 / K⁺ 5 / Mg²⁺ 3; Acetato 27; Gluconato 23 (≈295 mOsm/L)',
    Na: 140,
    Cl: 98,
    K: 5,
    Mg: 3,
    osmolaridade: 295,
    buffer: 'Acetato 27; Gluconato 23',
  },
};


