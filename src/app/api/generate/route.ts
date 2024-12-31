import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { mainGoal } = await req.json();

    const prompt = `메인 목표: "${mainGoal}"

이 메인 목표를 달성하기 위한 8개의 세부 목표와 각 세부 목표별 8개의 실천 방안을 제시해주세요.
다음 형식으로 응답해주세요:

{
  "subGoals": ["세부목표1", "세부목표2", ...],
  "subGoalDetails": [
    {
      "title": "세부목표1",
      "tasks": ["실천방안1", "실천방안2", ...]
    },
    ...
  ]
}

응답은 반드시 위 JSON 형식이어야 하며, 모든 텍스트는 한국어로 작성해주세요.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "당신은 사용자의 목표 달성을 돕는 전문가입니다. 주어진 메인 목표에 대해 구체적이고 실천 가능한 세부 목표와 실천 방안을 제시해주세요."
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("Failed to generate mandal content");
    }

    const parsedResponse = JSON.parse(response);

    return NextResponse.json({
      success: true,
      data: parsedResponse
    });
  } catch (error) {
    console.error("Error generating mandal:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate mandal content" },
      { status: 500 }
    );
  }
}
