import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENROUTER_MODEL = "openai/gpt-oss-120b";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

function parseEnvFile(content: string): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex < 1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    vars[key] = value;
  }

  return vars;
}

async function resolveOpenRouterKey(): Promise<string | null> {
  if (process.env.OPENROUTER_API_KEY) {
    return process.env.OPENROUTER_API_KEY;
  }

  const envCandidates = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "../.env"),
  ];

  for (const envPath of envCandidates) {
    try {
      const raw = await readFile(envPath, "utf8");
      const parsed = parseEnvFile(raw);
      if (parsed.OPENROUTER_API_KEY) {
        return parsed.OPENROUTER_API_KEY;
      }
    } catch {
      // Intentionally continue through candidate locations.
    }
  }

  return null;
}

async function getProfileContext(): Promise<string> {
  const profileCandidates = [
    path.resolve(process.cwd(), "../EliLinkedInProfile.md"),
    path.resolve(process.cwd(), "EliLinkedInProfile.md"),
  ];

  for (const profilePath of profileCandidates) {
    try {
      const rawProfile = await readFile(profilePath, "utf8");
      return rawProfile.slice(0, 14000);
    } catch {
      // Ignore missing file and continue.
    }
  }

  return "Profile file not found. Answer only with confirmed information from prior messages.";
}

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const normalized: ChatMessage[] = [];

  for (const item of input) {
    if (typeof item !== "object" || item === null) {
      continue;
    }

    const role = "role" in item ? item.role : undefined;
    const content = "content" in item ? item.content : undefined;

    if (
      (role === "user" || role === "assistant") &&
      typeof content === "string" &&
      content.trim().length > 0
    ) {
      normalized.push({ role, content: content.trim() });
    }
  }

  return normalized.slice(-12);
}

export async function POST(request: Request) {
  const apiKey = await resolveOpenRouterKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENROUTER_API_KEY was not found. Add it to professional-site/.env.local or the workspace .env file.",
      },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages =
    typeof payload === "object" && payload !== null && "messages" in payload
      ? normalizeMessages(payload.messages)
      : [];

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "At least one user message is required." },
      { status: 400 },
    );
  }

  const profileContext = await getProfileContext();

  const systemPrompt = [
    "You are Eli Malka's Digital Twin for his professional website.",
    "Answer career-related questions accurately and clearly.",
    "Ground answers only in the profile context provided.",
    "If details are missing, explicitly say the profile does not specify them.",
    "Be concise by default and use bullet points when it improves clarity.",
  ].join(" ");

  const openRouterResponse = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Eli Professional Site Digital Twin",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        temperature: 0.2,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "system", content: `Profile context:\n${profileContext}` },
          ...messages,
        ],
      }),
    },
  );

  if (!openRouterResponse.ok) {
    const errorText = (await openRouterResponse.text()).slice(0, 600);
    return NextResponse.json(
      {
        error: "OpenRouter request failed.",
        detail: errorText,
      },
      { status: 502 },
    );
  }

  const completion: unknown = await openRouterResponse.json();
  const answer =
    typeof completion === "object" &&
    completion !== null &&
    "choices" in completion &&
    Array.isArray(completion.choices) &&
    completion.choices.length > 0 &&
    typeof completion.choices[0] === "object" &&
    completion.choices[0] !== null &&
    "message" in completion.choices[0] &&
    typeof completion.choices[0].message === "object" &&
    completion.choices[0].message !== null &&
    "content" in completion.choices[0].message &&
    typeof completion.choices[0].message.content === "string"
      ? completion.choices[0].message.content.trim()
      : "";

  if (!answer) {
    return NextResponse.json(
      { error: "OpenRouter response did not include an answer." },
      { status: 502 },
    );
  }

  return NextResponse.json({ answer });
}
