import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi' | 'ar' | 'te';

export interface Translation {
  // App Title & Branding
  appName: string;
  tagline: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aiAnalysisTitle: string;
  aiAnalysisDesc: string;
  diseaseDetectionTitle: string;
  diseaseDetectionDesc: string;
  treatmentGuideTitle: string;
  treatmentGuideDesc: string;
  
  // Upload Section
  uploadTitle: string;
  uploadDescription: string;
  dropImageHere: string;
  orClickToBrowse: string;
  chooseFile: string;
  takePhoto: string;
  supportedFormats: string;
  
  // Analysis Section
  uploadedImage: string;
  analysis: string;
  readyToAnalyze: string;
  analyzeLeaf: string;
  uploadNewImage: string;
  analyzingLeaf: string;
  analyzingDescription: string;
  
  // Results Section
  diagnosisResults: string;
  confidence: string;
  severity: string;
  treatmentRecommendations: string;
  preventionTips: string;
  analyzeAnotherLeaf: string;
  saveDiagnosis: string;
  
  // Severity levels
  mild: string;
  moderate: string;
  severe: string;
}

const translations: Record<Language, Translation> = {
  en: {
    appName: "Plant Buddy",
    tagline: "Your AI-Powered Plant Health Companion",
    heroTitle: "Plant Buddy",
    heroSubtitle: "Your AI-Powered Plant Health Companion",
    heroDescription: "Transform your gardening experience with cutting-edge artificial intelligence. Simply upload a photo of your plant's leaf, and our advanced machine learning algorithms will instantly analyze it for diseases, nutrient deficiencies, and pest damage. Get personalized treatment recommendations, prevention strategies, and expert care tips to keep your green friends thriving year-round.",
    aiAnalysisTitle: "AI-Powered Analysis",
    aiAnalysisDesc: "Advanced machine learning algorithms",
    diseaseDetectionTitle: "Disease Detection",
    diseaseDetectionDesc: "Identify plant diseases & deficiencies",
    treatmentGuideTitle: "Treatment Guide",
    treatmentGuideDesc: "Personalized care & recovery plans",
    uploadTitle: "Upload Plant Leaf Image",
    uploadDescription: "Take a clear, well-lit photo of the affected leaf for the most accurate diagnosis. Our AI works best with high-resolution images showing the entire leaf surface.",
    dropImageHere: "Drop your image here",
    orClickToBrowse: "or click to browse from your device",
    chooseFile: "Choose File",
    takePhoto: "Take Photo",
    supportedFormats: "Supported formats: JPG, PNG, WEBP • Max size: 10MB",
    uploadedImage: "Uploaded Image",
    analysis: "Analysis",
    readyToAnalyze: "Ready to analyze your plant leaf for potential diseases, nutrient deficiencies, and pest damage.",
    analyzeLeaf: "Analyze Leaf",
    uploadNewImage: "Upload New Image",
    analyzingLeaf: "Analyzing leaf pattern...",
    analyzingDescription: "Our AI is examining the leaf for signs of disease, nutrient deficiencies, and pest damage...",
    diagnosisResults: "Diagnosis Results",
    confidence: "Confidence",
    severity: "Severity",
    treatmentRecommendations: "Treatment Recommendations",
    preventionTips: "Prevention Tips",
    analyzeAnotherLeaf: "Analyze Another Leaf",
    saveDiagnosis: "Save Diagnosis",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe"
  },
  es: {
    appName: "Plant Buddy",
    tagline: "Tu Compañero de Salud Vegetal con IA",
    heroTitle: "Plant Buddy",
    heroSubtitle: "Tu Compañero de Salud Vegetal con IA",
    heroDescription: "Transforma tu experiencia de jardinería con inteligencia artificial de vanguardia. Simplemente sube una foto de la hoja de tu planta, y nuestros algoritmos de aprendizaje automático la analizarán instantáneamente para detectar enfermedades, deficiencias nutricionales y daños por plagas. Obtén recomendaciones de tratamiento personalizadas, estrategias de prevención y consejos de cuidado experto para mantener a tus amigos verdes prósperos durante todo el año.",
    aiAnalysisTitle: "Análisis con IA",
    aiAnalysisDesc: "Algoritmos avanzados de aprendizaje automático",
    diseaseDetectionTitle: "Detección de Enfermedades",
    diseaseDetectionDesc: "Identifica enfermedades y deficiencias",
    treatmentGuideTitle: "Guía de Tratamiento",
    treatmentGuideDesc: "Planes personalizados de cuidado y recuperación",
    uploadTitle: "Subir Imagen de Hoja",
    uploadDescription: "Toma una foto clara y bien iluminada de la hoja afectada para el diagnóstico más preciso. Nuestra IA funciona mejor con imágenes de alta resolución que muestren toda la superficie de la hoja.",
    dropImageHere: "Suelta tu imagen aquí",
    orClickToBrowse: "o haz clic para buscar en tu dispositivo",
    chooseFile: "Elegir Archivo",
    takePhoto: "Tomar Foto",
    supportedFormats: "Formatos compatibles: JPG, PNG, WEBP • Tamaño máximo: 10MB",
    uploadedImage: "Imagen Subida",
    analysis: "Análisis",
    readyToAnalyze: "Listo para analizar la hoja de tu planta en busca de posibles enfermedades, deficiencias nutricionales y daños por plagas.",
    analyzeLeaf: "Analizar Hoja",
    uploadNewImage: "Subir Nueva Imagen",
    analyzingLeaf: "Analizando patrón de hoja...",
    analyzingDescription: "Nuestra IA está examinando la hoja en busca de signos de enfermedad, deficiencias nutricionales y daños por plagas...",
    diagnosisResults: "Resultados del Diagnóstico",
    confidence: "Confianza",
    severity: "Severidad",
    treatmentRecommendations: "Recomendaciones de Tratamiento",
    preventionTips: "Consejos de Prevención",
    analyzeAnotherLeaf: "Analizar Otra Hoja",
    saveDiagnosis: "Guardar Diagnóstico",
    mild: "Leve",
    moderate: "Moderado",
    severe: "Severo"
  },
  fr: {
    appName: "Plant Buddy",
    tagline: "Votre Compagnon de Santé Végétale IA",
    heroTitle: "Plant Buddy",
    heroSubtitle: "Votre Compagnon de Santé Végétale IA",
    heroDescription: "Transformez votre expérience de jardinage avec l'intelligence artificielle de pointe. Téléchargez simplement une photo de la feuille de votre plante, et nos algorithmes d'apprentissage automatique avancés l'analyseront instantanément pour détecter les maladies, les carences nutritionnelles et les dommages causés par les ravageurs. Obtenez des recommandations de traitement personnalisées, des stratégies de prévention et des conseils d'expert pour garder vos amis verts prospères toute l'année.",
    aiAnalysisTitle: "Analyse IA",
    aiAnalysisDesc: "Algorithmes d'apprentissage automatique avancés",
    diseaseDetectionTitle: "Détection de Maladies",
    diseaseDetectionDesc: "Identifie les maladies et carences",
    treatmentGuideTitle: "Guide de Traitement",
    treatmentGuideDesc: "Plans personnalisés de soins et récupération",
    uploadTitle: "Télécharger Image de Feuille",
    uploadDescription: "Prenez une photo claire et bien éclairée de la feuille affectée pour le diagnostic le plus précis. Notre IA fonctionne mieux avec des images haute résolution montrant toute la surface de la feuille.",
    dropImageHere: "Déposez votre image ici",
    orClickToBrowse: "ou cliquez pour parcourir depuis votre appareil",
    chooseFile: "Choisir Fichier",
    takePhoto: "Prendre Photo",
    supportedFormats: "Formats supportés: JPG, PNG, WEBP • Taille max: 10MB",
    uploadedImage: "Image Téléchargée",
    analysis: "Analyse",
    readyToAnalyze: "Prêt à analyser la feuille de votre plante pour détecter d'éventuelles maladies, carences nutritionnelles et dommages causés par les ravageurs.",
    analyzeLeaf: "Analyser Feuille",
    uploadNewImage: "Télécharger Nouvelle Image",
    analyzingLeaf: "Analyse du motif de feuille...",
    analyzingDescription: "Notre IA examine la feuille pour détecter des signes de maladie, de carences nutritionnelles et de dommages causés par les ravageurs...",
    diagnosisResults: "Résultats du Diagnostic",
    confidence: "Confiance",
    severity: "Sévérité",
    treatmentRecommendations: "Recommandations de Traitement",
    preventionTips: "Conseils de Prévention",
    analyzeAnotherLeaf: "Analyser Une Autre Feuille",
    saveDiagnosis: "Sauvegarder Diagnostic",
    mild: "Léger",
    moderate: "Modéré",
    severe: "Sévère"
  },
  de: {
    appName: "Plant Buddy",
    tagline: "Ihr KI-gestützter Pflanzengesundheits-Begleiter",
    heroTitle: "Plant Buddy",
    heroSubtitle: "Ihr KI-gestützter Pflanzengesundheits-Begleiter",
    heroDescription: "Verwandeln Sie Ihre Gartenerfahrung mit modernster künstlicher Intelligenz. Laden Sie einfach ein Foto des Blattes Ihrer Pflanze hoch, und unsere fortschrittlichen maschinellen Lernalgorithmen analysieren es sofort auf Krankheiten, Nährstoffmängel und Schädlingsschäden. Erhalten Sie personalisierte Behandlungsempfehlungen, Präventionsstrategien und Expertenpflegetipps, um Ihre grünen Freunde das ganze Jahr über gedeihen zu lassen.",
    aiAnalysisTitle: "KI-Analyse",
    aiAnalysisDesc: "Fortschrittliche maschinelle Lernalgorithmen",
    diseaseDetectionTitle: "Krankheitserkennung",
    diseaseDetectionDesc: "Identifiziert Pflanzenkrankheiten & Mängel",
    treatmentGuideTitle: "Behandlungsleitfaden",
    treatmentGuideDesc: "Personalisierte Pflege- & Erholungspläne",
    uploadTitle: "Pflanzenblatt-Bild Hochladen",
    uploadDescription: "Machen Sie ein klares, gut beleuchtetes Foto des betroffenen Blattes für die genaueste Diagnose. Unsere KI funktioniert am besten mit hochauflösenden Bildern, die die gesamte Blattoberfläche zeigen.",
    dropImageHere: "Bild hier ablegen",
    orClickToBrowse: "oder klicken Sie, um von Ihrem Gerät zu durchsuchen",
    chooseFile: "Datei Wählen",
    takePhoto: "Foto Aufnehmen",
    supportedFormats: "Unterstützte Formate: JPG, PNG, WEBP • Max. Größe: 10MB",
    uploadedImage: "Hochgeladenes Bild",
    analysis: "Analyse",
    readyToAnalyze: "Bereit, Ihr Pflanzenblatt auf mögliche Krankheiten, Nährstoffmängel und Schädlingsschäden zu analysieren.",
    analyzeLeaf: "Blatt Analysieren",
    uploadNewImage: "Neues Bild Hochladen",
    analyzingLeaf: "Analysiere Blattmuster...",
    analyzingDescription: "Unsere KI untersucht das Blatt auf Anzeichen von Krankheiten, Nährstoffmängeln und Schädlingsschäden...",
    diagnosisResults: "Diagnoseergebnisse",
    confidence: "Vertrauen",
    severity: "Schweregrad",
    treatmentRecommendations: "Behandlungsempfehlungen",
    preventionTips: "Präventionshinweise",
    analyzeAnotherLeaf: "Anderes Blatt Analysieren",
    saveDiagnosis: "Diagnose Speichern",
    mild: "Leicht",
    moderate: "Mäßig",
    severe: "Schwer"
  },
  zh: {
    appName: "Plant Buddy",
    tagline: "您的AI植物健康伙伴",
    heroTitle: "Plant Buddy",
    heroSubtitle: "您的AI植物健康伙伴",
    heroDescription: "通过尖端人工智能技术改变您的园艺体验。只需上传植物叶片的照片，我们先进的机器学习算法将立即分析疾病、营养缺乏和害虫损害。获得个性化治疗建议、预防策略和专家护理提示，让您的绿色朋友全年茁壮成长。",
    aiAnalysisTitle: "AI分析",
    aiAnalysisDesc: "先进的机器学习算法",
    diseaseDetectionTitle: "疾病检测",
    diseaseDetectionDesc: "识别植物疾病和缺陷",
    treatmentGuideTitle: "治疗指南",
    treatmentGuideDesc: "个性化护理和恢复计划",
    uploadTitle: "上传植物叶片图像",
    uploadDescription: "拍摄受影响叶片的清晰、光线充足的照片以获得最准确的诊断。我们的AI在显示整个叶片表面的高分辨率图像上效果最佳。",
    dropImageHere: "将图像拖放到这里",
    orClickToBrowse: "或单击从设备浏览",
    chooseFile: "选择文件",
    takePhoto: "拍照",
    supportedFormats: "支持的格式：JPG、PNG、WEBP • 最大大小：10MB",
    uploadedImage: "已上传图像",
    analysis: "分析",
    readyToAnalyze: "准备分析您的植物叶片是否存在潜在疾病、营养缺乏和害虫损害。",
    analyzeLeaf: "分析叶片",
    uploadNewImage: "上传新图像",
    analyzingLeaf: "正在分析叶片模式...",
    analyzingDescription: "我们的AI正在检查叶片是否有疾病、营养缺乏和害虫损害的迹象...",
    diagnosisResults: "诊断结果",
    confidence: "可信度",
    severity: "严重程度",
    treatmentRecommendations: "治疗建议",
    preventionTips: "预防提示",
    analyzeAnotherLeaf: "分析另一片叶子",
    saveDiagnosis: "保存诊断",
    mild: "轻微",
    moderate: "中度",
    severe: "严重"
  },
  hi: {
    appName: "Plant Buddy",
    tagline: "आपका AI-संचालित पौधे स्वास्थ्य साथी",
    heroTitle: "Plant Buddy",
    heroSubtitle: "आपका AI-संचालित पौधे स्वास्थ्य साथी",
    heroDescription: "अत्याधुनिक कृत्रिम बुद्धिमत्ता के साथ अपने बागवानी अनुभव को बदलें। बस अपने पौधे की पत्ती की एक तस्वीर अपलोड करें, और हमारे उन्नत मशीन लर्निंग एल्गोरिदम तुरंत बीमारियों, पोषक तत्वों की कमी और कीट क्षति के लिए इसका विश्लेषण करेंगे। व्यक्तिगत उपचार सिफारिशें, रोकथाम रणनीतियां और विशेषज्ञ देखभाल युक्तियां प्राप्त करें ताकि आपके हरे मित्र साल भर फलते-फूलते रहें।",
    aiAnalysisTitle: "AI विश्लेषण",
    aiAnalysisDesc: "उन्नत मशीन लर्निंग एल्गोरिदम",
    diseaseDetectionTitle: "रोग पहचान",
    diseaseDetectionDesc: "पौधों की बीमारियों और कमियों की पहचान",
    treatmentGuideTitle: "उपचार गाइड",
    treatmentGuideDesc: "व्यक्तिगत देखभाल और रिकवरी योजनाएं",
    uploadTitle: "पौधे की पत्ती की छवि अपलोड करें",
    uploadDescription: "सबसे सटीक निदान के लिए प्रभावित पत्ती की स्पष्ट, अच्छी रोशनी वाली तस्वीर लें। हमारा AI उच्च रिज़ॉल्यूशन छवियों के साथ सबसे अच्छा काम करता है जो पूरी पत्ती की सतह दिखाती हैं।",
    dropImageHere: "अपनी छवि यहाँ छोड़ें",
    orClickToBrowse: "या अपने डिवाइस से ब्राउज़ करने के लिए क्लिक करें",
    chooseFile: "फ़ाइल चुनें",
    takePhoto: "फोटो लें",
    supportedFormats: "समर्थित प्रारूप: JPG, PNG, WEBP • अधिकतम आकार: 10MB",
    uploadedImage: "अपलोड की गई छवि",
    analysis: "विश्लेषण",
    readyToAnalyze: "संभावित बीमारियों, पोषक तत्वों की कमी और कीट क्षति के लिए आपकी पौधे की पत्ती का विश्लेषण करने के लिए तैयार।",
    analyzeLeaf: "पत्ती का विश्लेषण करें",
    uploadNewImage: "नई छवि अपलोड करें",
    analyzingLeaf: "पत्ती के पैटर्न का विश्लेषण कर रहे हैं...",
    analyzingDescription: "हमारा AI पत्ती में बीमारी, पोषक तत्वों की कमी और कीट क्षति के संकेतों की जांच कर रहा है...",
    diagnosisResults: "निदान परिणाम",
    confidence: "विश्वास",
    severity: "गंभीरता",
    treatmentRecommendations: "उपचार सिफारिशें",
    preventionTips: "रोकथाम युक्तियां",
    analyzeAnotherLeaf: "दूसरी पत्ती का विश्लेषण करें",
    saveDiagnosis: "निदान सहेजें",
    mild: "हल्का",
    moderate: "मध्यम",
    severe: "गंभीर"
  },
  ar: {
    appName: "Plant Buddy",
    tagline: "رفيقك لصحة النباتات بالذكاء الاصطناعي",
    heroTitle: "Plant Buddy",
    heroSubtitle: "رفيقك لصحة النباتات بالذكاء الاصطناعي",
    heroDescription: "حوّل تجربة البستنة الخاصة بك بالذكاء الاصطناعي المتطور. ما عليك سوى تحميل صورة لورقة نباتك، وستقوم خوارزميات التعلم الآلي المتقدمة لدينا بتحليلها فوراً للكشف عن الأمراض ونقص المغذيات وأضرار الآفات. احصل على توصيات علاجية مخصصة واستراتيجيات وقائية ونصائح رعاية خبراء للحفاظ على أصدقائك الخضر مزدهرين طوال العام.",
    aiAnalysisTitle: "تحليل بالذكاء الاصطناعي",
    aiAnalysisDesc: "خوارزميات تعلم آلي متقدمة",
    diseaseDetectionTitle: "كشف الأمراض",
    diseaseDetectionDesc: "تحديد أمراض النباتات والنقص",
    treatmentGuideTitle: "دليل العلاج",
    treatmentGuideDesc: "خطط رعاية وتعافي مخصصة",
    uploadTitle: "تحميل صورة ورقة النبات",
    uploadDescription: "التقط صورة واضحة ومضاءة جيداً للورقة المصابة للحصول على أدق تشخيص. يعمل الذكاء الاصطناعي لدينا بشكل أفضل مع الصور عالية الدقة التي تُظهر سطح الورقة بالكامل.",
    dropImageHere: "اسقط صورتك هنا",
    orClickToBrowse: "أو انقر للتصفح من جهازك",
    chooseFile: "اختر ملف",
    takePhoto: "التقط صورة",
    supportedFormats: "الصيغ المدعومة: JPG, PNG, WEBP • الحد الأقصى للحجم: 10MB",
    uploadedImage: "الصورة المحملة",
    analysis: "التحليل",
    readyToAnalyze: "جاهز لتحليل ورقة نباتك للكشف عن الأمراض المحتملة ونقص المغذيات وأضرار الآفات.",
    analyzeLeaf: "تحليل الورقة",
    uploadNewImage: "تحميل صورة جديدة",
    analyzingLeaf: "تحليل نمط الورقة...",
    analyzingDescription: "يفحص الذكاء الاصطناعي لدينا الورقة بحثاً عن علامات المرض ونقص المغذيات وأضرار الآفات...",
    diagnosisResults: "نتائج التشخيص",
    confidence: "الثقة",
    severity: "الشدة",
    treatmentRecommendations: "توصيات العلاج",
    preventionTips: "نصائح الوقاية",
    analyzeAnotherLeaf: "تحليل ورقة أخرى",
    saveDiagnosis: "حفظ التشخيص",
    mild: "خفيف",
    moderate: "متوسط",
    severe: "شديد"
  },
  te: {
    appName: "Plant Buddy",
    tagline: "మీ AI-శక్తితో కూడిన మొక్కల ఆరోగ్య సహాయకుడు",
    heroTitle: "Plant Buddy",
    heroSubtitle: "మీ AI-శక్తితో కూడిన మొక్కల ఆరోగ్య సహాయకుడు",
    heroDescription: "అత్యాధునిక కృత్రిమ మేధస్సుతో మీ తోటపని అనుభవాన్ని మార్చండి. మీ మొక్క యొక్క ఆకు యొక్క ఫోటోను అప్‌లోడ్ చేయండి, మరియు మా అధునాతన మెషిన్ లెర్నింగ్ అల్గరిథంలు వ్యాధులు, పోషకాహార లోపాలు మరియు పేడ నష్టం కోసం తక్షణమే విశ్లేషిస్తాయి. మీ ఆకుపచ్చ స్నేహితులను ఏడాది పొడవునా వృద్ధిచెందేలా చేయడానికి వ్యక్తిగతీకరించిన చికిత్స సిఫార్సులు, నివారణ వ్యూహాలు మరియు నిపుణుల సంరక్షణ చిట్కాలను పొందండి.",
    aiAnalysisTitle: "AI విశ్లేషణ",
    aiAnalysisDesc: "అధునాతన మెషిన్ లెర్నింగ్ అల్గరిథంలు",
    diseaseDetectionTitle: "వ్యాధి గుర్తింపు",
    diseaseDetectionDesc: "మొక్కల వ్యాధులు మరియు లోపాలను గుర్తించండి",
    treatmentGuideTitle: "చికిత్స గైడ్",
    treatmentGuideDesc: "వ్యక్తిగతీకరించిన సంరక్షణ మరియు పునరుద్ధరణ ప్రణాళికలు",
    uploadTitle: "మొక్క ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి",
    uploadDescription: "అత్యంత ఖచ్చితమైన రోగ నిర్ధారణ కోసం ప్రభావిత ఆకు యొక్క స్పష్టమైన, బాగా వెలుగుతున్న ఫోటో తీయండి. మా AI మొత్తం ఆకు ఉపరితలాన్ని చూపించే అధిక రిజల్యూషన్ చిత్రాలతో ఉత్తమంగా పనిచేస్తుంది.",
    dropImageHere: "మీ చిత్రాన్ని ఇక్కడ వదలండి",
    orClickToBrowse: "లేదా మీ పరికరం నుండి బ్రౌజ్ చేయడానికి క్లిక్ చేయండి",
    chooseFile: "ఫైల్ ఎంచుకోండి",
    takePhoto: "ఫోటో తీయండి",
    supportedFormats: "మద్దతు ఉన్న ఫార్మాట్‌లు: JPG, PNG, WEBP • గరిష్ట పరిమాణం: 10MB",
    uploadedImage: "అప్‌లోడ్ చేయబడిన చిత్రం",
    analysis: "విశ్లేషణ",
    readyToAnalyze: "సంభావ్య వ్యాధులు, పోషకాహార లోపాలు మరియు పేడ నష్టం కోసం మీ మొక్క ఆకును విశ్లేషించడానికి సిద్ధంగా ఉంది.",
    analyzeLeaf: "ఆకును విశ్లేషించండి",
    uploadNewImage: "కొత్త చిత్రాన్ని అప్‌లోడ్ చేయండి",
    analyzingLeaf: "ఆకు నమూనాను విశ్లేషిస్తోంది...",
    analyzingDescription: "మా AI వ్యాధి, పోషకాహార లోపాలు మరియు పేడ నష్టం యొక్క సంకేతాల కోసం ఆకును పరిశీలిస్తోంది...",
    diagnosisResults: "రోగ నిర్ధారణ ఫలితాలు",
    confidence: "విశ్వాసం",
    severity: "తీవ్రత",
    treatmentRecommendations: "చికిత్స సిఫార్సులు",
    preventionTips: "నివారణ చిట్కాలు",
    analyzeAnotherLeaf: "మరొక ఆకును విశ్లేషించండి",
    saveDiagnosis: "రోగ నిర్ధారణను సేవ్ చేయండి",
    mild: "తేలిక",
    moderate: "మధ్యస్థ",
    severe: "తీవ్రమైన"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
