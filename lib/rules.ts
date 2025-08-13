import { Consensos, PatientContext, AppliedRulesResult } from './types';

let consensosCache: Consensos | null = null;

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export async function loadConsensos(): Promise<Consensos> {
  if (consensosCache) return consensosCache;
  const res = await fetch('/consensos.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('Falha ao carregar consensos.json');
  const data = await res.json();
  consensosCache = data as Consensos;
  return consensosCache;
}

export function applyModifiers(consensos: Consensos, ctx: PatientContext) {
  let reduzirRatePercent = 0;
  let reduzirVolumePercent = 0;
  const evitarFluido: string[] = [];
  const preferirFluido: string[] = [];
  const avisos: string[] = [];

  const estadoMod = consensos.modificadores.estados[ctx.estado];
  if (estadoMod) {
    reduzirRatePercent += estadoMod.reduzir_rate_percent || 0;
    reduzirVolumePercent += estadoMod.reduzir_volume_percent || 0;
    if (estadoMod.evitar_fluido) evitarFluido.push(...estadoMod.evitar_fluido);
    if (estadoMod.preferir_fluido) preferirFluido.push(...estadoMod.preferir_fluido);
    if (estadoMod.alerta) avisos.push(...estadoMod.alerta);
  }

  for (const c of ctx.comorbidades) {
    if (c === 'nenhuma') continue;
    const mod = consensos.modificadores.comorbidades[c];
    if (!mod) continue;
    reduzirRatePercent += mod.reduzir_rate_percent || 0;
    reduzirVolumePercent += mod.reduzir_volume_percent || 0;
    if (mod.evitar_fluido) evitarFluido.push(...mod.evitar_fluido);
    if (mod.preferir_fluido) preferirFluido.push(...mod.preferir_fluido);
    if (mod.alerta) avisos.push(...mod.alerta);
  }

  return { reduzirRatePercent, reduzirVolumePercent, evitarFluido, preferirFluido, avisos };
}

export function getRefs(consensos: Consensos, keys: string[]): string[] {
  const out: string[] = [];
  for (const k of keys) {
    const r = consensos.refs[k];
    if (!r) continue;
    const cap = r.capitulo ? ` cap. ${r.capitulo}` : '';
    const pg = r.pagina ? ` p. ${r.pagina}` : '';
    out.push(`${r.fonte}${cap}${pg}`.trim());
  }
  return Array.from(new Set(out));
}

export function sodiumLimits(consensos: Consensos, ctx: PatientContext): AppliedRulesResult<{
  maxDia_mEqL: number;
  maxHora_mEqL: number;
  tbwCoef: number;
  alvoPadrao: number;
}> {
  const { reduzirRatePercent, reduzirVolumePercent, evitarFluido, preferirFluido, avisos } = applyModifiers(consensos, ctx);
  const baseMaxDia = ctx.evolucao === 'agudo' ? consensos.limites.sodio.max_mEqL_dia_agudo : consensos.limites.sodio.max_mEqL_dia_cronico;
  const maxDia_mEqL = clamp(baseMaxDia * (1 - reduzirRatePercent / 100), 1, baseMaxDia);
  const baseMaxHora = consensos.limites.sodio.max_mEqL_h || baseMaxDia / 24;
  const maxHora_mEqL = clamp(baseMaxHora * (1 - reduzirRatePercent / 100), 0.05, baseMaxHora);
  const tbwCoef = ctx.species === 'cao' ? consensos.limites.sodio.tbw.cao : consensos.limites.sodio.tbw.gato;
  const alvoPadrao = consensos.limites.sodio.alvo_padrao;
  const refsUsadas = getRefs(consensos, [consensos.limites.sodio.ref]);

  return { limites: { maxDia_mEqL, maxHora_mEqL, tbwCoef, alvoPadrao }, reduzirRatePercent, reduzirVolumePercent, evitarFluido, preferirFluido, avisos, refsUsadas };
}

export function potassiumGuidance(consensos: Consensos, ctx: PatientContext, serumK: number) {
  const { reduzirRatePercent, reduzirVolumePercent, evitarFluido, preferirFluido, avisos } = applyModifiers(consensos, ctx);
  const table = consensos.limites.potassio.tabela_ajuste;
  const row = table.find(r => serumK >= r.faixa_min && serumK <= r.faixa_max) || table[table.length - 1];
  const kclPerLiter = row.kcl_mEq_L;
  const maxFluidRate_mL_kg_h = row.max_mL_kg_h * (1 - reduzirRatePercent / 100);
  const max_mEq_kg_h = consensos.limites.potassio.max_mEq_kg_h * (1 - reduzirRatePercent / 100);
  const concMaxPeriferico = consensos.limites.potassio.conc_max_mEq_L_periferico;
  const concMaxCentral = consensos.limites.potassio.conc_max_mEq_L_central;
  const kclMeqPorMl = consensos.estoques.kcl191_meq_por_ml;
  const refsUsadas = getRefs(consensos, [consensos.limites.potassio.ref, row.ref]);

  return {
    limites: { kclPerLiter, maxFluidRate_mL_kg_h, max_mEq_kg_h, concMaxPeriferico, concMaxCentral, kclMeqPorMl },
    reduzirRatePercent, reduzirVolumePercent, evitarFluido, preferirFluido, avisos, refsUsadas
  } as AppliedRulesResult<any>;
}


