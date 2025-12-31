
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import { STORES, PRODUCTS, CATEGORIES } from './constants';
import { Product, AIAnalysisResult, Store } from './types';
import { analyzePriceDeal } from './services/geminiService';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Tudo' || p.category === activeCategory;
      const matchesStore = !selectedStore || p.store === selectedStore;
      return matchesSearch && matchesCategory && matchesStore;
    });
  }, [searchTerm, activeCategory, selectedStore]);

  const getStoreByBrand = (brand: string): Store | undefined => {
    return STORES.find(s => s.name === brand);
  };

  const handleNavigate = (storeName: string) => {
    const store = getStoreByBrand(storeName);
    if (store) {
      window.open(store.website, '_blank');
    }
  };

  const handleAIAnalysis = async (product: Product) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    const result = await analyzePriceDeal(product.name, product.price, product.store);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-8">
      <Header onSearch={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Banner */}
        <section className="relative h-48 md:h-60 rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center p-8 md:p-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 space-y-3">
            <span className="bg-emerald-500 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Live Price Tracking</span>
            <h1 className="text-3xl md:text-5xl font-black">Compare com <span className="text-emerald-400">mercados reais.</span></h1>
            <p className="text-slate-400 text-sm max-w-md">Buscamos em tempo real nos maiores portais: Assaí, Carrefour, Sonda e mais.</p>
          </div>
        </section>

        {/* Lojas Rápidas */}
        <section>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {STORES.map(store => (
              <button 
                key={store.id}
                onClick={() => setSelectedStore(selectedStore === store.name ? null : store.name)}
                className={`flex-shrink-0 flex items-center gap-4 bg-white p-4 pr-6 rounded-[2rem] border-2 transition-all shadow-sm ${selectedStore === store.name ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-50' : 'border-transparent hover:border-emerald-200'}`}
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-100">
                  <img src={store.logo} className="w-full h-full object-cover" alt={store.name} />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-sm text-slate-800">{store.name}</h3>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">{store.distance}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Filtros */}
        <div className="sticky top-20 z-30 bg-slate-50/90 backdrop-blur-md py-4 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 shadow-sm'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Comparação */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group bg-white rounded-[2.5rem] border border-slate-100 p-4 hover:shadow-2xl transition-all cursor-pointer relative flex flex-col"
              onClick={() => { setSelectedProduct(product); handleAIAnalysis(product); }}
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-4">
                <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNavigate(product.store); }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur text-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:text-white transition-all scale-0 group-hover:scale-100"
                  title="Ir ao mercado"
                >
                  <i className="fas fa-external-link-alt text-sm"></i>
                </button>
              </div>
              <div className="px-2 pb-2 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{product.store}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-tight mb-4">{product.name}</h3>
                <div className="mt-auto">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xl font-black text-slate-900 leading-none">R$ {product.price.toFixed(2)}</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Comparar Ofertas</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNavigate(product.store); }}
                      className="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <i className="fas fa-route"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Scanner */}
      <button 
        onClick={() => setIsScannerOpen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl z-40 hover:bg-emerald-600 transition-all active:scale-90"
      >
        <i className="fas fa-barcode-read text-2xl"></i>
      </button>

      {/* Modal Scanner */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-900/95 backdrop-blur-md flex flex-col p-8 items-center justify-center text-white">
          <button onClick={() => setIsScannerOpen(false)} className="absolute top-10 right-10 text-3xl opacity-50"><i className="fas fa-times"></i></button>
          <div className="w-full max-w-xs aspect-square border-4 border-emerald-500 rounded-[3rem] relative overflow-hidden bg-black flex items-center justify-center">
            <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] animate-scan"></div>
            <i className="fas fa-camera text-4xl opacity-20"></i>
          </div>
          <p className="mt-8 font-black text-xl">Escaneie no Mercado</p>
          <p className="mt-2 text-center text-slate-400 text-sm">Compare o preço da etiqueta com<br/>todos os concorrentes em tempo real.</p>
        </div>
      )}

      {/* Modal Detalhes com IA Grounding */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-t-[3.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 bg-slate-100">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg"><i className="fas fa-times"></i></button>
            </div>

            <div className="px-8 pb-12 pt-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-black text-emerald-600 uppercase">{selectedProduct.store}</span>
                  <h2 className="text-3xl font-black text-slate-900">{selectedProduct.name}</h2>
                </div>
                <button 
                  onClick={() => handleNavigate(selectedProduct.store)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-emerald-100"
                >
                  <i className="fas fa-shopping-cart"></i>
                  IR AO MERCADO
                </button>
              </div>

              {/* Análise IA */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 font-black text-slate-800">
                  <i className="fas fa-robot text-indigo-600"></i>
                  <span>Radar de Preços Real-Time</span>
                </div>

                {isAnalyzing ? (
                  <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 font-bold">Pesquisando no Assaí, Carrefour, Sonda e outros...</p>
                  </div>
                ) : analysisResult ? (
                  <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="bg-emerald-500 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase">Nota Econômica: {analysisResult.score}/100</div>
                      <i className="fas fa-check-circle text-emerald-400 text-2xl"></i>
                    </div>
                    <p className="text-xl font-bold italic">"{analysisResult.summary}"</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{analysisResult.reasoning}</p>
                    
                    {/* Exibir fontes reais encontradas */}
                    {analysisResult.sources && analysisResult.sources.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fontes Verificadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.sources.map((source, i) => (
                            <a 
                              key={i} 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-2"
                            >
                              <i className="fas fa-link text-emerald-400"></i>
                              {source.title.substring(0, 20)}...
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 flex justify-around lg:hidden z-40 rounded-t-[2rem]">
        <button className="text-emerald-600"><i className="fas fa-compass text-xl"></i></button>
        <button className="text-slate-300" onClick={() => setIsScannerOpen(true)}><i className="fas fa-barcode-read text-xl"></i></button>
        <button className="text-slate-300"><i className="fas fa-store text-xl"></i></button>
        <button className="text-slate-300"><i className="fas fa-user text-xl"></i></button>
      </nav>
    </div>
  );
};

export default App;
