"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function MixesPage() {
  const [mixes, setMixes] = useState<any[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [mixesPerPage] = useState(5); // Number of mixes per page

  useEffect(() => {
    fetch("/api/mix/list")
      .then((res) => res.json())
      .then(setMixes);
  }, []);

  // Get current mixes for pagination
  const indexOfLastMix = currentPage * mixesPerPage;
  const indexOfFirstMix = indexOfLastMix - mixesPerPage;
  const currentMixes = mixes.slice(indexOfFirstMix, indexOfLastMix);
  const totalPages = Math.ceil(mixes.length / mixesPerPage);

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const exportDOCX = async () => {
    if (!reportRef.current) return;

    try {
      // Create a clone of the report content
      const content = reportRef.current.cloneNode(true) as HTMLDivElement;

      // Add basic styles for Word compatibility
      const style = document.createElement('style');
      style.textContent = `
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
      `;
      content.prepend(style);

      // Get the HTML content
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>${style.textContent}</style>
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `;

      // Create a Blob with the HTML content
      const blob = new Blob([html], { type: 'application/msword' });

      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'nutrient-report.doc';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating DOC:', error);
      alert('Failed to export document. Please try again.');
    }
  };

  const copyBlobToClipboard = async () => {
    if (!reportRef.current) return;

    try {
      // Create a Blob with the HTML content
      const html = reportRef.current.innerHTML;
      const blob = new Blob([html], { type: 'text/html' });

      // Create clipboard item
      const clipboardItem = new ClipboardItem({
        'text/html': blob
      });

      // Write to clipboard
      await navigator.clipboard.write([clipboardItem]);

      alert('Report content copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy content. Please try again.');
    }
  };

  return (
    <div className="p-4 flex gap-6">
      {/* Left side: Mixes list with pagination */}
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Saved Mixes</h1>
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstMix + 1}-{Math.min(indexOfLastMix, mixes.length)} of {mixes.length} mixes
          </div>
        </div>

        {mixes.length === 0 && (
          <div className="border border-gray-300 p-4 mb-6 rounded-md shadow-sm space-y-2">
            <p className="italic text-sm text-gray-600 animate-pulse">Loading Mix Contents...</p>
            <p className="italic text-sm bg-gray-200 rounded-full h-4 animate-pulse w-1/2"></p>
            <p className="italic text-sm bg-gray-200 rounded-full h-4 animate-pulse w-1/8"></p>
            <p className="italic text-sm bg-gray-200 rounded-full h-4 animate-pulse w-1/4"></p>
          </div>
        )}

        {currentMixes.map((mix) => (
          <div
            key={mix.id}
            className="border border-gray-300 p-4 mb-4 rounded-md shadow-sm"
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

        {/* Pagination controls */}
        {mixes.length > mixesPerPage && (
          <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${currentPage === number
                      ? 'bg-blue-50 text-blue-600 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Right side: Editable report */}
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-4">Editable Report</h2>

        {loading && <div className="bg-white p-4 border rounded min-h-[500px] prose max-w-none overflow-auto space-y-4">
          <p className="italic text-sm text-gray-600 animate-pulse">Generating report...</p>
          <p className="italic text-sm bg-gray-200 rounded-full h-4 animate-pulse w-1/2"></p>
          <p className="italic text-sm bg-gray-200 rounded-full h-4 animate-pulse w-2/3"></p>
          <p className="italic text-sm bg-gray-200 rounded-full h-4 animate-pulse w-2/6"></p>
        </div>}

        {report && (
          <>
            <div
              ref={reportRef}
              contentEditable
              className="bg-white p-8 border rounded min-h-[500px] prose max-w-none overflow-auto ai-report"
              dangerouslySetInnerHTML={{ __html: report }}
            />
            <div className="flex gap-4 mt-6">
              <Button onClick={exportDOCX} className="bg-blue-600 hover:bg-blue-700 text-white">
                Export as DOCX
              </Button>
              <Button onClick={copyBlobToClipboard}>Copy to Clipboard</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}