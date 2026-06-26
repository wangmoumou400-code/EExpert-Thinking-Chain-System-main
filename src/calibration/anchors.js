export const anchorCases = [
  {
    id: 'LOW_COLOR_CLOTHING_RABBIT',
    level: 'low',
    label: '外观换装型低原创锚点',
    keywords: ['换衣服', '衣服', '颜色', '蝴蝶结', '装饰', '花衣服', '贴纸'],
    summary: 'A plush rabbit improved mainly by changing colors, clothing, decorations, or accessories.',
    calibratedScores: { holistic: 2, originality: 2, usefulness: 3, elaboration: 3 },
    rationale: 'Appearance and clothing changes may make the toy more attractive, but they are common plush-toy improvements. Originality stays low unless the decoration system creates a meaningful new interaction or user experience.',
    scoreGuidance: 'If this is the main idea, originality should usually be 1-3.'
  },
  {
    id: 'LOW_SINGING_RABBIT',
    level: 'low',
    label: '唱歌播放型低原创锚点',
    keywords: ['唱歌', '音乐', '儿歌', '喇叭', '播放', '按一下', '音频'],
    summary: 'A plush rabbit that plays songs, stories, or sounds when pressed.',
    calibratedScores: { holistic: 3, originality: 2, usefulness: 4, elaboration: 3 },
    rationale: 'Sound playback is a familiar plush-toy feature. It can have entertainment value, but originality is low unless the sound function is tied to a distinctive user problem, trigger, or experience loop.',
    scoreGuidance: 'Do not give high originality for simple sound playback.'
  },
  {
    id: 'LOW_LIGHT_RABBIT',
    level: 'low',
    label: '夜灯发光型低原创锚点',
    keywords: ['夜灯', '发光', '灯', 'LED', '投影', '变色'],
    summary: 'A plush rabbit with LED light, night-light, or projection features.',
    calibratedScores: { holistic: 3, originality: 2, usefulness: 4, elaboration: 3 },
    rationale: 'Light and night-light functions are common in companion toys. Usefulness can be moderate for sleep or safety, but originality is low without a new interaction or context-specific mechanism.',
    scoreGuidance: 'If safety, heat, battery, and cleaning are missing, elaboration should be capped.'
  },
  {
    id: 'LOW_STORAGE_RABBIT',
    level: 'low',
    label: '口袋收纳型低原创锚点',
    keywords: ['口袋', '收纳', '拉链', '隐藏袋', '装东西', '文具'],
    summary: 'A plush rabbit with pockets or storage spaces.',
    calibratedScores: { holistic: 3, originality: 2, usefulness: 4, elaboration: 3 },
    rationale: 'Storage can be useful, but a pocket alone is a conventional functional addition. Higher scores require a specific user scenario and a design that uses the rabbit form in a distinctive way.',
    scoreGuidance: 'Treat as conventional unless tied to a special context or coherent use flow.'
  },
  {
    id: 'MID_DORM_SILENT_ALARM_RABBIT',
    level: 'mid',
    label: '宿舍静音唤醒型中等锚点',
    keywords: ['宿舍', '早起', '赖床', '闹钟', '静音', '震动', '学生', '上铺'],
    summary: 'A dormitory silent-alarm plush rabbit for students who need to wake up without disturbing roommates.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 5, elaboration: 3 },
    rationale: 'The user context is more concrete than ordinary plush-toy use. Originality is moderate if the wake-up method is mainly existing alarm/vibration logic. Elaboration depends on safety, noise, power, comfort, and user acceptance details.',
    scoreGuidance: 'If the draft lacks battery, noise, and safety details, do not give high elaboration.'
  },
  {
    id: 'MID_DIY_PERSONALIZATION_RABBIT',
    level: 'mid',
    label: 'DIY个性化型中等锚点',
    keywords: ['DIY', '手绘', '魔术贴', '小卡', '贴纸', '个性', '定制', '可替换'],
    summary: 'A plush rabbit with a DIY area for cards, drawings, removable patches, or personal expression.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 4, elaboration: 4 },
    rationale: 'Personalization can improve user attachment, but it is a familiar toy/product strategy. It becomes stronger only if the DIY activity is integrated into a clear user journey or emotional/social mechanism.',
    scoreGuidance: 'Check whether DIY is central to the experience or just decoration.'
  },
  {
    id: 'MID_EMOTION_COMPANION_RABBIT',
    level: 'mid',
    label: '情绪陪伴型中等锚点',
    keywords: ['情绪', '陪伴', '孤独', '安抚', '焦虑', '压力', '拥抱', '亲友', '睡前'],
    summary: 'A plush rabbit designed for emotional companionship, loneliness relief, or sleep comfort.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 5, elaboration: 3 },
    rationale: 'Emotional companionship is valuable but common in smart plush products. Higher scores require a concrete mechanism, boundaries of use, realistic effect, and privacy/safety considerations if data or recording is involved.',
    scoreGuidance: 'Do not over-score broad claims such as companionship or healing without mechanism.'
  },
  {
    id: 'MID_FAMILY_RECORDING_RABBIT',
    level: 'mid',
    label: '亲友录音陪伴型中等锚点',
    keywords: ['亲友录音', '录音', '家人', '语音', '晚安', '留言', '声音陪伴'],
    summary: 'A plush rabbit that plays family or friend recordings for bedtime or emotional connection.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 5, elaboration: 3 },
    rationale: 'Personal voice messages may strengthen emotional value, but recording functions raise privacy and storage issues. Originality is moderate unless the interaction loop is more distinctive than simple playback.',
    scoreGuidance: 'If consent, storage, deletion, and misuse are missing, cap usefulness and elaboration.'
  },
  {
    id: 'MID_HEATED_SLEEP_RABBIT',
    level: 'mid',
    label: '加热助眠型中等锚点',
    keywords: ['加热', '发热', '暖手', '热敷', '助眠', '睡眠', '暖宝宝'],
    summary: 'A plush rabbit with warming, heat-pack, or sleep-comfort functions.',
    calibratedScores: { holistic: 4, originality: 3, usefulness: 5, elaboration: 3 },
    rationale: 'Warmth can be useful in sleep or comfort contexts, but it is a common plush-product improvement. Heating also creates safety, cleaning, and battery/material concerns.',
    scoreGuidance: 'If heat safety and cleaning are not addressed, do not give high elaboration.'
  },
  {
    id: 'MID_LEARNING_STUDY_RABBIT',
    level: 'mid',
    label: '学习辅助型中等锚点',
    keywords: ['学习', '背单词', '复习', '考试', '真题', '词汇', '知识', '学生'],
    summary: 'A plush rabbit used as a study companion, reminder, memory aid, or exam-support toy.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 4, elaboration: 3 },
    rationale: 'A learning context is more specific than general play, but usefulness depends on whether the learning mechanism is credible rather than symbolic or humorous only.',
    scoreGuidance: 'If the product claims learning effects without mechanism, cap usefulness.'
  },
  {
    id: 'MID_SOCIAL_INTERACTION_RABBIT',
    level: 'mid',
    label: '社交互动型中等锚点',
    keywords: ['社交', '交换', '朋友', '互动', '分享', '纪念', '情侣', '同学'],
    summary: 'A plush rabbit that supports social sharing, memory exchange, or interpersonal interaction.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 4, elaboration: 3 },
    rationale: 'Social interaction can create a meaningful use scenario, but the design must specify the interaction rules and why the rabbit form matters.',
    scoreGuidance: 'Look for a complete social interaction loop, not just a sharing slogan.'
  },
  {
    id: 'HIGH_MEDICAL_CARE_RISK_CAPPED_RABBIT',
    level: 'high-risk',
    label: '医疗护理高新颖但风险限制锚点',
    keywords: ['术后', '患者', '引流管', '伤口', '医院', '病房', '固定', '康复', '疼痛', '过敏'],
    summary: 'A plush rabbit designed to solve a specific patient-care problem, such as supporting tubes or reducing discomfort.',
    calibratedScores: { holistic: 5, originality: 6, usefulness: 6, elaboration: 5 },
    rationale: 'A specific medical-care context can be highly original and useful. However, full scores require hygiene, sterilization, pressure/traction risk, clinical feasibility, and regulatory boundaries. Without those details, the concept must be capped even if novel.',
    scoreGuidance: 'High originality is possible, but usefulness/elaboration/holistic score must be capped if medical safety is missing.'
  },
  {
    id: 'HIGH_ACCESSIBILITY_RABBIT',
    level: 'high',
    label: '无障碍辅助型高质量锚点',
    keywords: ['视障', '听障', '老人', '认知障碍', '无障碍', '提醒', '触觉', '盲文'],
    summary: 'A plush rabbit designed around an accessibility need, using tactile, sound, or interaction features to support a specific user group.',
    calibratedScores: { holistic: 5, originality: 6, usefulness: 6, elaboration: 5 },
    rationale: 'A concrete accessibility need can produce strong originality and usefulness when the function is tied to a real use barrier. Implementation must address reliability, safety, and user autonomy.',
    scoreGuidance: 'Reward concrete user-problem fit, but check feasibility and dignity of use.'
  },
  {
    id: 'HIGH_COHERENT_EXPERIENCE_RABBIT',
    level: 'high',
    label: '完整体验闭环型高质量锚点',
    keywords: ['流程', '触发', '反馈', '连续使用', '习惯', '记录', '互动闭环', '场景'],
    summary: 'A plush rabbit whose features form a coherent loop: user need, trigger, interaction, feedback, and continued use.',
    calibratedScores: { holistic: 5, originality: 6, usefulness: 6, elaboration: 5 },
    rationale: 'Coherence is a sign of developed creative product thinking. The score can be high when features are not simply listed but organized into an experience that users can repeatedly understand and use.',
    scoreGuidance: 'Use this anchor when the draft explains how functions work together as one product experience.'
  },
  {
    id: 'HIGH_FORM_BASED_RABBIT',
    level: 'high',
    label: '兔子形态深度利用型高质量锚点',
    keywords: ['耳朵', '肚子', '四肢', '尾巴', '柔软', '拥抱', '抱着', '形态', '结构'],
    summary: 'A concept that uses the rabbit body form itself, such as ears, belly, limbs, softness, hugging, or portability, as a functional part of the design.',
    calibratedScores: { holistic: 5, originality: 6, usefulness: 5, elaboration: 5 },
    rationale: 'Using the rabbit form as part of the mechanism is usually more original than attaching generic electronics. Scores depend on whether the form-function link is clear and useful.',
    scoreGuidance: 'Reward form-function integration when it is concrete and not merely decorative.'
  },
  {
    id: 'HIGH_SPECULATIVE_SYMBOLIC_RABBIT',
    level: 'high-risk',
    label: '概念象征型高新颖但实用限制锚点',
    keywords: ['象征', '纪念', '仪式', '艺术', '反讽', '玄学', '概念', '情感容器'],
    summary: 'A symbolic, artistic, ritual, or speculative plush rabbit concept.',
    calibratedScores: { holistic: 4, originality: 6, usefulness: 3, elaboration: 4 },
    rationale: 'Symbolic concepts can be original, but usefulness should be capped if the draft does not solve a concrete user problem or explain realistic value.',
    scoreGuidance: 'Allow high originality, but do not let symbolic novelty inflate holistic usefulness.'
  },
  {
    id: 'HIGH_RISK_MECHANICAL_WAKEUP_RABBIT',
    level: 'high-risk',
    label: '机械唤醒高新颖但风险限制锚点',
    keywords: ['弹射', '机械臂', '吸附', '轮子', '震动', '飞行', '撞墙', '赖床', '叫醒'],
    summary: 'A physically active plush rabbit that moves, shakes, pulls, or otherwise intervenes to wake or motivate the user.',
    calibratedScores: { holistic: 4, originality: 6, usefulness: 4, elaboration: 4 },
    rationale: 'Mechanical intervention can be imaginative and original, but it creates safety, disturbance, durability, acceptance, and maintenance risks. These risks must restrain holistic scoring unless fully addressed.',
    scoreGuidance: 'High originality is possible; holistic score should stay moderate if safety and context conflict are missing.'
  },
  {
    id: 'HIGH_SUSTAINABLE_MATERIAL_RABBIT',
    level: 'mid-high',
    label: '可持续材料型中高锚点',
    keywords: ['环保', '可回收', '旧衣服', '再生', '可降解', '材料', '循环'],
    summary: 'A plush rabbit redesigned around sustainable materials, repairability, or recycling.',
    calibratedScores: { holistic: 4, originality: 4, usefulness: 5, elaboration: 4 },
    rationale: 'Sustainable material use can be valuable, but originality depends on whether the material strategy changes the user experience or product life cycle rather than only adding an environmental label.',
    scoreGuidance: 'If environmental benefits are claimed without material or life-cycle details, cap usefulness and elaboration.'
  },
  {
    id: 'HIGH_MULTIUSER_CARE_RABBIT',
    level: 'high',
    label: '照护关系型高质量锚点',
    keywords: ['照护者', '家长', '老人', '儿童', '提醒', '陪护', '照顾', '远程'],
    summary: 'A plush rabbit that mediates a care relationship between a user and caregiver, parent, or family member.',
    calibratedScores: { holistic: 5, originality: 5, usefulness: 6, elaboration: 5 },
    rationale: 'A multi-user care relationship can make the product more meaningful than a single toy feature. It requires clear roles, interaction flow, privacy boundaries, and realistic use settings.',
    scoreGuidance: 'Reward role clarity and interaction flow; cap scores if privacy or reliability is missing.'
  }
];
