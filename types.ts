import React from 'react';

export interface ElectrolyteData {
  id: string;
  name: string;
  normalValues: {
    dog: string;
    cat: string;
    puppy?: string;
    elderly?: string;
    pregnant?: string;
    lactating?: string;
  };
  content: ContentBlock[];
}

export interface FormularyItem {
  id: string;
  name: string;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: 'header' | 'subheader' | 'paragraph' | 'list' | 'warning' | 'table' | 'formula';
  content: React.ReactNode;
  title?: string;
}

export enum Species {
  Dog = 'dog',
  Cat = 'cat'
}

export enum PhysiologicalState {
  Adult = 'adulto',
  Puppy = 'filhote',
  Senior = 'idoso',
  Pregnant = 'gestante',
  Lactating = 'lactante'
}

export enum Comorbidity {
  None = 'nenhuma',
  Endocrinopathy = 'endocrinopatia',
  Cardiopathy = 'cardiopatia',
  Renopathy = 'renopatia',
  Hepatopathy = 'hepatopatia',
  Septic = 'septico'
}

export interface PatientInfo {
  species: Species;
  weight: number;
  state: PhysiologicalState;
  comorbidity: Comorbidity;
}

export interface DiseaseProtocol {
  id: string;
  name: string;
  electrolytes: string[];
  content: ContentBlock[];
}

export interface FluidCompatibility {
  fluidType: string;
  compatible: string[];
  incompatible: string[];
  warnings: string[];
}

export interface CalculationResult {
  isValid: boolean;
  deficit?: number;
  dose?: number;
  infusionRate?: number;
  warnings: string[];
  instructions: string[];
}