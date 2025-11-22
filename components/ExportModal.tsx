import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Download } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, code }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'constants.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800 flex justify-between items-center shrink-0">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileCode className="w-5 h-5 text-red-500" /> 
            Publicar Alterações no GitHub
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h4 className="text-blue-800 font-bold mb-2 text-sm uppercase">Como salvar definitivamente:</h4>
            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
              <li>Clique em <strong>Baixar constants.ts</strong> ou Copie o Código.</li>
              <li>Localize o arquivo <strong>constants.ts</strong> na pasta principal do seu projeto.</li>
              <li>Substitua o arquivo antigo pelo novo (ou cole o código dentro dele).</li>
              <li>Faça o <strong>Commit</strong> e <strong>Push</strong> para o GitHub.</li>
            </ol>
          </div>

          {/* Code Block */}
          <div className="relative group">
             <div className="absolute top-0 right-0 p-2 flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded shadow-sm transition-all bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  title="Baixar arquivo pronto"
                >
                  <Download className="w-3 h-3" /> Baixar .ts
                </button>

                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded shadow-sm transition-all ${
                    copied 
                      ? "bg-green-500 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {copied ? (
                    <><Check className="w-3 h-3" /> Copiado!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copiar Código</>
                  )}
                </button>
             </div>
             <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto font-mono h-64 border border-gray-700 shadow-inner whitespace-pre-wrap pt-12">
               {code}
             </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};