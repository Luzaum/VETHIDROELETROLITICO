Você é uma IA engenheira de produto + pesquisadora clínica. Construa um aplicativo web para veterinários de pequenos animais (cães e gatos) focado em distúrbios hidroeletrolíticos e ácido–base com interface moderna, cálculo seguro e conteúdo didático com referências. O nome do app é Vet Hidro.

1) Escopo clínico (o app deve cobrir)

Distúrbios: hiper/hiponatremia, hiper/hipocalemia, hiper/hipocalcemia, hiper/hipofosfatemia, hiper/hipocloremia, alteração de HCO₃⁻ (acidemia/ alcalemia metabólica), hipo/hiperglicemia e osmolaridade.

Para cada distúrbio, o app precisa:

- Entender/ensinar: o que é, fisiologia/anatomia relevantes, 5 causas frequentes com explicação fisiopatológica, como o distúrbio se instala e se expressa clinicamente (agudo × crônico).
- Diagnóstico: critérios, exames (gás, eletrólitos, hemograma, bioq., urina), quando repetir, sensibilidade/especificidade dos principais testes e interpretação.
- Guias terapêuticos passo a passo (cristaloides, aditivos, bolus × CRI, monitorização), com doses, taxas, diluições, limites de segurança e tempo de infusão; sempre citar a fonte no final do parágrafo em itálico.
- Calculadoras automatizadas e seguras (ver seção 4), com guard-rails (alertas se ultrapassar limites).
- Botões “?” contextuais explicando: fisiopatologia, “por que repor”, indicações/contraindicações, tabelas resumo, sempre com citação em itálico.
- Bulário de reposição (fluídos, KCl, Ca gluconato, fosfatos, MgSO₄, dextrose etc.), compatibilidades e preparo.

Fontes obrigatórias (usar estas exatas) e citar capítulo/seção + página:

- DiBartola – Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (capítulos de Na⁺, K⁺, Cl⁻, acid–base, osmolaridade)
- Nelson & Couto 6ª ed. – cap. Electrolyte Imbalances e seções correlatas (hipo/hiperK, hipo/hiperP, hipoMg, bicarbonato)
- BSAVA Manual of Canine and Feline Emergency and Critical Care (3rd) – seções de sódio, hipercalemia (emergência), hipoglicemia e correções seguras
- Plumb’s Veterinary Drug Handbook (10th) – entradas de KCl injetável (concentração), dextrose (bolus/CRI) e demais fármacos do bulário
- Vaden – Exames laboratoriais: intervalos de referência/comentários interpretativos quando necessário.

Citações-chave que o app deve seguir (e ensinar no “?”):

- Hiponatremia: corrigir lentamente, ≤ 0,5 mmol/L/h, para evitar mielinólise; BSAVA descreve fórmulas de cálculo e estratégias de correção. Fonte: BSAVA, cap. de sódio.
- Hipernatremia: usar déficit de água livre (ex.: TBW × [(Na/normal)–1]) e limitar correção a ~0,5 mmol/L/h. Fonte: BSAVA, cap. de sódio.
- Hipocalemia (reposição IV): NÃO exceder 0,5 mEq/kg/h; use tabela de mEq/L por K⁺ sérico e calcular mL de KCl 19,1% a adicionar ao soro. Fontes: Nelson & Couto (limite) e DiBartola (tabela prática); Plumb’s (concentração).
- Hipercalemia (emergência): Gluconato de cálcio 10% 0,5–1,5 mL/kg IV lento com ECG, + insulina regular com dextrose, medidas adjuvantes (β-agonista, bicarbonato em acidose). Fonte: BSAVA e DiBartola.
- Bicarbonato (acidemia metabólica): Déficit HCO₃⁻ ≈ 0,3–0,4 × peso(kg) × (HCO₃⁻ desejado − medido); reposição fracionada e reavaliação. Fonte: Nelson & Couto.
- Hipofosfatemia: reposição com fosfato de potássio (ex.: 0,01–0,03 mmol/kg/h) com monitorização; estratégias para hiperfosfatemia (quelantes). Fonte: Nelson & Couto.
- Hipomagnesemia: sulfato de magnésio IV; doses conforme tabelas do Nelson & Couto/BSAVA.
- Osmolaridade sérica: Osm ≈ 2 × (Na⁺+K⁺) + glicose/18 + BUN/2,8 (mg/dL). Fonte: DiBartola.
- Hipoglicemia: bolus de dextrose IV (ex.: 0,25–0,5 g/kg) e CRI conforme Plumb’s/BSAVA; evitar extravasamento com soluções hipertônicas. Fontes: Plumb’s e BSAVA.

2) Público e tom

- Público: médicos-veterinários (nível intermediário–avançado).
- Tom: técnico e didático, com “?” explicando a fisiologia/razão de cada escolha. Use tabelas, fluxogramas e “highlights”.

3) Arquitetura e stack

- Next.js + TypeScript
- Tailwind + shadcn/ui (tema azul; modo claro/escuro com toggle; alto contraste e acessibilidade).
- Zod + React Hook Form (validação clínica e de unidades).
- Zustand para estado.
- Módulo de cálculo isolado com testes (vitest).

4) Calculadoras (regras, fórmulas e guard-rails)

Entrada comum em todas:

- Espécie (cão/gato), peso (kg), estado fisiológico (adulto, idoso, filhote, gestante, lactante), comorbidades (cardiopatias, nefropatias, hepatopatias, sépticos, endocrinopatias).
- Painéis de status: mostra faixa normal, classifica gravidade por cor, osmolaridade e riscos imediatos. Osm eq.: ver DiBartola.
- Plano de fluidoterapia 24 h: déficit (%), manutenção (mL/kg/dia), perdas em curso (mL/kg/h) → total e taxa sugerida; ajuste por comorbidades (ex.: ICC/DRC: reduza metas, reavalie por POCUS/PCV-TS/creatinina/diurese).

