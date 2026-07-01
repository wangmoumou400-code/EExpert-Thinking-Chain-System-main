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
        evaluative_comment: '任务理解基本清楚，但用户痛点的边界还不够明确，因此澄清质量不能评为高水平。'
      },
      {
        stage: 'Ideate',
        stage_score: 2,
        evidence_from_draft: '方案提出了若干区别于普通毛绒玩具的功能方向。',
        evaluative_comment: '创意有一定变化，但部分内容仍接近常见智能玩具或功能组合，原创性需要谨慎评分。'
      },
      {
        stage: 'Develop',
        stage_score: 2,
        evidence_from_draft: '方案说明了主要功能和价值，但互动机制与连续体验仍不充分。',
        evaluative_comment: '方案方向可以理解，但还需要更清楚的产品机制来支撑原创性和具体性。'
      },
      {
        stage: 'Implement',
        stage_score: 1,
        evidence_from_draft: '材料、供电、安全、清洁、成本或量产限制呈现较少。',
        evaluative_comment: '实施计划相对薄弱，可行性证据不足，因此实施阶段评分较低。'
      }
    ],
    creative_quality: {
      originality: '方案具有一定新意，但原创性主要来自功能组合，独特机制尚不突出。',
      usefulness: '方案能够回应用户陪伴、趣味或使用便利等需要，具有较明确的使用价值。',
      elaboration: '方案仍需要更具体地说明使用流程、关键部件和实现限制。'
    },
    structured_overall_comment: '该方案有清楚的改进方向和一定实用价值，但创意机制和实施细节仍不够充分，整体创造性保持在中等水平。',
    cmc_reasoning_demo: {
      knowledge_activation: '当我评价这个方案时，我先确认三个判断依据：它是否回应毛绒兔改进任务，是否同时具备原创性和实用性，以及是否被发展成足够具体的产品方案。',
      task_monitoring: '我会先看草稿中呈现的目标用户、使用场景和核心需要，这些信息能够支持基本实用性判断，但若需求边界不清，就不能支撑高分。',
      quality_monitoring: '我再检查具体功能是否只是常见毛绒玩具功能的并列组合，还是形成了新的互动机制、用户体验或产品类别转换。',
      control_decision: '因此我不会因为功能数量较多就提高原创性评分，而会根据功能之间是否形成独特体验来控制评分。',
      product_evaluation: '从当前产物看，方案已有可理解的方向，但原创机制、使用流程和实施约束没有完全展开。',
      score_control_summary: '综合判断时，实用性可以相对高一些，原创性和具体性需要压低，整体创造性保持在中等水平。'
    }
  };
}

export async function generateEvaluation(messages, context = {}) {
  const apiUrl = env('AI_API_URL');
  const apiKey = env('AI_API_KEY');
  const model = env('AI_MODEL', '__MODEL_TO_BE_SELECTED__');

  if (!isConfigured(apiUrl) || !isConfigured(apiKey) || !isConfigured(model)) {
    const parsedJson = mockEvaluation(context);
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
