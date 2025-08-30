import React from "react";
import trailing from "../data/trailing_returns.json";

type TRows = {
  name: string;
  values: string[];
};

type TData = {
  columns: string[];
  rows: TRows[];
  note?: string;
};

const HeaderCell: React.FC<{ label: string; isVerticalLine: boolean }> = ({ label, isVerticalLine }) => (
  <th className={`px-3 py-2 text-xs font-medium uppercase tracking-wider text-right ${isVerticalLine ? 'vertical-line' : ''}`}>
    {label}
  </th>
);

export default function ReturnsTable() {
  const data = trailing as TData;
  return (
    <div className="returns-table-container">
      <div className="table-header">
        <h2 className="table-title">Trailing Returns</h2>
        <button
          title="Download CSV"
          className="table-download-button"
          onClick={() => {
            const header = ["NAME", ...data.columns].join(",");
            const lines = data.rows.map(r => [r.name, ...r.values].join(","));
            const blob = new Blob([header + "\n" + lines.join("\n")], { type: "text/csv" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "trailing_returns.csv";
            a.click();
          }}
        >
          <span className="material-symbols-outlined text-2xl">
            download
          </span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="returns-table">
          <thead>
            <tr>
              <th>Name</th>
              {data.columns.map(c => (
                <HeaderCell key={c} label={c} isVerticalLine={c === 'DD'} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                {row.values.map((v, i) => (
                  <td key={i} className={data.columns[i] === 'DD' ? 'vertical-line' : ''}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.note && (
        <p className="text-xs text-gray-500">{data.note}</p>
      )}
    </div>
  );
}