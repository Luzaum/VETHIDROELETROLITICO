# VETHIDROELETROLITICO - Guia Prático de Eletrólitos

## 📋 Descrição

O **VETHIDROELETROLITICO** é uma aplicação web prática para veterinários que precisam de informações rápidas e precisas sobre correção de distúrbios eletrolíticos em cães e gatos. Focado no essencial: **quando corrigir, como corrigir, com o que corrigir**.

## 🚀 Funcionalidades Principais

### 📚 Guia Integrado por Eletrólito

O usuário seleciona o eletrólito desejado e acessa informações práticas organizadas:

#### 👑 Sódio (Na⁺)
- **Quando está baixo**: Principais situações (vômito, Addison, diuréticos)
- **Quando está alto**: Diabetes insipidus, perda de água
- **Como corrigir**: Status volêmico, fluidos de escolha, fórmulas práticas
- **Regra de ouro**: Máximo 0.5 mEq/L/hora

#### ⚡ Potássio (K⁺)
- **Quando está baixo**: DRC em gatos, vômito/diarreia, anorexia
- **Quando está alto**: Obstrução uretral, Addison, IRA
- **Como corrigir**: Tabela padrão de reposição IV, protocolo C.A.I.G.O.U
- **Regra de ouro**: Máximo 0.5 mEq/kg/hora

#### ⚖️ Cloro (Cl⁻)
- **Quando está baixo**: Vômito gástrico, diuréticos
- **Quando está alto**: Excesso de NaCl 0.9%, diarreia
- **Como corrigir**: Seleção inteligente de fluidos
- **Conceito chave**: Relação inversa com bicarbonato

#### 🏛️ Cálcio (Ca²⁺)
- **Quando está baixo**: Eclampsia, hipoparatireoidismo, pancreatite
- **Quando está alto**: Câncer, Addison, intoxicação vitamina D
- **Como corrigir**: Gluconato de cálcio para emergência, fluidos para hipercalcemia
- **Conceito chave**: Cálcio ionizado vs. total

### 🧮 Calculadoras Práticas

#### 👑 Calculadora de Sódio
- Cálculo de déficit e taxa de correção segura
- Status do sódio com alertas de segurança
- Fórmulas implementadas: déficit de Na⁺ e água livre

#### ⚡ Calculadora de Potássio
- Tabela padrão de reposição baseada no K⁺ sérico
- Cálculo automático da taxa máxima segura
- Alertas quando excede 0.5 mEq/kg/hora

#### 🏛️ Calculadora de Cálcio
- Correção automática pela albumina
- Cálculo do produto Ca×P para risco de mineralização
- Doses de emergência para hipocalcemia

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
