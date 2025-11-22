import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, imageUrl: string) => void;
  initialTitle: string;
  initialUrl: string;
  hideTitle?: boolean;
  modalTitle?: string;
  helperText?: string;
}

export const EditModal: React.FC<EditModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialTitle, 
  initialUrl,
  hideTitle = false,
  modalTitle = "Editar Álbum",
  helperText
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setUrl(initialUrl);
    }
  }, [isOpen, initialTitle, initialUrl]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{modalTitle}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Title Input - Only show if not hidden */}
          {!hideTitle && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título do Álbum
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Ex: Casamentos"
                required={!hideTitle}
              />
            </div>
          )}

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link da Imagem
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-10"
                placeholder="https://..."
              />
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-red-600">IMPORTANTE:</span> Use o "Link direto" (termina em .jpg ou .png).
                </p>
                <a 
                  href="https://postimages.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                >
                  Abrir Postimages <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
            </div>
          </div>

          {/* Preview (Optional) */}
          {url && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-700 mb-1">Prévia:</p>
              <div className="aspect-[4/3] w-24 bg-gray-100 rounded-sm overflow-hidden border border-gray-200 flex items-center justify-center">
                <img src={url} alt="Preview" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};