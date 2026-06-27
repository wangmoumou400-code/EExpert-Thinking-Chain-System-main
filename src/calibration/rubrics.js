export const rubricVersion = 'v7-task-specific-rubric-evidence-caps-2026-06-27';

export const taskRubric = `
Task-specific analytic scoring rubric for the ordinary 30 cm plush rabbit product-improvement task.

Purpose:
This rubric is used to calibrate AI-generated expert feedback in an experimental intervention. It is not intended to replace human expert judgment. The evaluator must compare the draft with ordinary plush rabbits, common decorative plush-toy improvements, and common smart companion toys.

General scoring principles:
1. Score from evidence in the participant's draft only. Do not infer unstated details.
2. Do not reward long text, professional-sounding vocabulary, AI/app/sensor labels, or emotional wording unless they are linked to a concrete user need, interaction mechanism, and feasible product experience.
3. Distinguish novelty from usefulness. A risky or unrealistic idea can be original but should not receive high usefulness or holistic scores unless risks and constraints are addressed.
4. Distinguish function listing from coherent design. Several common functions do not equal high creativity unless they form one clear experience loop.
5. For G3 and G4, use the same scores and the same evidence-based evaluation. G4 should only add visible expert creative-metacognitive monitoring, not extra advice or different scoring.

A. Holistic creativity score, 1-6
1 = Irrelevant, not a product improvement, or almost no usable idea.
2 = Weak draft: mostly ordinary changes, unclear user value, little development.
3 = Basic draft: relevant but mainly conventional; one or two useful functions, weak originality or detail.
4 = Moderately good draft: clear user/context and some new direction, but limited originality, coherence, or feasibility evidence.
5 = Strong draft: distinctive user problem or interaction mechanism, clear usefulness, coherent product experience, and reasonably elaborated implementation.
6 = Exceptional draft: highly distinctive and coherent; originality, usefulness, and elaboration are all strong; key feasibility, safety, and use-context risks are addressed.

B. Originality score, 1-7
1 = No clear new idea or only repeats ordinary plush-rabbit attributes.
2 = Very common feature addition, such as changing color, clothes, music, light, warmth, pocket, or decoration.
3 = Several common features combined, but no distinctive user problem, interaction mechanism, or experience logic.
4 = Clear context or user group, but the product mechanism is still close to existing smart toys or companion plush products.
5 = Distinctive use scenario, user problem, or interaction mechanism; not merely a feature list.
6 = Strongly original concept with a clear departure from ordinary plush toys and a coherent new product experience.
7 = Exceptional originality: the user problem, interaction mechanism, product form, and experience logic are all highly distinctive and well expressed.

C. Usefulness score, 1-7
1 = No meaningful user value.
2 = User value is vague or implausible.
3 = Addresses a broad need such as cute, fun, convenient, comfort, or companionship without a specific problem.
4 = Has plausible value for a general user/context, but the need-function fit is only partly explained.
5 = Solves a concrete user problem and the main functions match that problem.
6 = Strong usefulness with clear scenario fit, user benefit, and plausible implementation boundaries.
7 = Exceptional usefulness: strong need-function fit, clear usage value, and credible attention to risks, constraints, and real adoption.

D. Elaboration score, 1-7
1 = Only a slogan, label, or one-sentence idea.
2 = Mentions a function but gives almost no product details.
3 = Gives basic functions or rough appearance, but little use process, materials, safety, or feasibility.
4 = Gives core design and basic use process, but misses important technical, safety, cleaning, cost, privacy, or production details.
5 = Reasonably developed: user flow, key components, materials/technology, and some feasibility limits are described.
6 = Well elaborated: coherent mechanism, usage sequence, materials/technology, safety, cleaning, cost, maintenance, and production logic are mostly addressed.
7 = Exceptionally elaborated: another person could understand how to prototype or evaluate the product; major risks and constraints are anticipated.

E. CPS stage scores, 1-4
Clarify: target user, use context, core need, and task challenge.
1 = missing; 2 = broad/generic; 3 = clear but not deep; 4 = specific, situated, and problem-focused.

Ideate: diversity and novelty of idea directions.
1 = no ideation evidence; 2 = common feature additions; 3 = several relevant directions; 4 = diverse and meaningfully different directions or a distinctive mechanism.

Develop: coherence and development of selected concept.
1 = not developed; 2 = loose feature list; 3 = coherent basic solution; 4 = well-integrated product experience.

Implement: feasibility, use flow, constraints, and risk control.
1 = missing; 2 = shallow feasibility claims; 3 = some materials/technology/use-flow details; 4 = credible implementation with key risks addressed.
`;

