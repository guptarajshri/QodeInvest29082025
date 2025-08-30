import * as XLSX from 'xlsx';
import { PortfolioData, TrailingReturnRow, EquityPoint } from '@/types';

/**
 * Expected Excel layout (put file at /public/data/portfolio.xlsx):
 * Sheet: "trailing"
 *   name | ytd | d1 | w1 | m1 | m3 | m6 | y1 | y3 | si | dd | maxdd
 * Sheet: "equity"
 *   date | focused | benchmark | drawdown
 * Sheet: "meta"
 *   key  | value      (row with key = 'since', value = '2019-01-01')
 * Sheet: "blogs" (optional)
 *   id | title | date | excerpt | href | image
 */
export async function loadPortfolioFromExcel(): Promise<PortfolioData | null> {
  try {
    const resp = await fetch('/data/portfolio.xlsx', { cache: 'no-store' });
    if (!resp.ok) return null;
    const buf = await resp.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });

    const trailing: TrailingReturnRow[] = XLSX.utils.sheet_to_json(
      wb.Sheets['trailing'] ?? {},
    ).map((r: any) => ({
      name: String(r.name),
      ytd: Number(r.ytd), d1: Number(r.d1), w1: Number(r.w1),
      m1: Number(r.m1), m3: Number(r.m3), m6: Number(r.m6),
      y1: Number(r.y1), y3: Number(r.y3), si: Number(r.si),
      dd: Number(r.dd), maxdd: Number(r.maxdd),
    }));

    const equity: EquityPoint[] = XLSX.utils.sheet_to_json(
      wb.Sheets['equity'] ?? {},
    ).map((r: any) => ({
      date: new Date(r.date).toISOString().slice(0,10),
      focused: Number(r.focused),
      benchmark: Number(r.benchmark),
      drawdown: Number(r.drawdown),
    }));

    let since = '2019-01-01';
    const metaRows: any[] = XLSX.utils.sheet_to_json(wb.Sheets['meta'] ?? {});
    const found = metaRows.find(x => String(x.key).toLowerCase() === 'since');
    if (found) since = new Date(found.value).toISOString().slice(0,10);

    return { trailingReturns: trailing, equityCurve: equity, since };
  } catch {
    return null;
  }
}
