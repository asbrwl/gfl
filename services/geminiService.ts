
import { GoogleGenAI } from "@google/genai";
import { HistoricalInsight, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHistoricalContext = async (topic: string): Promise<HistoricalInsight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a detailed historical context and fact-check for the following topic: "${topic}". Focus on primary sources and verified timelines.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: GroundingSource) => s.uri) || [];

    return {
      summary: response.text || "No summary available.",
      sources: sources
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateHistoricalImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A cinematic, high-detail historical recreation in the style of a classic oil painting or a vintage daguerreotype: ${prompt}. Muted colors, authentic textures.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

export const getMapData = async (locationName: string, userLatLng?: {lat: number, lng: number}) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite-latest",
            contents: `Find the exact geographic coordinates and a brief history for the site: "${locationName}".`,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: userLatLng ? {
                            latitude: userLatLng.lat,
                            longitude: userLatLng.lng
                        } : undefined
                    }
                }
            }
        });
        
        const mapLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map((chunk: any) => chunk.maps?.uri)
            .filter(Boolean) || [];

        return {
            text: response.text,
            mapUrl: mapLinks[0] || null
        };
    } catch (err) {
        console.error("Map grounding error", err);
        return null;
    }
}