export const dimensionEvidenceRules = {
  originality: {
    requiredForHighScore: [
      'A non-obvious user problem, context, or experience goal is identified.',
      'The product mechanism is meaningfully different from ordinary plush toys and common smart companion toys.',
      'The plush-rabbit form itself is used in the creative mechanism, not just as decoration.',
      'Functions are integrated into a coherent interaction or experience loop.'
    ],
    commonFalseSignals: [
      'Adding music, light, warmth, clothing, pockets, recording, Bluetooth, app, or AI without a new mechanism.',
      'Using many functions as a list without explaining how they work together.',
      'Using fashionable words such as smart, emotional, healing, companion, or personalized without specific evidence.'
    ]
  },
  usefulness: {
    requiredForHighScore: [
      'A specific target user and use situation are stated.',
      'A concrete need, pain point, or task problem is explained.',
      'Main functions directly fit that need.',
      'Important adoption constraints are considered, such as safety, privacy, cost, cleaning, durability, or context disturbance.'
    ],
    commonFalseSignals: [
      'Only saying cute, fun, useful, convenient, comforting, or attractive.',
      'Claiming medical, psychological, educational, market, or environmental effects without mechanism or boundary.',
      'Assuming users will accept intrusive, risky, noisy, or privacy-sensitive features.'
    ]
  },
  elaboration: {
    requiredForHighScore: [
      'Core design, use flow, and user interaction are clear.',
      'Materials or technical components are named with plausible roles.',
      'Safety, cleaning, maintenance, power, cost, privacy, or production issues are addressed when relevant.',
      'The proposal is detailed enough for another person to imagine a prototype or evaluation.'
    ],
    commonFalseSignals: [
      'Long text with many adjectives but few implementation details.',
      'Mentioning components such as sensors, chips, motors, heating, app, or AI without explaining use, safety, or maintenance.',
      'Only saying it is easy to produce or low cost without evidence.'
    ]
  }
};

export const cpsEvidenceRules = {
  Clarify: {
    requiredEvidence: ['target user', 'use context', 'concrete need or pain point', 'task challenge or constraint'],
    highScoreRule: 'A score of 4 requires a specific user, situated context, concrete need, and problem-focused challenge.',
    capRules: [
      {
        id: 'CLARIFY_GENERIC_ONLY',
        condition: 'Only broad users or needs are stated, such as children, students, cute, fun, useful, good-looking, or companionship.',
        maxScore: 2
      },
      {
        id: 'CLARIFY_USER_CONTEXT_WITHOUT_PAIN_POINT',
        condition: 'Target user and context are present but the concrete pain point is not explained.',
        maxScore: 3
      }
    ]
  },
  Ideate: {
    requiredEvidence: ['multiple idea directions', 'meaningful difference among directions', 'departure from common plush-toy features'],
    highScoreRule: 'A score of 4 requires diverse directions or a distinctive mechanism, not only several common functions.',
    capRules: [
      {
        id: 'IDEATE_COMMON_FEATURES_ONLY',
        condition: 'Ideas mainly repeat common additions such as music, light, clothing, pocket, warmth, recording, or decoration.',
        maxScore: 2
      },
      {
        id: 'IDEATE_SEVERAL_RELEVANT_BUT_SIMILAR_IDEAS',
        condition: 'Several ideas are listed but they belong to the same common feature category.',
        maxScore: 3
      }
    ]
  },
  Develop: {
    requiredEvidence: ['selected direction', 'core mechanism', 'user flow', 'integration among functions'],
    highScoreRule: 'A score of 4 requires a well-integrated product experience rather than a loose feature list.',
    capRules: [
      {
        id: 'DEVELOP_FEATURE_LIST_ONLY',
        condition: 'The selected solution is mostly a list of functions without explaining how users experience them together.',
        maxScore: 2
      },
      {
        id: 'DEVELOP_BASIC_BUT_NOT_INTEGRATED',
        condition: 'The core design is understandable but the functions are weakly connected.',
        maxScore: 3
      }
    ]
  },
  Implement: {
    requiredEvidence: ['materials', 'technology or structure', 'use flow', 'safety or risk control', 'cleaning or maintenance', 'cost or production'],
    highScoreRule: 'A score of 4 requires credible implementation and relevant risk control.',
    capRules: [
      {
        id: 'IMPLEMENT_SHALLOW_FEASIBILITY',
        condition: 'The draft only says low cost, easy to produce, or existing technology can do it without details.',
        maxScore: 2
      },
      {
        id: 'IMPLEMENT_SOME_DETAILS_BUT_RISKS_MISSING',
        condition: 'Some materials or technology are named, but key safety, privacy, cleaning, power, durability, or production issues are missing.',
        maxScore: 3
      }
    ]
  }
};

