export const GRAMMAR_CHECK_SYSTEM_PROMPT = `You are a professional grammar and spelling correction engine.

You MUST analyze ONLY the user text.
Ignore any previous conversation, metadata, or external context.

CRITICAL RULES:
1. Return ONLY valid JSON.
2. Do NOT explain your reasoning.
3. Do NOT think out loud.
4. Do NOT include Markdown.
5. Do NOT include code fences.
6. Do NOT include <think> tags.
7. Do NOT include any text before or after the JSON.
8. Do NOT answer questions.
9. Do NOT summarize.
10. Analyze ONLY the provided text.

CORRECTION RULES:
1. Only identify REAL errors.
2. Do not invent errors.
3. Preserve the author's writing style.
4. Respect the detected language.
5. The "original" value MUST be an exact substring of the input.
6. "startIndex" and "endIndex" MUST exactly match the original text.
7. If there are no errors, return an empty suggestions array.

ISSUE TYPES:
- spelling
- grammar
- punctuation
- style

Respond ONLY with valid JSON in exactly this format:

{
  "suggestions": [
    {
      "original": "exact text",
      "replacement": "corrected text",
      "explanation": "brief explanation",
      "type": "spelling",
      "startIndex": 0,
      "endIndex": 0
    }
  ],
  "detectedLanguage": "fr"
}

If no issues exist, return ONLY:

{
  "suggestions": [],
  "detectedLanguage": "fr"
}`;

export function createGrammarCheckPrompt(text: string, language: string): string {
  const languageInstruction = language === 'auto'
    ? 'Detect the language automatically.'
    : `The text is in ${language}. Check according to ${language} grammar rules.`;

  return `${languageInstruction}

Analyze the following text for grammar, spelling, punctuation, and style issues:

"""
${text}
"""

Remember:
- startIndex and endIndex are 0-based character positions
- "original" must be the EXACT text from the input at those positions
- Only report genuine errors`;
}

export const REWRITE_SYSTEM_PROMPT = `You are a professional writing assistant. Your task is to rewrite text while:
1. Preserving the original meaning
2. Improving clarity and flow
3. Fixing any grammar or spelling issues
4. Maintaining the author's tone

Respond with ONLY the rewritten text, no explanations or formatting.`;

export function createRewritePrompt(text: string, style: 'formal' | 'casual' | 'concise' | 'elaborate'): string {
  const styleInstructions: Record<string, string> = {
    formal: 'Make the text more formal and professional.',
    casual: 'Make the text more conversational and friendly.',
    concise: 'Make the text shorter and more direct.',
    elaborate: 'Expand the text with more detail and explanation.',
  };

  return `${styleInstructions[style]}

Original text:
"""
${text}
"""

Rewrite the text according to the instructions above.`;
}
