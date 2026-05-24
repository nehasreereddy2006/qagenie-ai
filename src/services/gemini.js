export const generateTestCases = async (userInput) => {
  try {
    const prompt = `Generate professional software QA test cases.

Include:
1. Positive test cases
2. Negative test cases  
3. Edge cases
4. Security-related test cases

Feature Description:
${userInput}

Format the response clearly with headings and bullet points.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "API Error");
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return error.message;
  }
};