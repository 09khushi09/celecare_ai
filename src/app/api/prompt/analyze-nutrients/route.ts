import { genAI } from "@/lib/constants/gemini";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_INSTRUCTIONS } from "@/lib/constants/system-instructions";
import { getImage } from "@/lib/helpers/image";

export const POST = async (req: NextRequest) => {
  try {
    const { prompt, mimeType, imageUrl } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTIONS.FOOD_AI.AnalyzeNutrients,
    });

    const image = await getImage(imageUrl, mimeType);

    const content = [prompt, image].filter((item) => item);

    const result = await model.generateContent(content);
    const textResult = result.response.text();

    return NextResponse.json({ message: textResult }, { status: 200 });
  } catch (error) {
    console.error("Error processing the image:", error);
    return NextResponse.json(
      { error: "Error processing the image" },
      { status: 500 }
    );
  }
};
