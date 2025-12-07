import { GoogleGenAI } from "@google/genai";
import { AIRequest, AITaskType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTeachingContent = async (request: AIRequest): Promise<string> => {
  const { scienceUnit, envIssue, taskType, customPrompt } = request;

  let prompt = `
    你是一位專業的自然科學教師與環境教育專家。
    請根據以下資訊，生成一份${taskType}。
    
    【教學背景】
    - 教育階段: ${scienceUnit.grade}
    - 自然科單元: ${scienceUnit.subject} - ${scienceUnit.topic} (課綱代碼: ${scienceUnit.code})
    - 自然科內容說明: ${scienceUnit.description}
    - 融入議題: ${envIssue.theme} - ${envIssue.subTheme} (議題代碼: ${envIssue.code})
    - 議題實質內涵: ${envIssue.content}
  `;

  if (customPrompt) {
    prompt += `\n【老師的額外要求】: ${customPrompt}\n`;
  }

  prompt += `
    \n請以繁體中文 (Traditional Chinese) 輸出，並使用 Markdown 格式編排，使其易於閱讀。
    
    重點要求：
    1. 內容應具體、可行，並強調科學知識與${envIssue.theme}的結合。
    2. 如果涉及 SDGs (永續發展目標)，請明確指出對應的具體目標 (Target) 與如何在課程中實踐。
    3. 若為防災或海洋教育，請強調台灣在地的實例與應用。
  `;

  if (taskType === AITaskType.LessonPlan) {
    prompt += `
      教案格式建議包含：
      1. 單元名稱與教學時間
      2. 學習目標 (結合科學與${envIssue.theme})
      3. 核心素養對應
      4. SDGs 關聯性 (若有)
      5. 教學活動流程 (引起動機、發展活動、綜合活動)
      6. 教學資源
    `;
  } else if (taskType === AITaskType.Assessment) {
    prompt += `
      請提供多元評量方式，例如：
      1. 核心概念選擇題 (附詳解)
      2. 情境素養題 (簡答或申論)，請結合真實情境（如台灣的防災案例或海洋生態）。
      3. 實作評量標準 (Rubrics)
    `;
  } else if (taskType === AITaskType.PPTOutline) {
    prompt += `
      請以投影片大綱形式呈現，每一頁包含：
      - 標題
      - 主要內容點列 (Visualizable points)
      - 講者備忘稿 (Speaker Notes) 建議
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "無法生成內容，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "發生錯誤，請檢查 API Key 或網路連線。";
  }
};