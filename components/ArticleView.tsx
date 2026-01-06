
import React from 'react';
import { HistoricalArticle } from '../types';

interface ArticleViewProps {
  article: HistoricalArticle;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  // Simple markdown-to-jsx like parser for basic tags
  const renderContent = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => {
      // Handle simple markdown headers
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="display-serif text-2xl font-semibold mt-12 mb-6 text-stone-800 border-b border-stone-200 pb-2">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={idx} className="display-serif text-4xl font-bold mt-16 mb-8 text-stone-900 border-b-2 border-stone-300 pb-3">{paragraph.replace('## ', '')}</h2>;
      }
      // Handle blockquotes
      if (paragraph.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-stone-400 pl-8 py-4 my-10 italic text-stone-700 serif text-2xl leading-relaxed">
            {paragraph.replace('> ', '')}
          </blockquote>
        );
      }
      
      // Basic paragraph with drop cap on first one
      return (
        <p key={idx} className={`serif text-xl leading-relaxed text-stone-800 mb-8 selection:bg-stone-200 ${idx === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-stone-900' : ''}`}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-24 paper-texture min-h-screen relative overflow-hidden">
      <header className="mb-20 text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-stone-300"></span>
          <span className="uppercase tracking-widest text-xs font-bold text-stone-500">{article.date}</span>
          <span className="h-px w-12 bg-stone-300"></span>
        </div>
        <h1 className="display-serif text-6xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
          {article.title}
        </h1>
        <p className="serif italic text-2xl text-stone-600 mb-10 max-w-2xl mx-auto">
          {article.subtitle}
        </p>
        <div className="flex items-center justify-center gap-3">
          <img src={`https://picsum.photos/seed/${article.author}/40/40`} className="w-10 h-10 rounded-full border border-stone-200" alt={article.author} />
          <span className="text-stone-800 font-medium">By {article.author}</span>
        </div>
      </header>

      {article.coverImage && (
        <div className="w-full h-[50vh] mb-20 relative overflow-hidden shadow-2xl rounded-sm">
          <img src={article.coverImage} className="w-full h-full object-cover grayscale-[0.2] sepia-[0.1]" alt="Historical context" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
        </div>
      )}

      <div className="relative">
        {renderContent(article.content)}
      </div>

      {article.footnotes.length > 0 && (
        <footer className="mt-32 pt-12 border-t border-stone-300">
          <h4 className="display-serif text-xl font-bold mb-8 text-stone-500 uppercase tracking-widest">Footnotes & Citations</h4>
          <ol className="list-decimal list-inside space-y-4 text-stone-600 serif text-lg">
            {article.footnotes.map((fn) => (
              <li key={fn.id} id={`fn-${fn.id}`} className="pl-4">
                {fn.text}
              </li>
            ))}
          </ol>
        </footer>
      )}
    </article>
  );
};

export default ArticleView;
