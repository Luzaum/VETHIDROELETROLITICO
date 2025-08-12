# VETHIDROELETROLITICO - Guia Completo de Fluidoterapia e Eletrólitos

## 📋 Descrição

O **VETHIDROELETROLITICO** é uma aplicação web especializada em fluidoterapia e correção de distúrbios eletrolíticos para cães e gatos. Desenvolvido para veterinários, oferece guias detalhados, calculadoras interativas e ferramentas clínicas baseadas nas melhores práticas da medicina veterinária.

## 🚀 Funcionalidades Principais

### 📚 Guias Especializados

#### 👑 Guia Mestre de Sódio (Na⁺)
- **Fisiologia completa** do sódio e sua relação com a água corporal
- **Hiponatremia**: Classificação, etiologia, sinais clínicos e tratamento passo-a-passo
- **Hipernatremia**: Causas, fisiopatologia e protocolos de correção segura
- **Fórmulas clínicas** implementadas na calculadora interativa
- **Exemplos práticos** com casos clínicos reais

#### ⚡ Guia do Potássio (K⁺) - O Maestro da Célula
- **Fisiologia da excitabilidade celular** e papel do potássio
- **Hipocalemia**: Causas, sinais clínicos (incluindo ventroflexão cervical em gatos) e tratamento
- **Hipercalemia**: Emergência médica com protocolo C.A.I.G.O.U
- **Tabela de reposição padrão** para suplementação IV segura
- **Alertas de segurança** com limite máximo de 0.5 mEq/kg/hora

#### ⚖️ Guia do Cloro (Cl⁻) - O Parceiro Silencioso
- **Relação com o bicarbonato** e equilíbrio ácido-base
- **Hipocloremia**: Alcalose metabólica hipoclorêmica e tratamento
- **Hipercloremia**: Acidose metabólica hiperclorêmica e correção
- **Guia de seleção de fluidos** baseado no distúrbio do cloro

#### 🏛️ Guia do Cálcio (Ca²⁺) - O Pilar da Contração e Sinalização
- **Fisiologia do cálcio ionizado** vs. cálcio total
- **Hipocalcemia**: Tetania, eclampsia, hipoparatireoidismo e tratamento de emergência
- **Hipercalcemia**: Protocolo "GOSH DARN IT" e escada terapêutica
- **Farmacopeia completa** com doses e precauções
- **Cálculo do produto Ca×P** para risco de mineralização

### 🧮 Calculadoras Interativas

#### Calculadora de Sódio
- **Déficit de sódio** e água livre
- **Taxa de infusão** baseada na fórmula mestre
- **Status do sódio** com classificação de severidade
- **Lembretes de segurança** para correção lenta

#### Calculadora de Potássio
- **Tabela de reposição** baseada no K⁺ sérico
- **Cálculo automático** da taxa de infusão segura
- **Alertas de segurança** quando excede 0.5 mEq/kg/hora
- **Taxa máxima segura** de fluido por peso

#### Calculadora de Cálcio
- **Cálcio ionizado vs. total** com correção pela albumina
- **Produto Ca×P** para risco de mineralização
- **Doses de emergência** para hipocalcemia
- **Protocolos terapêuticos** para hipercalcemia

### 📖 Bulário Veterinário
- **Medicamentos** para fluidoterapia e correção eletrolítica
- **Doses e indicações** específicas para cães e gatos
- **Interações medicamentosas** e contraindicações

## 🔬 Base Científica

### Referências Principais
- **DiBartola SP**: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (4th Ed.)
- **Cunningham JG**: Textbook of Veterinary Physiology (6th Ed.)
- **Nelson RW & Couto CG**: Small Animal Internal Medicine (6th Ed.)

### Fórmulas Implementadas

#### Sódio
```
Déficit de Na⁺ (mEq) = (Na⁺ desejado – Na⁺ do paciente) × ACT
Taxa de infusão (L/h) = [Mudança desejada no Na⁺ (mEq/L/h) × (ACT + 1)] / (Na⁺ do fluido – Na⁺ do paciente)
```

#### Potássio
- **Taxa máxima segura**: 0.5 mEq/kg/hora
- **Tabela de reposição** baseada no K⁺ sérico (20-80 mEq/L conforme nível)

#### Cloro
- **Correção indireta** através da escolha do fluido adequado
- **NaCl 0.9%** para hipocloremia/alcalose
- **Fluidos balanceados** para hipercloremia/acidose

#### Cálcio
- **Fórmula de correção**: Ca Corrigido = Ca Total - Albumina + 3.5
- **Produto Ca×P**: Risco de mineralização se > 70
- **Dose de emergência**: Gluconato de cálcio 0.5-1.5 mL/kg IV lento

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Tailwind CSS** para estilização responsiva
- **React Router** para navegação
- **Vite** como bundler
- **Context API** para gerenciamento de estado

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
git clone [repository-url]
cd VETHIDROELETROLITICO
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

## 🎯 Casos de Uso Clínicos

### Emergências
- **Hipercalemia grave** com alterações no ECG
- **Hiponatremia aguda** com sinais neurológicos
- **Hipocalemia severa** com ventroflexão cervical
- **Hipocalcemia sintomática** com tetania/convulsões
- **Hipercalcemia** com PU/PD e mineralização

### Casos Crônicos
- **Doença renal crônica** com distúrbios eletrolíticos
- **Hipoadrenocorticismo** (Addison)
- **Hiperadrenocorticismo** (Cushing)
- **Hipoparatireoidismo** pós-tireoidectomia
- **Eclampsia** puerperal

### Monitoramento
- **Fluidoterapia hospitalar** com suplementação eletrolítica
- **Pós-operatório** com correção de distúrbios
- **Pacientes críticos** em UTI
- **Monitoramento do produto Ca×P** em pacientes renais

## ⚠️ Avisos Importantes

### Segurança
- **Sempre consulte** um veterinário especializado
- **Monitore** parâmetros laboratoriais regularmente
- **Ajuste** as doses conforme resposta do paciente
- **Use** as calculadoras como ferramenta de apoio, não como prescrição

### Limitações
- **Não substitui** o julgamento clínico
- **Baseado** em literatura veterinária atual
- **Adapte** para casos específicos conforme necessário

## 🤝 Contribuição

Este projeto é desenvolvido para a comunidade veterinária. Contribuições são bem-vindas para:
- **Correção de bugs**
- **Melhorias na interface**
- **Adição de novos eletrólitos**
- **Atualização de protocolos**

## 📄 Licença

Este projeto é destinado ao uso educacional e clínico veterinário.

---

**Desenvolvido com ❤️ para a medicina veterinária**
