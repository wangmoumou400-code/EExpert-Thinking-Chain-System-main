const PLACEHOLDER_PATTERN = /^__.*__$/;

function env(name, fallback = '') {
  return process.env[name] || fallback;
}

function isConfigured(value) {
  return Boolean(value) && !PLACEHOLDER_PATTERN.test(value);
}

function stripCodeFence(text) {
  return String(text || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

export function parseJsonOutput(text) {
  const cleaned = stripCodeFence(text);

  try {
    return JSON.parse(cleaned);
  } catch {
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');

    if (first !== -1 && last !== -1 && last > first) {
      return JSON.parse(cleaned.slice(first, last + 1));
    }

    throw new Error('模型返回内容不是有效JSON。请将 AI_TEMPERATURE 设为 0，并检查模型是否支持严格JSON输出。');
  }
}

function mockEvaluation() {
  return {
    scores: {
      holistic_score: 4,
      originality_score: 4,
      usefulness_score: 5,
      elaboration_score: 3
    },
    cps_structure: [
      {
        stage: 'Clarify',
        stage_score: 2,
        evidence_from_draft: '方案呈现了目标用户和使用场景，但核心需求仍可更具体。',
        evaluative_comment: '任务理解基本清楚，但用户痛点的边界还不够明确。'
      },
      {
        stage: 'Ideate',
        stage_score: 2,
        evidence_from_draft: '方案提出了若干区别于普通毛绒玩具的功能方向。',
        evaluative_comment: '创意有一定变化，但部分内容仍接近常见智能玩具功能组合。'
      },
      {
        stage: 'Develop',
        stage_score: 2,
        evidence_from_draft: '方案说明了主要功能和价值，但互动机制与连续体验仍不充分。',
        evaluative_comment: '方案方向可理解，原创性和具体性还需要更清楚的产品机制支撑。'
      },
      {
        stage: 'Implement',
        stage_score: 1,
        evidence_from_draft: '材料、供电、安全、清洗、成本或量产限制呈现较少。',
        evaluative_comment: '实施计划相对薄弱，可行性证据不足。'
      }
    ],
    creative_quality: {
      originality: '方案具有一定新意，但原创性主要来自功能组合，独特机制尚不突出。',
      usefulness: '方案能够回应用户陪伴或趣味体验需要，具有较明确的使用价值。',
      elaboration: '方案仍需要更具体地说明使用流程、关键部件和实现限制。'
    },
    structured_overall_comment: '该方案有清楚的改进方向和一定实用价值，但创意机制和实施细节仍不够充分。',
    cmc_reasoning_demo: {
      evaluation_plan: '当我评价这个方案时，我先问自己：它是否抓住了具体用户问题，是否区别于普通毛绒兔，是否形成完整体验，以及可行性限制是否影响评分。',
      clarify_monitoring: '草稿呈现了目标用户和使用场景，这能支持基本实用性判断；但需求边界不够具体，限制了高分判断。',
      ideate_monitoring: '草稿提出了若干功能变化，但如果这些变化主要是常见功能组合，原创性不能被抬得太高。',
      develop_monitoring: '目前的功能方向可以理解，但还需要判断它们是否形成一个连贯产品体验，而不是并列堆叠。',
      implement_monitoring: '材料、安全、清洁、供电或生产限制若没有充分交代，会压低具体性和实施阶段评分。',
      synthesis: '因此，我会认可方案的基本方向和部分实用价值，但把整体分数控制在中等水平，主要扣分点是原创机制和可行性细节不足。'
    }
  };
}

export async function generateEvaluation(messages, context = {}) {
  const apiUrl = env('AI_API_URL');
  const apiKey = env('AI_API_KEY');
  const model = env('AI_MODEL', '__MODEL_TO_BE_SELECTED__');

  if (!isConfigured(apiUrl) || !isConfigured(apiKey) || !isConfigured(model)) {
    const parsedJson = mockEvaluation(context.materialCode);
    return {
      mock: true,
      model,
      rawText: JSON.stringify(parsedJson, null, 2),
      parsedJson,
      usage: null
    };
  }

  const temperature = Number(env('AI_TEMPERATURE', '0'));
  const maxTokens = Number(env('AI_MAX_TOKENS', '2400'));
  const responseFormat = env('AI_RESPONSE_FORMAT', 'none');

  const requestBody = {
    model,
    temperature,
    max_tokens: maxTokens,
    messages
  };

  if (responseFormat === 'json_object') {
    requestBody.response_format = { type: 'json_object' };
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API请求失败：${response.status} ${text}`);
  }

  const data = await response.json();
  const rawText =
    data.choices?.[0]?.message?.content ||
    data.output_text ||
    data.content ||
    JSON.stringify(data);

  return {
    mock: false,
    model,
    rawText,
    parsedJson: parseJsonOutput(rawText),
    usage: data.usage || null
  };
}
