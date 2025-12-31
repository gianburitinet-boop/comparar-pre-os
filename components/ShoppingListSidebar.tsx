
import React from 'react';
import { ShoppingItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShoppingItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onToggleCheck: (id: string) => void;
  onGetRecipe: () => void;
}

const ShoppingListSidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQty, 
  onToggleCheck,
  onGetRecipe
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center bg-emerald-50 text-emerald-900">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <i className="fas fa-clipboard-list"></i>
              Lista de Compras
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <i className="fas fa-cart-arrow-down text-5xl mb-4 opacity-20"></i>
                <p>Sua lista está vazia.</p>
                <p className="text-sm">Adicione itens para começar a comparar preços.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${item.checked ? 'bg-slate-50 border-transparent opacity-60' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <button 
                    onClick={() => onToggleCheck(item.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}
                  >
                    {item.checked && <i className="fas fa-check text-[10px]"></i>}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm truncate ${item.checked ? 'line-through text-slate-400' : ''}`}>{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.store} • R$ {item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs hover:bg-slate-200">-</button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs hover:bg-slate-200">+</button>
                  </div>

                  <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <i className="fas fa-trash-can text-sm"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-slate-50 space-y-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total Estimado</span>
                <span className="text-emerald-600">R$ {total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={onGetRecipe}
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
              >
                <i className="fas fa-magic"></i>
                Sugestão de Receita (IA)
              </button>
              
              <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]">
                <i className="fas fa-share-nodes"></i>
                Compartilhar Lista
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingListSidebar;
