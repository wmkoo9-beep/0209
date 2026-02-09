import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const generateChapterImage = async (photoBase64: string, prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: photoBase64.split(",")[1],
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    // 참고: 실제 이미지 생성 모델(Imagen 등) 설정에 따라 리턴 방식이 다를 수 있습니다.
    // 여기서는 AI가 생성한 텍스트나 데이터를 URL 형태로 반환한다고 가정합니다.
    return response.text(); 
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
