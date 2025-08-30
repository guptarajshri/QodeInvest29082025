export type Blog = {
    id: string;
    title: string;
    date: string; // ISO
    excerpt: string;
    href?: string;
    image?: string;
  };

  export type EquityPoint = {
    date: string; // YYYY-MM-DD
    focused: number; // index, base 100
    nifty50: number; // index, base 100
    drawdown: number; // % negative values
  };
  
  export type TrailingReturnRow = {
    name: string;
    ytd: number;
    d1: number;
    w1: number;
    m1: number;
    m3: number;
    m6: number;
    y1: number;
    y3: number;
    si: number;   // since inception annualized
    dd: number;   // current drawdown
    maxdd: number;// max drawdown
  };
  
  // export type EquityPoint = {
  //   date: string; // ISO
  //   focused: number;
  //   benchmark: number;
  //   drawdown: number; // negative values
  // };
  
  export type PortfolioData = {
    trailingReturns: TrailingReturnRow[];
    equityCurve: EquityPoint[];
    since: string; // ISO eg "2019-01-01"
  };
  