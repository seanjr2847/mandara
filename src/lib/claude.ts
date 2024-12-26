export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeResponse {
  id: string;
  content: Array<{
    text: string;
    type: string;
  }>;
  role: string;
  model: string;
}

export async function generateGoalRecommendations(mainGoal: string, isSubGoal: boolean = false): Promise<string[]> {
  const systemPrompt = `당신은 전문적인 목표 설정 컨설턴트입니다. 
사용자의 목표를 분석하고 체계적이고 실현 가능한 하위 목표들을 제안해주세요.
${isSubGoal ? "세부 목표" : "중심 목표"}를 바탕으로 8개의 ${isSubGoal ? "하위" : "세부"} 목표를 추천해주세요.
각 목표는 구체적이고 측정 가능해야 하며, 1-2문장으로 간단히 작성해주세요.
목표들은 서로 보완적이면서도 독립적이어야 합니다.

응답 형식:
1. [첫 번째 목표]
2. [두 번째 목표]
...
8. [여덟 번째 목표]

추가 설명이나 다른 텍스트는 포함하지 마세요.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || "claude-3-haiku-20240307",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `다음 ${isSubGoal ? "세부" : "중심"} 목표에 대한 ${isSubGoal ? "하위" : "세부"} 목표 8개를 추천해주세요: "${mainGoal}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Claude API Response:", JSON.stringify(data, null, 2));

    if (!data.content?.[0]?.text) {
      throw new Error(`Invalid API response format: ${JSON.stringify(data)}`);
    }

    const text = data.content[0].text;
    console.log("Extracted text:", text);

    const recommendations = text
      .split("\n")
      .filter((line: string) => line.match(/^\d\./))
      .map((line: string) => line.replace(/^\d\.\s*/, "").trim());

    console.log("Parsed recommendations:", recommendations);

    if (recommendations.length === 0) {
      throw new Error("No recommendations found in response");
    }

    return recommendations;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
}
