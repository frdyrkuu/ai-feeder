"use client";

import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function MixesPage() {
  const [mixes, setMixes] = useState<any[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/mix/list")
      .then((res) => res.json())
      .then(setMixes);
  }, []);

  const generateReport = async (mixId: string) => {
    setLoading(true);
    setReport(null);

    const res = await fetch("/api/report", {
      method: "POST",
      body: JSON.stringify({ mixId }),
      headers: { "Content-Type": "application/json" },
    });

    const text = await res.text();
    setReport(text);
    setLoading(false);
  };

  const exportPDF = async () => {
    if (reportRef.current) {
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().from(reportRef.current).save('nutrient-report.pdf');
    }
  };


  return (
    <div className="p-4 flex gap-6">
      {/* Left side: Mixes list */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-6">All Saved Mixes</h1>

        {mixes.length === 0 && <p>No mixes found.</p>}

        {mixes.map((mix) => (
          <div
            key={mix.id}
            className="border border-gray-300 p-4 mb-6 rounded-md shadow-sm"
          >
            <h2 className="text-lg font-semibold">{mix.name}</h2>
            <ul className="ml-6 mt-2 list-disc text-sm text-gray-700">
              {mix.ingredients.map((ing: any) => (
                <li key={ing.id}>
                  {ing.name} - {ing.quantity}
                </li>
              ))}
            </ul>
            <button
              onClick={() => generateReport(mix.id)}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Generate Nutrient Report
            </button>
          </div>
        ))}
      </div>

      {/* Right side: Editable report */}
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-4">Editable Report</h2>

        {loading && <p className="italic text-sm text-gray-600">Generating report...</p>}

        {report && (
          <>
            <div
              ref={reportRef}
              contentEditable
              className="bg-white p-4 border rounded min-h-[500px] prose max-w-none overflow-auto"
              dangerouslySetInnerHTML={{ __html: report }}
            />

            <button
              onClick={exportPDF}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
              Export as PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
}