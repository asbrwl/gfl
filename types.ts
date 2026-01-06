
export interface HistoricalArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  content: string;
  coverImage?: string;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  footnotes: Footnote[];
}

export interface Footnote {
  id: number;
  text: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface HistoricalInsight {
  summary: string;
  sources: GroundingSource[];
}

export enum ViewMode {
  READER = 'READER',
  EDITOR = 'EDITOR',
  CONFIG = 'CONFIG'
}