export const commonThemes = [
  {
    id: 'music_sound',
    label: '声音/音乐/录音',
    keywords: ['唱歌', '音乐', '儿歌', '喇叭', '声音', '播放', '录音', '语音', '音频', '讲故事', '白噪音']
  },
  {
    id: 'light_visual',
    label: '灯光/夜灯/发光',
    keywords: ['发光', '灯', '夜灯', 'LED', '变色', '投影', '荧光', '亮']
  },
  {
    id: 'warmth_sleep',
    label: '加热/睡眠/抱枕',
    keywords: ['加热', '发热', '暖手', '热敷', '睡眠', '助眠', '抱枕', '午睡', '被窝']
  },
  {
    id: 'clothing_decoration',
    label: '换装/装饰/外观',
    keywords: ['换衣服', '衣服', '装饰', '花衣服', '蝴蝶结', '贴纸', 'DIY', '小卡', '刺绣', '颜色', '造型']
  },
  {
    id: 'storage_pocket',
    label: '口袋/收纳',
    keywords: ['口袋', '收纳', '装东西', '拉链', '小包', '隐藏袋', '文具']
  },
  {
    id: 'app_smart',
    label: 'APP/智能/蓝牙',
    keywords: ['APP', 'app', '蓝牙', '智能', '芯片', '传感器', 'AI', '算法', '云端', '小程序']
  },
  {
    id: 'emotion_companion',
    label: '情绪陪伴/安抚',
    keywords: ['情绪', '陪伴', '孤独', '安抚', '焦虑', '压力', '治愈', '心理', '拥抱', '亲友']
  },
  {
    id: 'alarm_wakeup',
    label: '闹钟/唤醒',
    keywords: ['闹钟', '唤醒', '叫醒', '早起', '赖床', '震动', '静音', '宿舍']
  },
  {
    id: 'movement_mechanical',
    label: '运动/机械结构',
    keywords: ['轮子', '跑', '爬', '机械臂', '弹射', '飞行', '吸附', '马达', '旋转', '伸缩']
  },
  {
    id: 'education_learning',
    label: '学习/记忆/词汇',
    keywords: ['学习', '背单词', '词汇', '复习', '真题', '知识', '教育', '考试', '学生']
  },
  {
    id: 'medical_care',
    label: '医疗/护理/康复',
    keywords: ['患者', '术后', '医院', '病房', '伤口', '引流管', '康复', '疼痛', '过敏', '消毒', '护理']
  },
  {
    id: 'privacy_recording',
    label: '隐私/数据/监测',
    keywords: ['录音', '摄像', '定位', '数据', '情绪识别', '麦克风', '隐私', '记录', '监测']
  },
  {
    id: 'marketing_branding',
    label: '营销/包装/品牌',
    keywords: ['爆款', '网红', '高端', '联名', '品牌', '销售', '市场', '包装', '礼盒', '性价比']
  }
];

