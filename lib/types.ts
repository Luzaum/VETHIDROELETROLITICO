export type Species = 'cao' | 'gato';
export type PhysiologicalState = 'filhote' | 'adulto' | 'idoso' | 'gestante' | 'lactante';
export type Comorbidity = 'cardiopata' | 'hepatopata' | 'renopata' | 'septico' | 'endocrinopata' | 'nenhuma';

export interface ConsensoRefs {
  [key: string]: {
    fonte: string;
    capitulo?: string;
    pagina?: string | number;
    nota?: string;
  };
}

export interface Consensos {
  limites: {
    sodio: {
      max_mEqL_dia_agudo: number;
      max_mEqL_dia_cronico: number;
      max_mEqL_h?: number;
      tbw: { cao: number; gato: number };
      alvo_padrao: number;
      ref: string;
    };
    potassio: {
      max_mEq_kg_h: number;
      conc_max_mEq_L_periferico: number;
      conc_max_mEq_L_central: number;
      tabela_ajuste: Array<{ faixa_min: number; faixa_max: number; kcl_mEq_L: number; max_mL_kg_h: number; ref: string }>; // parametrizável
      ref: string;
    };
    fosforo: {
      min_mmol_kg_h: number;
      max_mmol_kg_h: number;
      ref: string;
    };
    bicarbonato: {
      vd_L_kg: number;
      fracao_admin_inicial: number; // 0-1
      ref: string;
    };
    glicemia: {
      alvo_mg_dL: number;
      ref: string;
    };
    ph: {
      alvo: number;
      ref: string;
    };
  };
  modificadores: {
    estados: {
      [key in PhysiologicalState]?: {
        reduzir_rate_percent?: number;
        reduzir_volume_percent?: number;
        evitar_fluido?: string[];
        preferir_fluido?: string[];
        alerta?: string[];
      }
    };
    comorbidades: {
      [key in Exclude<Comorbidity, 'nenhuma'>]?: {
        reduzir_rate_percent?: number;
        reduzir_volume_percent?: number;
        evitar_fluido?: string[];
        preferir_fluido?: string[];
        alerta?: string[];
      }
    };
  };
  fluidos: {
    [nome: string]: {
      Na_mEq_L?: number;
      Cl_mEq_L?: number;
      K_mEq_L?: number;
      Ca_mEq_L?: number;
      osmolaridade_mOsm_L?: number;
    };
  };
  estoques: {
    kcl191_meq_por_ml: number; // ~2.56
    kpo4_mmolP_ml?: number;
    kpo4_meqK_ml?: number;
    bicarbonato84_meq_ml?: number; // ~1
  };
  refs: ConsensoRefs;
}

export interface PatientContext {
  species: Species;
  pesoKg: number;
  estado: PhysiologicalState;
  comorbidades: Comorbidity[];
  evolucao: 'agudo' | 'cronico';
}

export interface AppliedRulesResult<TLimits> {
  limites: TLimits;
  reduzirRatePercent: number;
  reduzirVolumePercent: number;
  evitarFluido: string[];
  preferirFluido: string[];
  avisos: string[];
  refsUsadas: string[];
}


