import React from 'react';

export interface ElectrolyteData {
  id: string;
  name: string;
  normalValues: {
    dog: string;
    cat: string;
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