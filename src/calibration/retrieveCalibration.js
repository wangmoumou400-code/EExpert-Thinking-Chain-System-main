import {
  taskRubric,
  commonThemes,
  riskRules,
  scoreCapRules,
  lowQualityPatterns,
  highQualityMechanisms,
  dimensionEvidenceRules,
  cpsEvidenceRules,
  calibrationInstructions,
  mergeScoreCaps,
  applyScoreCaps
} from './rubrics.js';
import {
  anchorCases,
  anchorLevelGuidance,
  anchorUseInstructions
} from './anchors.js';

function normalizeText(text) {
  return String(text || '').toLowerCase();
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function keywordHits(text, keywords = []) {
  const raw = String(text || '');
  const lower = normalizeText(raw);

  return unique(
    keywords.filter((keyword) => {
      const key = String(keyword || '').trim();
      if (!key) return false;
      return raw.includes(key) || lower.includes(key.toLowerCase());
    })
  );
}

function countMatches(text, keywords = []) {
  return keywordHits(text, keywords).length;
}

const evidenceKeywordGroups = {
  targetUser: [
    '用户', '目标用户', '小朋友', '儿童', '幼儿', '宝宝', '学生', '大学生', '独居',
    '老人', '患者', '术后', '家长', '照护者', '视障', '听障', '考生', '宿舍',
    '上铺', '情侣', '朋友', '家人'
  ],
  genericUserOrNeed: [
    '小朋友', '儿童', '学生党', '学生', '好玩', '好看', '可爱', '实用', '方便',
    '陪伴', '安慰', '治愈', '有趣', '吸引人'
  ],
  useContext: [
    '睡前', '晚上', '宿舍', '上铺', '医院', '病房', '幼儿园', '午睡', '出门',
    '旅行', '床上', '图书馆', '自习室', '考试', '复习', '卧床', '下床', '翻身',
    '家里', '独居', '通勤', '陪睡'
  ],
  concreteNeed: [
    '痛点', '问题', '需求', '不吵醒', '赖床', '孤独', '焦虑', '压力', '疼痛',
    '牵拉', '过敏', '隐私', '清洁', '安全', '防止', '提醒', '固定', '安抚',
    '助眠', '记忆', '复习', '无障碍', '找物', '误触', '摔倒', '不方便', '不愿意'
  ],
  mechanism: [
    '触发', '按下', '按住', '感应', '识别', '震动', '反馈', '记录', '提醒',
    '固定', '拆卸', '连接', '互动', '回应', '调节', '循环', '流程', '步骤',
    '当用户', '使用时', '完成后', '自动', '手动', '生成', '提示'
  ],
  experienceLoop: [
    '触发', '互动', '反馈', '记录', '提醒', '完成', '持续', '每天', '习惯',
    '先', '然后', '最后', '步骤', '流程', '使用流程', '闭环', '回应', '再次使用'
  ],
  formFunction: [
    '耳朵', '肚子', '腹部', '四肢', '兔爪', '尾巴', '身体', '柔软', '拥抱',
    '抱着', '长耳', '形态', '结构', '中空', '口袋', '布料', '毛绒'
  ],
  implementation: [
    '材料', '短毛绒', '棉', 'TPU', '硅胶', '模块', '芯片', '传感器', '蓝牙',
    '电池', '充电', '马达', '气泵', '磁吸', '魔术贴', '按扣', '刺绣',
    '可拆卸', '水洗', '清洗', '消毒', '安全', '成本', '量产', '生产', '耐用',
    '维护', '隐私', '数据', '供电', '发热', '噪音'
  ],
  unsupportedClaims: [
    '降低', '治愈', '保证', '显著提升', '防止', '提高效率', '销量', '环保',
    '临床', '非计划拔管', '完全解决', '一定能', '大幅提升'
  ]
};

const riskEvidenceKeywords = {
  ELECTRONICS_POWER_SAFETY: ['电池', '供电', '充电', '电路', '发热', '过热', '清洗', '可拆卸', '维护', '耐用', '安全'],
  CHILD_SAFETY: ['年龄', '误吞', '窒息', '小零件', '材质安全', '看护', '家长', '耐咬', '清洗', '无毒'],
  PRIVACY_DATA: ['同意', '授权', '本地', '删除', '不上传', '隐私', '用户控制', '加密', '关闭', '不录音'],
  MEDICAL_HEALTH: ['医用', '消毒', '灭菌', '感染', '压力', '牵拉', '临床', '护理', '可拆洗', '边界'],
  PSYCHOLOGICAL_SUPPORT: ['边界', '非治疗', '自愿', '用户控制', '依赖', '效果有限', '心理支持', '不替代'],
  MECHANICAL_FORCE: ['安全', '力度', '噪音', '停止', '急停', '误触', '耐用', '不伤人', '室友', '接受度'],
  HYGIENE_CLEANING: ['清洗', '水洗', '可拆卸', '消毒', '维护', '短毛绒', '防污', '晾干'],
  OVERCLAIMING: ['机制', '依据', '边界', '可能', '适用范围', '限制', '验证']
};

function scoreGroup(text, groupName) {
  const keywords = evidenceKeywordGroups[groupName] || [];
  const hits = keywordHits(text, keywords);

  return {
    count: hits.length,
    hits
  };
}

function matchedCommonThemes(draft) {
  return commonThemes
    .map((theme) => ({
      id: theme.id,
      label: theme.label,
      matchScore: countMatches(draft, theme.keywords),
      matchedKeywords: keywordHits(draft, theme.keywords)
    }))
    .filter((theme) => theme.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore || a.id.localeCompare(b.id));
}

function matchedRiskRules(draft) {
  return riskRules
    .map((rule) => {
      const matchedKeywords = keywordHits(draft, rule.keywords);
      const evidenceKeywords = riskEvidenceKeywords[rule.id] || [];
      const mitigationHits = keywordHits(draft, evidenceKeywords);

      return {
        id: rule.id,
        label: rule.label,
        rule: rule.rule,
        requiredEvidence: rule.requiredEvidence || [],
        capsIfMissing: rule.capsIfMissing || {},
        matchScore: matchedKeywords.length,
        matchedKeywords,
        mitigationHits,
        missingMitigation: matchedKeywords.length > 0 && mitigationHits.length < 2
      };
    })
    .filter((rule) => rule.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore || a.id.localeCompare(b.id));
}

function analyzeDraftEvidence(draft) {
  const groups = Object.fromEntries(
    Object.keys(evidenceKeywordGroups).map((name) => [name, scoreGroup(draft, name)])
  );

  const themes = matchedCommonThemes(draft);
  const risks = matchedRiskRules(draft);

  const commonFeatureThemeIds = [
    'music_sound',
    'light_visual',
    'warmth_sleep',
    'clothing_decoration',
    'storage_pocket'
  ];

  const commonFeatureThemes = themes.filter((theme) => commonFeatureThemeIds.includes(theme.id));
  const hasSmartLabel = themes.some((theme) => theme.id === 'app_smart');
  const hasMarketingOnlySignal = themes.some((theme) => theme.id === 'marketing_branding');
  const hasHighRiskTheme = themes.some((theme) =>
    ['movement_mechanical', 'medical_care', 'privacy_recording'].includes(theme.id)
  );

  const implementationEvidenceCount = groups.implementation.count;
  const experienceLoopScore = groups.experienceLoop.count;
  const concreteNeedScore = groups.concreteNeed.count;
  const mechanismScore = groups.mechanism.count;
  const formFunctionScore = groups.formFunction.count;
  const genericNeedScore = groups.genericUserOrNeed.count;
  const riskWithoutMitigation = risks.some((risk) => risk.missingMitigation);

  return {
    groups,
    themes,
    risks,
    summary: {
      commonFeatureThemeCount: commonFeatureThemes.length,
      commonFeatureThemeIds: commonFeatureThemes.map((theme) => theme.id),
      hasSmartLabel,
      hasMarketingOnlySignal,
      hasHighRiskTheme,
      riskWithoutMitigation,
      implementationEvidenceCount,
      experienceLoopScore,
      concreteNeedScore,
      mechanismScore,
      formFunctionScore,
      genericNeedScore
    }
  };
}

function ruleApplies(rule, evidence) {
  const s = evidence.summary;

  switch (rule.id) {
    case 'COMMON_SINGLE_FEATURE':
      return s.commonFeatureThemeCount === 1 && s.concreteNeedScore < 2 && s.experienceLoopScore < 2;

    case 'COMMON_FEATURE_STACKING_NO_LOOP':
      return s.commonFeatureThemeCount >= 2 && s.experienceLoopScore < 2;

    case 'GENERIC_USER_NEED':
      return s.genericNeedScore > 0 && s.concreteNeedScore < 2;

    case 'SMART_LABEL_NO_MECHANISM':
      return s.hasSmartLabel && (s.mechanismScore < 2 || s.implementationEvidenceCount < 3);

    case 'RISK_DOMAIN_WITHOUT_MITIGATION':
      return s.riskWithoutMitigation;

    case 'HIGH_NOVELTY_HIGH_RISK':
      return s.hasHighRiskTheme && s.riskWithoutMitigation;

    case 'MARKETING_ONLY':
      return s.hasMarketingOnlySignal && s.mechanismScore < 2;

    case 'UNSUPPORTED_EFFECT_CLAIMS':
      return evidence.groups.unsupportedClaims.count > 0 && s.mechanismScore < 2;

    case 'NO_IMPLEMENTATION_EVIDENCE':
      return s.implementationEvidenceCount < 2 && (s.hasSmartLabel || s.hasHighRiskTheme || s.mechanismScore > 1);

    default:
      return false;
  }
}

function appliedCapRules(evidence) {
  return scoreCapRules
    .filter((rule) => ruleApplies(rule, evidence))
    .map((rule) => ({
      id: rule.id,
      label: rule.label,
      caps: rule.caps || {},
      warning: rule.warning,
      appliesWhen: rule.appliesWhen
    }));
}

function scoreCapsFromRisks(risks) {
  return risks
    .filter((risk) => risk.missingMitigation)
    .map((risk) => risk.capsIfMissing || {});
}

function buildScoreCaps(evidence) {
  const capRules = appliedCapRules(evidence);
  const caps = mergeScoreCaps([
    ...capRules.map((rule) => rule.caps),
    ...scoreCapsFromRisks(evidence.risks)
  ]);

  return {
    caps,
    rules: capRules
  };
}

function anchorScores(anchor) {
  if (anchor.expertScores) return anchor.expertScores;

  if (anchor.calibratedScores) {
    return {
      holistic: anchor.calibratedScores.holistic,
      originality: anchor.calibratedScores.originality,
      usefulness: anchor.calibratedScores.usefulness,
      elaboration: anchor.calibratedScores.elaboration
    };
  }

  return {};
}

function anchorMatchScore(anchor, draft, evidence) {
  const keywordScore = countMatches(draft, anchor.keywords) * 3;
  const appliedRuleIds = appliedCapRules(evidence).map((rule) => rule.id);
  const capOverlap = (anchor.applicableCapRules || []).filter((id) => appliedRuleIds.includes(id)).length * 2;

  let levelFit = 0;
  if (anchor.level === 'low' && evidence.summary.commonFeatureThemeCount > 0 && evidence.summary.experienceLoopScore < 2) {
    levelFit += 2;
  }
  if (anchor.level === 'high_risk' && evidence.summary.hasHighRiskTheme) {
    levelFit += 2;
  }
  if (anchor.level === 'high' && evidence.summary.concreteNeedScore >= 2 && evidence.summary.experienceLoopScore >= 2) {
    levelFit += 2;
  }
  if (anchor.level === 'mid' && evidence.summary.concreteNeedScore >= 1 && evidence.summary.commonFeatureThemeCount <= 2) {
    levelFit += 1;
  }

  return keywordScore + capOverlap + levelFit;
}

function topAnchors(draft, evidence, limit = 4) {
  return anchorCases
    .map((anchor) => ({
      ...anchor,
      matchScore: anchorMatchScore(anchor, draft, evidence),
      matchedKeywords: keywordHits(draft, anchor.keywords)
    }))
    .filter((anchor) => anchor.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore || a.id.localeCompare(b.id))
    .slice(0, limit);
}

function expertWarnings(evidence, anchors, capRules) {
  const warnings = [];

  if (evidence.summary.commonFeatureThemeCount >= 1) {
    warnings.push('Check whether common plush-toy features are transformed into a distinctive mechanism rather than rewarded as originality.');
  }

  if (evidence.summary.experienceLoopScore < 2) {
    warnings.push('Do not treat a list of functions as a coherent product experience unless trigger, interaction, feedback, and continued use are clear.');
  }

  if (evidence.summary.implementationEvidenceCount < 3) {
    warnings.push('Do not assign high elaboration when materials, technology, safety, cleaning, power, privacy, cost, or production details are missing.');
  }

  if (evidence.summary.riskWithoutMitigation) {
    warnings.push('Risk domains are present; cap usefulness, elaboration, or holistic score if safety, privacy, hygiene, or feasibility evidence is missing.');
  }

  if (evidence.summary.hasSmartLabel) {
    warnings.push('Do not reward AI, app, Bluetooth, chip, or sensor labels unless the data, mechanism, user control, and implementation are explained.');
  }

  if (evidence.groups.unsupportedClaims.count > 0) {
    warnings.push('Unsupported effect claims should be treated as weak usefulness evidence unless a plausible mechanism or boundary is stated.');
  }

  if (anchors.some((anchor) => anchor.level === 'high_risk')) {
    warnings.push('A high-risk anchor matched: allow originality when justified, but keep holistic scoring conservative if implementation risks are unresolved.');
  }

  capRules.forEach((rule) => {
    if (rule.warning) warnings.push(rule.warning);
  });

  return unique(warnings);
}

function formatEvidenceProfile(evidence) {
  const groupLine = (label, group) => {
    const hits = group.hits.length ? group.hits.join(', ') : 'none';
    return `- ${label}: ${group.count} (${hits})`;
  };

  return [
    groupLine('Target-user evidence', evidence.groups.targetUser),
    groupLine('Use-context evidence', evidence.groups.useContext),
    groupLine('Concrete-need evidence', evidence.groups.concreteNeed),
    groupLine('Mechanism evidence', evidence.groups.mechanism),
    groupLine('Experience-loop evidence', evidence.groups.experienceLoop),
    groupLine('Form-function evidence', evidence.groups.formFunction),
    groupLine('Implementation evidence', evidence.groups.implementation)
  ].join('\n');
}

function formatThemes(themes) {
  if (!themes.length) return 'No common plush-toy theme strongly detected.';

  return themes
    .map((theme) => {
      const hits = theme.matchedKeywords.length ? ` [matched: ${theme.matchedKeywords.join(', ')}]` : '';
      return `- ${theme.id} (${theme.label})${hits}`;
    })
    .join('\n');
}

function formatRiskRules(risks) {
  if (!risks.length) return 'No special risk domain detected.';

  return risks
    .map((risk) => {
      const matched = risk.matchedKeywords.length ? risk.matchedKeywords.join(', ') : 'none';
      const mitigation = risk.mitigationHits.length ? risk.mitigationHits.join(', ') : 'none';
      const missing = risk.missingMitigation ? 'YES' : 'NO';
      return [
        `- ${risk.id} (${risk.label})`,
        `  matched keywords: ${matched}`,
        `  mitigation evidence: ${mitigation}`,
        `  missing mitigation: ${missing}`,
        `  rule: ${risk.rule}`
      ].join('\n');
    })
    .join('\n');
}

function formatCapRules(capRules, caps) {
  if (!capRules.length && !Object.keys(caps).length) {
    return 'No score cap rule is triggered. Apply the rubric normally.';
  }

  const capsText = Object.keys(caps).length
    ? Object.entries(caps).map(([key, value]) => `- ${key}: ${value}`).join('\n')
    : '- none';

  const rulesText = capRules.length
    ? capRules.map((rule) => `- ${rule.id} (${rule.label}): ${rule.warning}`).join('\n')
    : '- none';

  return `Triggered cap rules:\n${rulesText}\n\nComputed maximum scores:\n${capsText}`;
}

function formatAnchors(anchors) {
  if (!anchors.length) {
    return 'No close anchor case matched. Apply the task-specific rubric strictly and avoid score inflation.';
  }

  return anchors
    .map((anchor) => {
      const scores = anchorScores(anchor);
      const rationale = Array.isArray(anchor.rationale) ? anchor.rationale.join(' ') : String(anchor.rationale || '');
      const capRules = (anchor.applicableCapRules || []).join(', ') || 'none';
      const matched = anchor.matchedKeywords?.length ? anchor.matchedKeywords.join(', ') : 'none';

      return `Anchor case: ${anchor.id}
Level: ${anchor.level}
Category: ${anchor.category || 'not specified'}
Validation status: ${anchor.validationStatus || 'not specified'}
Matched keywords: ${matched}
Summary: ${anchor.summary}
Calibrated scores: holistic ${scores.holistic ?? 'NA'}/6, originality ${scores.originality ?? 'NA'}/7, usefulness ${scores.usefulness ?? 'NA'}/7, elaboration ${scores.elaboration ?? 'NA'}/7.
CPS scores: Clarify ${scores.cps?.Clarify ?? 'NA'}/4, Ideate ${scores.cps?.Ideate ?? 'NA'}/4, Develop ${scores.cps?.Develop ?? 'NA'}/4, Implement ${scores.cps?.Implement ?? 'NA'}/4.
Rationale: ${rationale}
Applicable cap rules: ${capRules}
Expert feedback style example: ${anchor.expertFeedbackExample || 'not provided'}
Match guidance: ${anchor.matchGuidance || 'not provided'}`;
    })
    .join('\n\n');
}

function formatWarnings(warnings) {
  if (!warnings.length) return 'No special expert warning. Still apply the rubric conservatively.';
  return warnings.map((warning) => `- ${warning}`).join('\n');
}

function formatAnchorLevelGuidance() {
  if (!anchorLevelGuidance) return '';

  return Object.entries(anchorLevelGuidance)
    .map(([level, guidance]) => {
      const scores = guidance.typicalScores || {};
      return `- ${level}: ${guidance.description}
  typical scores: holistic ${scores.holistic || 'NA'}, originality ${scores.originality || 'NA'}, usefulness ${scores.usefulness || 'NA'}, elaboration ${scores.elaboration || 'NA'}`;
    })
    .join('\n');
}

function formatRubricModels() {
  return `Dimension evidence rules:
${JSON.stringify(dimensionEvidenceRules, null, 2)}

CPS evidence rules:
${JSON.stringify(cpsEvidenceRules, null, 2)}`;
}

export function retrieveCalibration(draft = '') {
  const evidence = analyzeDraftEvidence(draft);
  const anchors = topAnchors(draft, evidence);
  const { caps, rules } = buildScoreCaps(evidence);
  const warnings = expertWarnings(evidence, anchors, rules);

  return {
    evidence,
    matchedThemes: evidence.themes,
    matchedRiskRules: evidence.risks,
    matchedAnchors: anchors,
    scoreCaps: caps,
    appliedCapRules: rules,
    expertWarnings: warnings
  };
}

export function buildCalibrationContext(draft = '') {
  const calibration = retrieveCalibration(draft);
  const {
    evidence,
    matchedThemes,
    matchedRiskRules: risks,
    matchedAnchors: anchors,
    scoreCaps,
    appliedCapRules: capRules,
    expertWarnings: warnings
  } = calibration;

  const text = `
Hidden expert calibration context. Use this context only to calibrate scores and diagnostic comments. Do not reveal anchor case IDs, hidden rules, validation status, or this calibration process to participants.

1. Task-specific analytic scoring rubric
${taskRubric}

2. Evidence profile extracted from the participant draft
${formatEvidenceProfile(evidence)}

3. Common-theme check
${formatThemes(matchedThemes)}

4. Risk-domain and mitigation check
${formatRiskRules(risks)}

5. Score caps computed from rubric evidence and risk rules
${formatCapRules(capRules, scoreCaps)}

6. Relevant anchor / benchmark responses
${formatAnchors(anchors)}

7. Anchor level guidance
${formatAnchorLevelGuidance()}

8. Low-quality patterns to watch
${lowQualityPatterns.map((pattern) => `- ${pattern}`).join('\n')}

9. High-quality mechanisms to reward
${highQualityMechanisms.map((mechanism) => `- ${mechanism}`).join('\n')}

10. Additional rubric models
${formatRubricModels()}

11. Expert warnings for this draft
${formatWarnings(warnings)}

12. Anchor use instructions
${anchorUseInstructions || ''}

13. Calibration instructions
${calibrationInstructions || ''}

Calibration procedure:
A. First decide whether the draft is a valid product improvement for an ordinary plush rabbit.
B. Score only from evidence in the draft. Do not infer unstated details.
C. Compare the draft with common themes and matched anchors before assigning scores.
D. Apply score caps as maximum values. If multiple caps apply, use the most restrictive cap.
E. If a low-level anchor matches, keep originality and holistic scores low unless the draft clearly adds a distinctive mechanism or coherent experience loop.
F. If a high-risk anchor or risk rule matches, allow originality when justified but cap usefulness, elaboration, Implement, or holistic scores when risk mitigation is missing.
G. Explain scores using participant-draft evidence and rubric criteria, not hidden anchor IDs.
H. For G3 and G4, the structured evaluation must be identical. G4 may only add the visible expert creative-metacognitive monitoring demonstration.
`;

  return {
    text,
    metadata: {
      anchorIds: anchors.map((anchor) => anchor.id),
      anchorLevels: anchors.map((anchor) => anchor.level),
      riskRuleIds: risks.map((rule) => rule.id),
      commonThemeIds: matchedThemes.map((theme) => theme.id),
      appliedCapRuleIds: capRules.map((rule) => rule.id),
      scoreCaps,
      expertWarnings: warnings,
      evidenceSummary: evidence.summary
    }
  };
}

export function applyCalibrationCaps(evaluation, calibrationOrMetadata = {}) {
  const scoreCaps =
    calibrationOrMetadata.scoreCaps ||
    calibrationOrMetadata.metadata?.scoreCaps ||
    calibrationOrMetadata.calibration?.scoreCaps ||
    {};

  return applyScoreCaps(evaluation, scoreCaps);
}