export const scoreCapRules = [
  {
    id: 'COMMON_SINGLE_FEATURE',
    label: '单一常见功能',
    appliesWhen: 'The core improvement is one common plush-toy feature such as music, light, warmth, clothing, pocket, recording, or simple decoration.',
    signals: ['music_sound', 'light_visual', 'warmth_sleep', 'clothing_decoration', 'storage_pocket'],
    caps: { originalityMax: 3, holisticMax: 4 },
    warning: 'Do not give high originality for a single common feature addition.'
  },
  {
    id: 'COMMON_FEATURE_STACKING_NO_LOOP',
    label: '常见功能堆叠但缺少体验闭环',
    appliesWhen: 'Several common features are listed, but the draft does not explain a coherent trigger-interaction-feedback-use loop.',
    signals: ['multiple_common_themes_without_loop'],
    caps: { originalityMax: 3, holisticMax: 4, developMax: 2 },
    warning: 'Treat function stacking as limited originality unless the functions form one coherent experience.'
  },
  {
    id: 'GENERIC_USER_NEED',
    label: '用户需求过于宽泛',
    appliesWhen: 'The draft only states broad users or needs, such as children, students, cute, fun, good-looking, useful, or companionship, without a concrete pain point.',
    signals: ['generic_user', 'generic_need'],
    caps: { usefulnessMax: 4, clarifyMax: 2, holisticMax: 4 },
    warning: 'Do not give full Clarify score when the user need is generic.'
  },
  {
    id: 'SMART_LABEL_NO_MECHANISM',
    label: '智能技术标签但缺少机制',
    appliesWhen: 'The draft mentions AI, app, Bluetooth, chip, algorithm, or sensor, but does not explain what data are sensed, how decisions are made, or how users control the feature.',
    signals: ['app_smart'],
    caps: { originalityMax: 4, elaborationMax: 4, implementMax: 2, holisticMax: 4 },
    warning: 'Smart technology labels should not raise scores without mechanism and implementation evidence.'
  },
  {
    id: 'RISK_DOMAIN_WITHOUT_MITIGATION',
    label: '风险领域但缺少风险控制',
    appliesWhen: 'The proposal involves children, medical care, heating, electrical parts, recording, privacy, forceful movement, or psychological support but lacks safety, consent, cleaning, maintenance, or boundary details.',
    signals: ['risk_without_mitigation'],
    caps: { usefulnessMax: 5, elaborationMax: 4, implementMax: 3, holisticMax: 5 },
    warning: 'Novelty in risky domains must be balanced by safety and feasibility evidence.'
  },
  {
    id: 'HIGH_NOVELTY_HIGH_RISK',
    label: '高新颖但高风险',
    appliesWhen: 'The idea is unusual or imaginative, but it may harm users, disturb the context, violate privacy, or be difficult to implement, and the draft does not address these issues.',
    signals: ['movement_mechanical', 'privacy_recording', 'medical_care'],
    caps: { usefulnessMax: 4, elaborationMax: 4, implementMax: 2, holisticMax: 4 },
    warning: 'Do not let high novelty dominate the holistic score when major risks are unresolved.'
  },
  {
    id: 'MARKETING_ONLY',
    label: '主要是营销包装而非产品机制',
    appliesWhen: 'The draft mainly relies on branding, packaging, price, market positioning, celebrity/IP linkage, or slogans without a substantive product mechanism.',
    signals: ['marketing_branding'],
    caps: { originalityMax: 4, usefulnessMax: 4, holisticMax: 4 },
    warning: 'Branding and packaging alone should not be evaluated as strong product creativity.'
  },
  {
    id: 'UNSUPPORTED_EFFECT_CLAIMS',
    label: '效果宣称缺少机制或证据',
    appliesWhen: 'The draft claims educational, psychological, medical, market, environmental, or cost benefits without explaining the mechanism, boundary, or evidence.',
    signals: ['overclaiming'],
    caps: { usefulnessMax: 5, elaborationMax: 4 },
    warning: 'Unsupported effects should lower usefulness and elaboration.'
  },
  {
    id: 'NO_IMPLEMENTATION_EVIDENCE',
    label: '缺少实施证据',
    appliesWhen: 'The draft describes an attractive idea but omits materials, components, use flow, safety, cleaning, power, privacy, cost, or production details that are relevant to the idea.',
    signals: ['low_implementation_evidence'],
    caps: { elaborationMax: 4, implementMax: 2 },
    warning: 'Do not give high elaboration merely because the concept is interesting or text is long.'
  }
];