Opções de preparo/veículo (todas as calculadoras):

- Seringas de 10/20/60 mL ou bolsas de 250/500/1000 mL.
- Veículos: NaCl 0,9%, D5W, Ringer Lactato (explicar quando escolher cada um, compatibilidades e quando evitar).
- Mostrar passo a passo de diluição: “adicione X mL de KCl 19,1% na bolsa de Y mL para atingir Z mEq/L” (Plumb’s).

4.1 Potássio (K⁺)

- Tabelar mEq/L a adicionar por K⁺ sérico (DiBartola). Exibir 80 mEq/L como valor máximo comum em hipocalemias graves quando apropriado.
- Limite de segurança absoluto da infusão: ≤ 0,5 mEq/kg/h; bloquear cálculos acima disso e exibir alerta.
- Emergência – hipercalemia: cartão com gluconato de cálcio 10% (0,5–1,5 mL/kg IV lento com ECG), insulina + dextrose e medidas adjuvantes.

4.2 Sódio (Na⁺)

- Hiponatremia: meta de correção ≤ 0,5 mmol/L/h. Modos “conservador” e “padrão”.
- Hipernatremia: calcular déficit de água livre (TBW = 0,6 × kg cão, 0,5–0,6 gato; Déficit = TBW × [(Na/normal)–1]). Limitar correção a ~0,5 mmol/L/h.

4.3 Bicarbonato (HCO₃⁻)

- Déficit de HCO₃⁻: mEq ≈ 0,3–0,4 × peso(kg) × (HCO₃⁻ desejado − medido). Permitir fracionar 1/3–1/2 da dose e reavaliar.

4.4 Cálcio (Ca²⁺)

- Hipocalcemia sintomática: gluconato de cálcio 10% IV lento, com ECG; mostrar dose por espécie e mL totais a preparar; repetir se necessário.

4.5 Fósforo (P)

- Hipofosfatemia: K-fosfato IV 0,01–0,03 mmol/kg/h; converter para mL do frasco comercial e ajustar K⁺ total. Hiperfosfatemia: guia de quelantes e metas por estágio renal.

4.6 Magnésio (Mg²⁺)

- Reposição com MgSO₄ (bolus/CRI) com ajustes por função renal; detalhar doses e monitorização.

4.7 Cloreto (Cl⁻)

- Reforçar relação com ácido–base e escolha do fluido adequado.

4.8 Glicose

- Hipoglicemia: dextrose IV (p.ex. 0,25–0,5 g/kg) e CRI subsequente; avisos sobre osmolaridade e acesso.

5) UX/UI (shadcn + Tailwind)

- Header com logo + tabs: Início | Calculadora | Guia | Bulário.
- Tema azul, light/dark com alternância funcional.
- Cards com status, recomendação por litro, taxa máxima segura, lembretes críticos.
- “?” (Tooltip/Dialog) em todos campos sensíveis com mini-aulas + tabela/fluxograma + citação em itálico.
- Destacar números-chave (bold), usar legendas coloridas para gravidade, e tabelas responsivas.
- Tela “Bulário”: lista à esquerda; painel detalhado à direita (composição, indicações, preparo, precauções). Incluir concentração de KCl 19,1%.

6) Segurança e validação

- Bloquear taxas acima de: K⁺ 0,5 mEq/kg/h; correções de Na⁺ > 0,5 mmol/L/h; bolus de dextrose acima de limites; alertar sobre extravasamento/vesicantes; forçar ECG quando usar Ca gluconato.
- Avisos contextuais para comorbidades.
- Log de decisões: ao copiar a prescrição, incluir fonte no rodapé (cap./pág.).

7) Conteúdo didático (Guia)

Para cada distúrbio, gerar seções: Etiologia (5 causas com explicação), Fisiopatologia, Diagnóstico, Tratamento, Reavaliação, Resumos/fluxos. Citações obrigatórias no fim de cada subseção em itálico (Livro – cap./seção – página).

8) Exemplos de fluxos de cálculo (implementar)

- K⁺ IV: peso + K⁺ atual → mEq/L (tabela) → mL de KCl 19,1% → taxa (mEq/kg/h) com trava 0,5.
- Hipernatremia: Na⁺ atual, alvo e peso → déficit de água livre → correção ≤ 0,5 mmol/L/h (D5W/NaCl 0,45%/RL).
- Bicarbonato: HCO₃⁻ atual e alvo → mEq totais (0,3–0,4×kg×ΔHCO₃⁻) → porções fracionadas e reavaliação.
- Hipoglicemia: g dextrose para bolus (0,25–0,5 g/kg) → mL de 50%/10% + CRI.

9) Saídas e ações

- Botão “Copiar Prescrição” (preparo passo a passo e fonte).
- Botão “Exportar PDF” do plano de 24 h.
- “Ver bulário” a partir das calculadoras.

10) Testes mínimos

- Testar cenários: K⁺ 2,0, Na⁺ 165, HCO₃⁻ 10, glicose 40; garantir que alertas, travas e diluições estejam corretos. Snapshot de UI em light/dark.

Notas finais

- Não extrapolar além das fontes listadas; priorizar DiBartola para fluidos/ácido–base e BSAVA para emergências; Plumb’s para concentrações/compatibilidades.
- Todas as explicações “?” devem terminar com uma citação em itálico: Livro – cap./seção – página(s).
- Linguagem técnica, didática; usar tabelas, fluxogramas e destaques para uso rápido em plantão.
- Interface conforme layout de referência (cards de status, lembretes, plano de 24 h).

