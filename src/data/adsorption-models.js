export const adsorptionModels = [
  {
    id: "pseudo-first-order",
    name: "Pseudo-primeira ordem",
    formulaLaTeX: "q_t = q_e(1 - e^{-k_1 t})",
    description:
      "O modelo de pseudo-primeira ordem de Lagergren descreve a cinética de adsorção assumindo que a taxa de ocupação dos sítios adsorventes é proporcional ao número de sítios desocupados. É amplamente utilizado para representar a fase inicial do processo de adsorção.",
    whenToUse:
      "Indicado para cinéticas de adsorção em que o equilíbrio é alcançado de forma relativamente rápida e os dados experimentais apresentam um ajuste linear satisfatório em ln(q_e - q_t) vs t.",
    categories: ["Cinética"],
    color: "#21A4E8",
    parameters: [
      { symbol: "q_t", meaning: "Quantidade adsorvida no tempo t", unit: "mg/g" },
      { symbol: "q_e", meaning: "Quantidade adsorvida no equilíbrio", unit: "mg/g" },
      { symbol: "t", meaning: "Tempo de contato", unit: "min" },
      { symbol: "k_1", meaning: "Constante de adsorção", unit: "1/min" },
    ],
  },
  {
    id: "pseudo-second-order",
    name: "Pseudo-segunda ordem",
    formulaLaTeX: "\\frac{t}{q_t} = \\frac{1}{k_2 q_e^2} + \\frac{t}{q_e}",
    description:
      "O modelo de pseudo-segunda ordem assume que a taxa de adsorção é proporcional ao quadrado do número de sítios desocupados e considera a saturação do adsorvente ao longo do processo.",
    whenToUse:
      "Indicado quando a cinética de adsorção é governada por processos químicos e os dados apresentam ajuste linear satisfatório em t/q_t vs t.",
    categories: ["Cinética"],
    color: "#0A4B8D",
    parameters: [
      { symbol: "q_t", meaning: "Quantidade adsorvida no tempo t", unit: "mg/g" },
      { symbol: "q_e", meaning: "Quantidade adsorvida no equilíbrio", unit: "mg/g" },
      { symbol: "t", meaning: "Tempo de contato", unit: "min" },
      { symbol: "k_2", meaning: "Constante de adsorção", unit: "g/(mg·min)" },
    ],
  },
  {
    id: "elovich",
    name: "Elovich",
    formulaLaTeX: "q_t = \\frac{1}{\\beta} \\ln(\\alpha \\beta t)",
    description:
      "O modelo de Elovich descreve cinéticas de adsorção em superfícies heterogêneas, considerando que a energia de ativação varia com o grau de cobertura do adsorvente.",
    whenToUse:
      "Indicado para processos de adsorção em superfícies heterogêneas, especialmente quando há variação da energia de ativação durante o processo.",
    categories: ["Cinética"],
    color: "#64748B",
    parameters: [
      { symbol: "q_t", meaning: "Quantidade adsorvida no tempo t", unit: "mg/g" },
      { symbol: "t", meaning: "Tempo de contato", unit: "min" },
      { symbol: "\\alpha", meaning: "Constante inicial de adsorção", unit: "mg/(g·min)" },
      { symbol: "\\beta", meaning: "Constante relacionada à extensão de cobertura", unit: "g/mg" },
    ],
  },
];
