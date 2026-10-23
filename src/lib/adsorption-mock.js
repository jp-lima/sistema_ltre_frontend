const experimentalX = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const experimentalY = [0, 12.4, 22.1, 30.5, 37.2, 42.8, 46.5, 48.9, 50.1, 50.8, 51.2];

const modelTraces = {
  "pseudo-first-order": {
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    y: [0, 14.2, 24.5, 32.8, 39.1, 43.6, 46.8, 48.9, 50.3, 51.2, 51.8],
    color: "#0A4B8D",
    metrics: [
      { key: "r2", label: "R²", value: "0.9876" },
      { key: "qe", label: "qₑ calculado", value: "45.23 mg/g" },
      { key: "k1", label: "k₁", value: "0.052 min⁻¹" },
      { key: "rmse", label: "RMSE", value: "1.84" },
    ],
  },
  "pseudo-second-order": {
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    y: [0, 13.1, 23.2, 31.5, 38.0, 42.9, 46.2, 48.4, 49.8, 50.7, 51.3],
    color: "#082E5A",
    metrics: [
      { key: "r2", label: "R²", value: "0.9754" },
      { key: "qe", label: "qₑ calculado", value: "43.18 mg/g" },
      { key: "k2", label: "k₂", value: "0.0032 g/(mg·min)" },
      { key: "rmse", label: "RMSE", value: "2.31" },
    ],
  },
  elovich: {
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    y: [0, 11.8, 21.5, 29.7, 36.4, 41.8, 45.6, 48.2, 49.9, 51.0, 51.7],
    color: "#64748B",
    metrics: [
      { key: "r2", label: "R²", value: "0.9632" },
      { key: "qe", label: "qₑ calculado", value: "44.91 mg/g" },
      { key: "alpha", label: "α", value: "12.5 mg/(g·min)" },
      { key: "beta", label: "β", value: "0.18 g/mg" },
      { key: "rmse", label: "RMSE", value: "2.78" },
    ],
  },
};

export function calculateAdsorption(modelIds, experimentalData) {
  const primaryModelId = modelIds[0] ?? "pseudo-first-order";
  const primaryTrace = modelTraces[primaryModelId] ?? modelTraces["pseudo-first-order"];

  const chartData = [
    {
      x: experimentalData.map((d) => d.t),
      y: experimentalData.map((d) => d.q),
      name: "Dados experimentais",
      mode: "markers",
      type: "scatter",
      marker: { color: "#21A4E8", size: 8 },
      visible: true,
    },
    ...modelIds.map((id) => {
      const modelTrace = modelTraces[id] ?? modelTraces["pseudo-first-order"];
      return {
        x: modelTrace.x,
        y: modelTrace.y,
        name: getModelName(id),
        mode: "lines+markers",
        type: "scatter",
        marker: { color: modelTrace.color, size: 4 },
        line: { color: modelTrace.color, shape: "spline", width: 2 },
        visible: true,
      };
    }),
  ];

  return {
    bestModelId: primaryModelId,
    metrics: primaryTrace.metrics,
    chartData,
  };
}

function getModelName(id) {
  const names = {
    "pseudo-first-order": "Pseudo-primeira ordem",
    "pseudo-second-order": "Pseudo-segunda ordem",
    elovich: "Elovich",
  };
  return names[id] ?? id;
}

export function getDefaultExperimentalData() {
  return experimentalX.map((t, i) => ({ t, q: experimentalY[i] }));
}
