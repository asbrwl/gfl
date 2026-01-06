
import React, { useState } from 'react';
import { getHistoricalContext, generateHistoricalImage, getMapData } from '../services/geminiService';
import { HistoricalInsight } from '../types';

interface ToolsPanelProps {
  onImageGenerated: (url: string) => void;
  currentContent: string;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({ onImageGenerated, currentContent }) => {
  const [insight, setInsight] = useState<HistoricalInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [mapQuery, setMapQuery] = useState('');
  const [mapResult, setMapResult] = useState<{text: string, mapUrl: string | null} | null>(null);

  const handleFetchInsight = async () => {
    setLoading(true);
    try {
      const topicMatch = currentContent.match(/## (.*?)\n/);
      const topic = topicMatch ? topicMatch[1] : "Historical Context";
      const result = await getHistoricalContext(topic);
      setInsight(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImg = async () => {
    if (!imagePrompt) return;
    setLoading(true);
    try {
      const url = await generateHistoricalImage(imagePrompt);
      onImageGenerated(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMapSearch = async () => {
    if (!mapQuery) return;
    setLoading(true);
    try {
        const result = await getMapData(mapQuery);
        setMapResult(result);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="w-80 h-full border-l border-stone-200 bg-white/50 backdrop-blur-sm p-6 overflow-y-auto custom-scrollbar">
      <h3 className="display-serif text-xl font-bold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        Gemini Historian
      </h3>

      <div className="space-y-8">
        <section>
          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">AI Image Reconstruction</label>
          <div className="flex flex-col gap-2">
            <textarea 
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="e.g. Victorian London street at night..."
              className="w-full p-3 text-sm border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-400 min-h-[80px]"
            />
            <button 
              onClick={handleGenerateImg}
              disabled={loading}
              className="w-full py-2 bg-stone-800 text-white text-sm font-medium hover:bg-stone-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
        </section>

        <section>
          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Geographic Grounding</label>
          <div className="flex gap-2 mb-3">
             <input 
              type="text"
              value={mapQuery}
              onChange={(e) => setMapQuery(e.target.value)}
              placeholder="Enter location name..."
              className="flex-1 p-2 text-sm border border-stone-200 rounded-sm focus:outline-none"
            />
            <button onClick={handleMapSearch} className="p-2 bg-stone-100 border border-stone-200 hover:bg-stone-200">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
          {mapResult && (
            <div className="text-xs p-3 bg-stone-50 border border-stone-100 rounded-sm">
                <p className="mb-2 leading-relaxed italic">{mapResult.text.substring(0, 100)}...</p>
                {mapResult.mapUrl && (
                    <a href={mapResult.mapUrl} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                        View on Google Maps 
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                )}
            </div>
          )}
        </section>

        <section>
          <button 
            onClick={handleFetchInsight}
            disabled={loading}
            className="w-full p-4 border-2 border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-stone-500 hover:text-stone-700 transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.8 1.1 1.1 0 0 0 1.1 1.1"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
            <span className="text-sm font-bold uppercase tracking-wider">Fact Check & Grounding</span>
          </button>

          {insight && (
            <div className="mt-6 p-4 bg-stone-50 border border-stone-200 rounded-sm animate-fade-in">
              <h4 className="font-bold text-sm mb-2">Historical Brief:</h4>
              <p className="text-sm text-stone-700 leading-relaxed mb-4">{insight.summary}</p>
              <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Verified Sources</h5>
              <ul className="space-y-1">
                {insight.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.uri} target="_blank" className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 underline underline-offset-2">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ToolsPanel;
