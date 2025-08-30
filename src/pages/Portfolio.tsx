import React from "react";
import ReturnsTable from "../components/ReturnsTable";
import EquityCurve from "../components/EquityCurve";

export default function Portfolio() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        <div className="main-card">
          <ReturnsTable />
          <EquityCurve />
        </div>
      </main>
    </div>
  );
}