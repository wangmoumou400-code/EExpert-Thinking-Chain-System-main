export const taskRubric = `
Task-specific scoring rubric for the ordinary 30 cm plush rabbit product-improvement task.
The task asks participants to improve an ordinary plush rabbit so that it becomes more creative, useful, and attractive to users. The evaluation must compare the draft with ordinary plush rabbits, common decorative plush-toy improvements, and common smart companion toys.

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

export const commonThemes = [
  { id: 'music_sound', label: '声音/音乐/录音', keywords: ['唱歌', '音乐', '儿歌', '喇叭', '声音', '播放', '录音', '语音', '音频', '讲故事', '白噪音'] },
  { id: 'light_visual', label: '灯光/夜灯/发光', keywords: ['发光', '灯', '夜灯', '光', 'LED', '变色', '投影', '荧光'] },
  { id: 'warmth_sleep', label: '加热/睡眠/抱枕', keywords: ['加热', '发热', '暖手', '热敷', '睡眠', '助眠', '抱枕', '午睡', '被窝'] },
  { id: 'clothing_decoration', label: '换装/装饰/外观', keywords: ['换衣服', '衣服', '装饰', '花衣服', '蝴蝶结', '贴纸', 'DIY', '小卡', '刺绣', '颜色', '造型'] },
  { id: 'storage_pocket', label: '口袋/收纳', keywords: ['口袋', '收纳', '装东西', '拉链', '小包', '隐藏袋', '文具'] },
  { id: 'app_smart', label: 'APP/智能/蓝牙', keywords: ['APP', 'app', '蓝牙', '智能', '芯片', '传感器', 'AI', '算法', '云端', '小程序'] },
  { id: 'emotion_companion', label: '情绪陪伴/安抚', keywords: ['情绪', '陪伴', '孤独', '安抚', '焦虑', '压力', '治愈', '心理', '拥抱', '亲友'] },
  { id: 'alarm_wakeup', label: '闹钟/唤醒', keywords: ['闹钟', '唤醒', '叫醒', '早起', '赖床', '震动', '静音'] },
  { id: 'movement_mechanical', label: '运动/机械结构', keywords: ['轮子', '跑', '爬', '机械臂', '弹射', '飞行', '吸附', '马达', '旋转', '伸缩'] },
  { id: 'education_learning', label: '学习/记忆/词汇', keywords: ['学习', '背单词', '词汇', '复习', '真题', '知识', '教育', '考试', '学生'] },
  { id: 'medical_care', label: '医疗/护理/康复', keywords: ['患者', '术后', '医院', '病房', '伤口', '引流管', '康复', '疼痛', '过敏', '消毒', '护理'] },
  { id: 'privacy_recording', label: '隐私/数据/录音', keywords: ['录音', '摄像', '定位', '数据', '情绪识别', '麦克风', '隐私', '记录', '监测'] },
  { id: 'marketing_branding', label: '营销/包装/品牌话术', keywords: ['爆款', '网红', '高端', '联名', '品牌', '销量', '市场', '包装', '礼盒', '性价比'] }
];

export const riskRules = [
  {
    id: 'ELECTRONICS_POWER_SAFETY',
    label: '电子元件与供电安全',
    keywords: ['电池', '蓝牙', '芯片', '传感器', '马达', '震动', '发热', '加热', 'LED', '灯', '充电', '电路', 'APP', '智能'],
    rule: 'If electronics, heating, sensors, motors, or connected components are used but power supply, battery access, heat, cleaning, durability, maintenance, and manufacturing are not addressed, elaboration must not exceed 4, Implement must not exceed 3, and holistic score should usually not exceed 5.'
  },
  {
    id: 'CHILD_SAFETY',
    label: '儿童安全',
    keywords: ['儿童', '小朋友', '幼儿', '宝宝', '孩子', '3-8岁', '学龄前', '婴儿'],
    rule: 'For child-use products, if the draft includes small parts, batteries, detachable accessories, magnets, heat, sound, fragrance, straps, wheels, or electronics without age appropriateness, choking risk, material safety, cleaning, durability, and caregiver control, usefulness and elaboration must be capped and holistic score should not exceed 5.'
  },
  {
    id: 'PRIVACY_DATA',
    label: '隐私与数据',
    keywords: ['录音', '摄像', '麦克风', '定位', '数据', '上传', '云端', '情绪识别', 'AI识别', '监测', 'APP记录'],
    rule: 'For recording, sensing, AI, app, or personal-data functions, if consent, storage, deletion, misuse, reliability, and user control are not addressed, usefulness must not exceed 5 and elaboration must not exceed 4.'
  },
  {
    id: 'MEDICAL_HEALTH',
    label: '医疗健康与护理风险',
    keywords: ['患者', '术后', '医院', '病房', '伤口', '引流管', '康复', '疼痛', '过敏', '治疗', '医疗', '护理', '消毒', '感染'],
    rule: 'For medical, therapeutic, rehabilitation, hospital, hygiene, wound, or patient-care products, if medical-grade materials, cleaning/sterilization, infection control, pressure/traction risk, clinical boundaries, and regulatory feasibility are not addressed, do not assign full usefulness or elaboration; holistic score should not exceed 5.'
  },
  {
    id: 'PSYCHOLOGICAL_SUPPORT',
    label: '心理安抚与情绪支持',
    keywords: ['情绪', '孤独', '陪伴', '安抚', '焦虑', '压力', '抑郁', '治愈', '睡眠', '心理', '亲友录音'],
    rule: 'If the product claims emotional, psychological, sleep, or therapeutic benefits but lacks a concrete mechanism, boundaries of use, safety, dependence risk, and realistic effect explanation, usefulness must not exceed 5 and elaboration must not exceed 4.'
  },
  {
    id: 'MECHANICAL_FORCE',
    label: '机械运动与物理干预',
    keywords: ['轮子', '跑', '爬', '弹射', '机械臂', '吸附', '飞行', '螺旋桨', '震动', '电击', '拉扯', '推动', '撞'],
    rule: 'For mechanical, moving, forceful, or physically intrusive products, if safety, noise, user acceptance, durability, context disturbance, and failure modes are not addressed, do not let novelty dominate holistic scoring; holistic score should usually not exceed 4 or 5.'
  },
  {
    id: 'HYGIENE_CLEANING',
    label: '清洁维护',
    keywords: ['清洗', '水洗', '消毒', '短毛绒', '可拆卸', '汗', '口水', '床上', '医院', '幼儿园'],
    rule: 'For products used in beds, hospitals, schools, or close body contact, missing cleaning and maintenance details should lower elaboration and Implement scores.'
  },
  {
    id: 'OVERCLAIMING',
    label: '无证据效果宣称',
    keywords: ['降低', '治愈', '保证', '显著提升', '防止', '提高效率', '销量', '环保', '临床', '非计划拔管'],
    rule: 'If the draft claims clinical, educational, psychological, market, environmental, or cost effects without evidence or mechanism, mention unsupported overclaiming and cap usefulness/elaboration.'
  },
  {
    id: 'MARKETING_ONLY',
    label: '仅营销包装',
    keywords: ['爆款', '网红', '高端', '联名', '礼盒', '市场', '销量', '品牌', '宣传', '性价比'],
    rule: 'If the draft mainly relies on branding, packaging, market segmentation, or commercial slogans without a product mechanism, originality and usefulness should not exceed 4 and holistic score should not exceed 4.'
  }
];

export const lowQualityPatterns = [
  'Only adds one common feature such as music, light, warmth, clothing, pocket, or decoration.',
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
