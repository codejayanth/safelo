import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageFile: File): Promise<string> {
  const result = await Tesseract.recognize(imageFile, 'eng');
  return result.data.text;
}

export function parseReceiptData(text: string) {
  // Basic parsing logic - can be enhanced based on receipt formats
  const amountMatch = text.match(/\$\s*(\d+\.?\d*)/);
  const dateMatch = text.match(/\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/);
  const storeMatch = text.match(/^(.+?)\n/);

  return {
    amount: amountMatch ? amountMatch[1] : undefined,
    date: dateMatch ? dateMatch[0] : new Date().toISOString().split('T')[0],
    store: storeMatch ? storeMatch[1].trim() : undefined
  };
}