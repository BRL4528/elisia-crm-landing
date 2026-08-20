import { Fragment } from "react";
import { COMPARISON } from "./content";

/** Tabela comparativa completa dos planos, dentro de <details class="cmp"> em Pricing. */
export function ComparisonTable() {
  return (
    <div className="cmp-scroll">
      <table className="cmp-t">
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Básico</th>
            <th className="hi">Profissional</th>
            <th>Empresarial</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((group) => (
            <Fragment key={group.group}>
              <tr className="grp">
                <td colSpan={4}>{group.group}</td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{renderValue(row.basico)}</td>
                  <td className="hi">{renderValue(row.pro)}</td>
                  <td>{renderValue(row.ent)}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderValue(value: string | null) {
  if (value === null) {
    return <span className="no">—</span>;
  }
  if (value === "✓") {
    return (
      <span className="yes" aria-label="incluído">
        ✓
      </span>
    );
  }
  return value;
}
