
import * as React from 'react';
import { useState } from 'react';
import ArticleView from './components/ArticleView';
import ToolsPanel from './components/ToolsPanel';
import { HistoricalArticle, ViewMode } from './types';

const INITIAL_ARTICLE: HistoricalArticle = {
  id: '1',
  title: 'The Great Fire of London',
  subtitle: 'A structural post-mortem of a metropolis reborn through tragedy.',
  author: 'Dr. Evelyn Blackwood',
  date: 'September 1666',
  content: `## The Spark in the Dark\n\nIt began in a bakery on Pudding Lane. Thomas Farriner, baker to King Charles II, had neglected to properly extinguish his oven before retiring. By 1 AM on September 2nd, the first flames licked the timber frames of the congested medieval city.\n\n> "A most horrid malicious bloody flame... it made me weep to see it." — Samuel Pepys\n\n## A City of Timber\n\nLondon in 1666 was a tinderbox. The summer had been unusually dry, and the city’s dense architecture of overhanging jetties meant that a fire could jump from one side of a street to the other with ease. The primary fire-fighting method of the day—buckets and small squirts—proved laughably inadequate against the inferno.\n\n### The Royal Response\n\nKing Charles II and his brother James, Duke of York, eventually took charge of the scene. They realized that only the destruction of homes to create firebreaks could save the rest of the capital. Gunpowder was used to blow up blocks of houses, a desperate measure that finally halted the fire's march by September 5th.\n\n## The Aftermath\n\nWhile the human toll was recorded as surprisingly low (though many historians now believe the deaths of the poor were simply not counted), the structural loss was staggering. St. Paul’s Cathedral was a hollow shell, and 13,200 houses lay in ash. Yet, from this disaster, Christopher Wren would imagine a London of stone and wide avenues—a city built to survive.`,
  coverImage: 'https://images.unsplash.com/photo-1599408162162-cd41624c8789?auto=format&fit=crop&q=80&w=1200',
  footnotes: [
    { id: 1, text: "Pepys, S. (1666). The Diary of Samuel Pepys." },
    { id: 2, text: "Tinniswood, A. (2003). By Permission of Heaven: The Story of the Great Fire of London." }
  ]
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.READER);
  const [article, setArticle] = useState<HistoricalArticle>(INITIAL_ARTICLE);

  const handleUpdateContent = (newContent: string) => {
    setArticle(prev => ({ ...prev, content: newContent }));
  };

  const handleImageGenerated = (url: string) => {
    setArticle(prev => ({ ...prev, coverImage: url }));
  };

  return (
    <div className="flex h-screen bg-[#fbfaf5] overflow-hidden">
      {/* Side Navigation */}
      <nav className="w-16 border-r border-stone-200 bg-stone-900 flex flex-col items-center py-8 gap-8 z-50">
        <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-white font-bold text-xl mb-4">C</div>
        
        <button 
          onClick={() => setViewMode(ViewMode.READER)}
          className={`p-2 rounded-lg transition-colors ${viewMode === ViewMode.READER ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'}`}
          title="Reader View"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
        </button>

        <button 
          onClick={() => setViewMode(ViewMode.EDITOR)}
          className={`p-2 rounded-lg transition-colors ${viewMode === ViewMode.EDITOR ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'}`}
          title="Editor Mode"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>

        <button 
          onClick={() => setViewMode(ViewMode.CONFIG)}
          className={`p-2 rounded-lg transition-colors ${viewMode === ViewMode.CONFIG ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'}`}
          title="Article Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {viewMode === ViewMode.READER && (
          <div className="animate-in fade-in duration-500">
            <ArticleView article={article} />
          </div>
        )}

        {viewMode === ViewMode.EDITOR && (
          <div className="h-full flex flex-col bg-stone-100 p-8">
            <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col bg-white shadow-sm border border-stone-200 rounded-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
                <span className="text-sm font-bold uppercase tracking-widest text-stone-400">Chronicle Editor</span>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                </div>
              </div>
              <textarea 
                className="flex-1 p-8 serif text-lg focus:outline-none resize-none leading-relaxed text-stone-800"
                value={article.content}
                onChange={(e) => handleUpdateContent(e.target.value)}
                placeholder="Write your historical narrative here... Use markdown headers for structure."
              />
            </div>
          </div>
        )}

        {viewMode === ViewMode.CONFIG && (
          <div className="h-full flex items-center justify-center p-8 bg-stone-100">
            <div className="max-w-md w-full bg-white p-10 shadow-lg border border-stone-200">
              <h2 className="display-serif text-3xl font-bold mb-8 text-stone-900">Manuscript Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Title</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-stone-200 focus:border-stone-400 focus:outline-none transition-colors"
                    value={article.title}
                    onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Subtitle</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-stone-200 focus:border-stone-400 focus:outline-none transition-colors"
                    value={article.subtitle}
                    onChange={(e) => setArticle(prev => ({ ...prev, subtitle: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Author</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-stone-200 focus:border-stone-400 focus:outline-none transition-colors"
                      value={article.author}
                      onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Era/Date</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-stone-200 focus:border-stone-400 focus:outline-none transition-colors"
                      value={article.date}
                      onChange={(e) => setArticle(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setViewMode(ViewMode.READER)}
                  className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors"
                >
                  Return to Reader View
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Tools Sidebar */}
      <ToolsPanel 
        onImageGenerated={handleImageGenerated} 
        currentContent={article.content}
      />
    </div>
  );
};

export default App;
