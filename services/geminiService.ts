import { GoogleGenAI, Type } from "@google/genai";
import type { Product } from '../types';

// Access API Key safely for Vite environment (VITE_API_KEY)
// We fallback to empty string to allow app initialization, specific calls will fail or use fallback data if key is missing.
const apiKey = (import.meta as any).env?.VITE_API_KEY || '';

const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateInitialProducts = async (): Promise<Product[]> => {
  // If no API key is present, skip the API call and return fallback data immediately
  if (!apiKey) {
      console.warn("VITE_API_KEY is missing. Using fallback data.");
      return getFallbackProducts();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 12 creative and modern clothing items for an e-commerce store. Provide details in Arabic. Include items for men, women, and kids. Some items should have a discounted price. Include a short, compelling product description for each.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique identifier string, e.g., 'prod-1'" },
              name: { type: Type.STRING, description: "Product name in Arabic, e.g., 'تيشيرت كلاسيك'" },
              category: { type: Type.STRING, description: "Category in Arabic (الرجال, النساء, أطفال)" },
              price: { type: Type.NUMBER, description: "The final price." },
              originalPrice: { type: Type.NUMBER, description: "The original price before discount (optional)." },
              rating: { type: Type.NUMBER, description: "A rating from 1 to 5." },
              imageUrl: { type: Type.STRING, description: "A placeholder image URL from picsum.photos, e.g., https://picsum.photos/600/900" },
              description: { type: Type.STRING, description: "A short, compelling product description in Arabic." }
            },
            required: ["id", "name", "category", "price", "rating", "imageUrl", "description"]
          },
        },
      },
    });

    const jsonString = response.text.trim();
    const products = JSON.parse(jsonString);
    return products as Product[];
  } catch (error) {
    console.error("Error generating products with Gemini:", error);
    // Fallback to static data in case of API error
    return getFallbackProducts();
  }
};

const getFallbackProducts = (): Product[] => {
    return [
        { id: 'prod-1', name: 'تيشيرت كلاسيك', category: 'الرجال', price: 250, rating: 4, imageUrl: 'https://picsum.photos/seed/prod1/600/900', description: 'تيشيرت قطني 100% بتصميم بسيط وأنيق، مثالي للارتداء اليومي.' },
        { id: 'prod-2', name: 'فستان صيفي', category: 'النساء', price: 450, originalPrice: 550, rating: 5, imageUrl: 'https://picsum.photos/seed/prod2/600/900', description: 'فستان خفيف ومريح بنقشات زهور، مثالي لأيام الصيف الحارة.' },
        { id: 'prod-3', name: 'بنطلون جينز للأطفال', category: 'أطفال', price: 200, rating: 4, imageUrl: 'https://picsum.photos/seed/prod3/600/900', description: 'بنطلون جينز مريح وعملي للأطفال، مصنوع من قماش عالي الجودة.' },
        { id: 'prod-4', name: 'قميص رسمي', category: 'الرجال', price: 350, rating: 5, imageUrl: 'https://picsum.photos/seed/prod4/600/900', description: 'قميص رسمي بقصة عصرية وأنيقة، مناسب للعمل والمناسبات الخاصة.' },
        { id: 'prod-5', name: 'بلوزة أنيقة', category: 'النساء', price: 320, rating: 4, imageUrl: 'https://picsum.photos/seed/prod5/600/900', description: 'بلوزة ناعمة بتصميم فريد، تضفي لمسة من الأناقة على إطلالتك.' },
        { id: 'prod-6', name: 'هودي شتوي', category: 'الرجال', price: 500, originalPrice: 600, rating: 5, imageUrl: 'https://picsum.photos/seed/prod6/600/900', description: 'هودي دافئ ومبطن، يوفر حماية مثالية من البرد بأسلوب عصري.' },
        { id: 'prod-7', name: 'طقم ملابس أطفال', category: 'أطفال', price: 280, rating: 5, imageUrl: 'https://picsum.photos/seed/prod7/600/900', description: 'طقم متكامل للأطفال بتصميم مرح وألوان زاهية، مريح للعب والنشاط.' },
        { id: 'prod-8', name: 'تنورة قصيرة', category: 'النساء', price: 290, rating: 4, imageUrl: 'https://picsum.photos/seed/prod8/600/900', description: 'تنورة قصيرة بقصة عصرية، سهلة التنسيق مع مختلف الإطلالات.' },
    ];
}