export const riskRules = [
  {
    id: 'ELECTRONICS_POWER_SAFETY',
    label: '电子元件与供电安全',
    keywords: ['电池', '蓝牙', '芯片', '传感器', '马达', '震动', '发热', '加热', 'LED', '灯', '充电', '电路', 'APP', '智能'],
    requiredEvidence: ['power supply', 'battery access', 'heat control', 'cleaning', 'durability', 'maintenance', 'manufacturing'],
    capsIfMissing: { elaborationMax: 4, implementMax: 3 },
    rule: 'If electronics, heating, sensors, motors, or connected components are used but power supply, battery access, heat, cleaning, durability, maintenance, and manufacturing are not addressed, elaboration and Implement scores must be capped.'
  },
  {
    id: 'CHILD_SAFETY',
    label: '儿童安全',
    keywords: ['儿童', '小朋友', '幼儿', '宝宝', '孩子', '3-8岁', '学龄前', '婴儿'],
    requiredEvidence: ['age appropriateness', 'choking risk', 'material safety', 'battery safety', 'cleaning', 'durability', 'caregiver control'],
    capsIfMissing: { usefulnessMax: 5, elaborationMax: 4, holisticMax: 5 },
    rule: 'For child-use products, missing age appropriateness, choking risk, material safety, cleaning, durability, or caregiver control should cap usefulness and elaboration.'
  },
  {
    id: 'PRIVACY_DATA',
    label: '隐私与数据',
    keywords: ['录音', '摄像', '麦克风', '定位', '数据', '上传', '云端', '情绪识别', 'AI识别', '监测', 'APP记录'],
    requiredEvidence: ['consent', 'data storage', 'deletion', 'misuse prevention', 'user control', 'reliability boundary'],
    capsIfMissing: { usefulnessMax: 5, elaborationMax: 4, holisticMax: 5 },
    rule: 'For recording, sensing, AI, app, or personal-data functions, missing consent, storage, deletion, misuse prevention, and user control should cap usefulness and elaboration.'
  },
  {
    id: 'MEDICAL_HEALTH',
    label: '医疗健康与护理风险',
    keywords: ['患者', '术后', '医院', '病房', '伤口', '引流管', '康复', '疼痛', '过敏', '治疗', '医疗', '护理', '消毒', '感染'],
    requiredEvidence: ['medical-grade material', 'cleaning or sterilization', 'infection control', 'pressure or traction risk', 'clinical boundary', 'regulatory feasibility'],
    capsIfMissing: { usefulnessMax: 5, elaborationMax: 4, holisticMax: 5 },
    rule: 'For medical, therapeutic, rehabilitation, hospital, hygiene, wound, or patient-care products, missing medical material, cleaning, infection control, and clinical boundaries should cap scores.'
  },
  {
    id: 'PSYCHOLOGICAL_SUPPORT',
    label: '心理安抚与情绪支持',
    keywords: ['情绪', '孤独', '陪伴', '安抚', '焦虑', '压力', '抑郁', '治愈', '睡眠', '心理', '亲友录音'],
    requiredEvidence: ['concrete support mechanism', 'boundary of use', 'dependence risk', 'realistic effect explanation', 'user control'],
    capsIfMissing: { usefulnessMax: 5, elaborationMax: 4 },
    rule: 'If emotional, psychological, sleep, or therapeutic benefits are claimed without a concrete mechanism and boundary of use, usefulness and elaboration must be capped.'
  },
  {
    id: 'MECHANICAL_FORCE',
    label: '机械运动与物理干预',
    keywords: ['轮子', '跑', '爬', '弹射', '机械臂', '吸附', '飞行', '螺旋桨', '震动', '电击', '拉拽', '推动'],
    requiredEvidence: ['safety', 'noise', 'user acceptance', 'durability', 'context disturbance', 'failure mode'],
    capsIfMissing: { usefulnessMax: 4, elaborationMax: 4, implementMax: 2, holisticMax: 4 },
    rule: 'For mechanical, moving, forceful, or physically intrusive products, missing safety, noise, acceptance, durability, and failure-mode evidence should prevent high holistic scoring.'
  },
  {
    id: 'HYGIENE_CLEANING',
    label: '清洁维护',
    keywords: ['清洗', '水洗', '消毒', '短毛绒', '可拆卸', '汗', '口水', '床上', '医院', '幼儿园'],
    requiredEvidence: ['cleaning method', 'removable parts', 'material durability', 'hygiene context'],
    capsIfMissing: { elaborationMax: 4, implementMax: 3 },
    rule: 'For products used in beds, hospitals, schools, or close body contact, missing cleaning and maintenance details should lower elaboration and Implement scores.'
  },
  {
    id: 'OVERCLAIMING',
    label: '无证据效果宣称',
    keywords: ['降低', '治愈', '保证', '显著提升', '防止', '提高效率', '销量', '环保', '临床', '非计划拔管'],
    requiredEvidence: ['mechanism', 'boundary', 'evidence or plausibility explanation'],
    capsIfMissing: { usefulnessMax: 5, elaborationMax: 4 },
    rule: 'If clinical, educational, psychological, market, environmental, or cost effects are claimed without evidence or mechanism, mention unsupported overclaiming and cap usefulness or elaboration.'
  }
];

