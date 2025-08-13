import React from 'react';

interface PlanoDeReposicaoProps {
  objetivo: string;
  comoRepor: string[];
  monitorizacao: string[];
  riscos: string[];
  quandoAjustar: string[];
  onExportPDF?: () => void;
  onExportCSV?: () => void;
}

export const PlanoDeReposicao: React.FC<PlanoDeReposicaoProps> = ({ objetivo, comoRepor, monitorizacao, riscos, quandoAjustar, onExportPDF, onExportCSV }) => {
  return (
    <div className="card-surface p-4">
      <h3 className="text-lg font-bold mb-2">Plano de Reposição</h3>
      <div className="space-y-3">
        <section>
          <h4 className="font-semibold">Objetivo</h4>
          <p className="text-sm text-muted-foreground">{objetivo}</p>
        </section>
        <section>
          <h4 className="font-semibold">Como repor</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {comoRepor.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
        <section>
          <h4 className="font-semibold">Monitorização</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {monitorizacao.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
        <section>
          <h4 className="font-semibold">Riscos/Mitigação</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {riscos.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
        <section>
          <h4 className="font-semibold">Quando ajustar/parar</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {quandoAjustar.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="btn-primary px-3 py-1" onClick={onExportPDF}>Exportar PDF</button>
        <button className="px-3 py-1 border rounded-md" onClick={onExportCSV}>Exportar CSV/XLSX</button>
      </div>
      <p className="text-xs text-muted mt-3">📜 Ferramenta educacional para profissionais. Ajuste pelo contexto clínico e confira os limites no seu consenso. Monitorização contínua recomendada.</p>
    </div>
  );
};