export const lowQualityPatterns = [
  'Only adds one common feature such as music, light, warmth, clothing, pocket, recording, or decoration.',
  'Lists many functions but does not connect them into a coherent user experience.',
  'Uses broad needs such as cute, fun, useful, convenient, comfort, companionship, or attractive without a concrete user problem.',
  'Uses smart technology labels such as AI, app, sensor, or data without explaining how they work or why users need them.',
  'Claims emotional, medical, educational, environmental, or market effects without mechanism or evidence.',
  'Focuses on packaging, branding, price, or marketability rather than product mechanism.',
  'Has high novelty but ignores safety, privacy, cleaning, cost, or context constraints.',
  'Contains contradictory features or functions that interfere with each other.'
];

export const highQualityMechanisms = [
  'A concrete and non-obvious user problem is identified before functions are added.',
  'The design creates a new interaction mechanism rather than simply adding a common electronic feature.',
  'Multiple functions form one coherent experience loop: trigger, interaction, feedback, and continued use.',
  'The plush-rabbit form itself is meaningfully used, such as ears, body, limbs, softness, hugging, portability, or symbolic meaning.',
  'The proposal explains why the product is different from ordinary plush toys and existing smart toys.',
  'Implementation details address materials, safety, cleaning, power, privacy, durability, cost, and manufacturing limits.',
  'The concept balances originality with realistic usefulness rather than relying on novelty alone.'
];

export const calibrationInstructions = `
Use the rubric as an evidence-based calibration tool.
First identify observable evidence in the draft.
Then identify matched common themes and risk domains.
Then apply score caps when evidence is missing.
Finally generate the expert evaluation JSON.

Important:
- Score caps are maximum values, not target scores.
- If multiple caps apply, use the most restrictive cap.
- Never raise a score because the draft sounds professional, emotional, or technically fashionable.
- For G3 and G4, the structured evaluation must be identical; G4 only adds the expert creative-metacognitive reasoning demonstration.
`;

export function mergeScoreCaps(capsList = []) {
  const merged = {};

  for (const caps of capsList) {
    if (!caps || typeof caps !== 'object') continue;

    for (const [key, value] of Object.entries(caps)) {
      if (typeof value !== 'number') continue;
      merged[key] = merged[key] === undefined ? value : Math.min(merged[key], value);
    }
  }

  return merged;
}

export function applyScoreCaps(evaluation, scoreCaps = {}) {
  if (!evaluation || typeof evaluation !== 'object') return evaluation;

  if (evaluation.scores) {
    if (typeof scoreCaps.holisticMax === 'number') {
      evaluation.scores.holistic_score = Math.min(evaluation.scores.holistic_score ?? scoreCaps.holisticMax, scoreCaps.holisticMax);
    }
    if (typeof scoreCaps.originalityMax === 'number') {
      evaluation.scores.originality_score = Math.min(evaluation.scores.originality_score ?? scoreCaps.originalityMax, scoreCaps.originalityMax);
    }
    if (typeof scoreCaps.usefulnessMax === 'number') {
      evaluation.scores.usefulness_score = Math.min(evaluation.scores.usefulness_score ?? scoreCaps.usefulnessMax, scoreCaps.usefulnessMax);
    }
    if (typeof scoreCaps.elaborationMax === 'number') {
      evaluation.scores.elaboration_score = Math.min(evaluation.scores.elaboration_score ?? scoreCaps.elaborationMax, scoreCaps.elaborationMax);
    }
  }

  const stageCaps = {
    Clarify: scoreCaps.clarifyMax,
    Ideate: scoreCaps.ideateMax,
    Develop: scoreCaps.developMax,
    Implement: scoreCaps.implementMax
  };

  if (Array.isArray(evaluation.cps_structure)) {
    evaluation.cps_structure = evaluation.cps_structure.map((stageEvaluation) => {
      const maxScore = stageCaps[stageEvaluation.stage];
      if (typeof maxScore === 'number') {
        return {
          ...stageEvaluation,
          stage_score: Math.min(stageEvaluation.stage_score ?? maxScore, maxScore)
        };
      }
      return stageEvaluation;
    });
  }

  return evaluation;
}
