// DOLGO Verbal System - 한국어 UX Writing 친근한 톤 변환 플러그인
// 사용자가 선택한 텍스트 노드의 문장을 분석하고 한국어 UX Writing 친근한 톤으로 변경합니다.

// UI 표시
figma.showUI(__html__, { width: 450, height: 600 });

// UX Writing 패턴 정의
interface UXPattern {
  pattern: string;
  replacement: string;
  description: string;
  category: 'command' | 'ending' | 'formal' | 'negative' | 'complex';
}

// 한국어 UX Writing 친근한 톤 변환 패턴
const uxPatterns: UXPattern[] = [
  // 돌고만의 기본 용어 시스템 반영
  { pattern: "나눔", replacement: "기부", description: "기부를 일관되게 표현하기 ", category: "command" },
  { pattern: "후원", replacement: "기부", description: "기부를 일관되게 표현하기 ", category: "command" },
  { pattern: "함께하기", replacement: "기부", description: "기부를 일관되게 표현하기 ", category: "command" },
  { pattern: "나눔", replacement: "배분", description: "기부금 전달 과정 일관되게 표현하기 ", category: "command" },
  { pattern: "정기모금", replacement: "정기사연", description: "모금과 사연 개념 구분", category: "command" },
  { pattern: "일시모금", replacement: "일시사연", description: "모금과 사연 개념 구분", category: "command" },
  { pattern: "메시지", replacement: "댓글", description: "메시지와 댓글 개념 구분", category: "command" },
  { pattern: "설립", replacement: "개설", description: "설립과 개설 개념 구분", category: "command" },
  { pattern: "재단", replacement: "기부재단", description: "기부재단은 줄여쓰지 않기", category: "command" },
    
  // 명령형 → 친근한 제안형
  { pattern: "확인해보세요", replacement: "확인하기", description: "친근한 어조", category: "command" },
  { pattern: "이용해보세요", replacement: "이용하기", description: "간결한 표현", category: "command" },
  { pattern: "참여해보세요", replacement: "참여하기", description: "직접적 유도", category: "command" },
  { pattern: "신청해보세요", replacement: "신청하기", description: "간편함 강조", category: "command" },
  { pattern: "문의해보세요", replacement: "문의하기", description: "쉬운 접근", category: "command" },
  { pattern: "클릭하세요", replacement: "클릭하기", description: "직관적 행동", category: "command" },
  { pattern: "입력하세요", replacement: "입력하기", description: "간단한 안내", category: "command" },
  { pattern: "선택하세요", replacement: "선택하기", description: "자유로운 선택", category: "command" },
  { pattern: "다운로드하세요", replacement: "다운로드하기", description: "편리한 다운로드", category: "command" },
  { pattern: "업로드하세요", replacement: "업로드하기", description: "간편한 업로드", category: "command" },
  { pattern: "저장하세요", replacement: "저장하기", description: "안전한 저장", category: "command" },
  { pattern: "삭제하세요", replacement: "삭제하기", description: "확실한 삭제", category: "command" },
  { pattern: "수정하세요", replacement: "수정하기", description: "쉬운 수정", category: "command" },
  { pattern: "등록하세요", replacement: "등록하기", description: "빠른 등록", category: "command" },
  { pattern: "연락하세요", replacement: "연락하기", description: "편한 연락", category: "command" },
  { pattern: "찾아보세요", replacement: "찾아보기", description: "쉬운 검색", category: "command" },
  { pattern: "살펴보세요", replacement: "살펴보기", description: "자세한 확인", category: "command" },
  { pattern: "검색하세요", replacement: "검색하기", description: "빠른 검색", category: "command" },
  { pattern: "이동하세요", replacement: "이동하기", description: "간편한 이동", category: "command" },
  { pattern: "돌아가세요", replacement: "돌아가기", description: "쉬운 복귀", category: "command" },
  { pattern: "나가세요", replacement: "나가기", description: "편한 종료", category: "command" },
  { pattern: "닫으세요", replacement: "닫기", description: "간단한 닫기", category: "command" },
  { pattern: "열어보세요", replacement: "열어보기", description: "쉬운 열기", category: "command" },
  { pattern: "보내세요", replacement: "보내기", description: "빠른 전송", category: "command" },
  { pattern: "받으세요", replacement: "받기", description: "편한 수신", category: "command" },
  { pattern: "공유하세요", replacement: "공유하기", description: "쉬운 공유", category: "command" },
  { pattern: "추천하세요", replacement: "추천하기", description: "편한 추천", category: "command" },
  { pattern: "평가하세요", replacement: "평가하기", description: "간단한 평가", category: "command" },
  { pattern: "리뷰하세요", replacement: "리뷰하기", description: "쉬운 리뷰", category: "command" },
  { pattern: "알려주세요", replacement: "알려주기", description: "편한 안내", category: "command" },
  { pattern: "설정하세요", replacement: "설정하기", description: "간편한 설정", category: "command" },
  { pattern: "변경하세요", replacement: "변경하기", description: "쉬운 변경", category: "command" },
  { pattern: "업데이트하세요", replacement: "업데이트하기", description: "편한 업데이트", category: "command" },
  { pattern: "새로고침하세요", replacement: "새로고침하기", description: "빠른 새로고침", category: "command" },
  { pattern: "다시하세요", replacement: "다시하기", description: "간단한 재시도", category: "command" },
  { pattern: "취소하세요", replacement: "취소하기", description: "편한 취소", category: "command" },
  { pattern: "완료하세요", replacement: "완료하기", description: "확실한 완료", category: "command" },
  { pattern: "시작하세요", replacement: "시작하기", description: "쉬운 시작", category: "command" },
  { pattern: "종료하세요", replacement: "종료하기", description: "편한 종료", category: "command" },
  { pattern: "중단하세요", replacement: "중단하기", description: "간단한 중단", category: "command" },
  { pattern: "계속하세요", replacement: "계속하기", description: "편한 계속", category: "command" },
  { pattern: "다음하세요", replacement: "다음하기", description: "쉬운 진행", category: "command" },
  { pattern: "이전하세요", replacement: "이전하기", description: "편한 복귀", category: "command" },
  
  // 격식체 → 친근체
  { pattern: "합니다", replacement: "해요", description: "친근한 행동", category: "ending" },
  { pattern: "됩니다", replacement: "돼요", description: "친근한 확인", category: "ending" },
  { pattern: "있습니다", replacement: "있어요", description: "친근한 안내", category: "ending" },
  { pattern: "없습니다", replacement: "없어요", description: "부드러운 부정", category: "ending" },
  { pattern: "입니다", replacement: "이에요", description: "부드러운 설명", category: "ending" },
  
  // 격식적 표현 → 친근한 표현
  { pattern: "하시면", replacement: "하면", description: "간결한 조건", category: "formal" },
  { pattern: "하십시오", replacement: "해주세요", description: "정중한 요청", category: "formal" },
  { pattern: "하시기", replacement: "하기", description: "간단한 안내", category: "formal" },
  
  // 부정적 표현 → 긍정적 표현
  { pattern: "실패했습니다", replacement: "다시 시도해보세요", description: "긍정적 제안", category: "negative" },
  { pattern: "오류가 발생했습니다", replacement: "잠시 후 다시 시도해보세요", description: "친근한 안내", category: "negative" },
  { pattern: "문제가 있습니다", replacement: "도움이 필요하시면 문의해주세요", description: "도움 제안", category: "negative" },
  { pattern: "불가능합니다", replacement: "다른 방법을 시도해보세요", description: "대안 제시", category: "negative" },
  { pattern: "제한됩니다", replacement: "더 많은 기능을 사용해보세요", description: "기능 안내", category: "negative" },
  
  // 복잡한 표현 → 간단한 표현
  { pattern: "사용자 인증이 필요합니다", replacement: "로그인이 필요해요", description: "간단한 설명", category: "complex" },
  { pattern: "시스템 점검 중입니다", replacement: "잠시만 기다려주세요", description: "친근한 안내", category: "complex" },
  { pattern: "서버에 연결할 수 없습니다", replacement: "인터넷 연결을 확인해주세요", description: "해결 방법 제시", category: "complex" },
  { pattern: "데이터를 불러올 수 없습니다", replacement: "새로고침해보세요", description: "간단한 해결책", category: "complex" },
  { pattern: "권한이 부족합니다", replacement: "관리자에게 문의해주세요", description: "도움 요청", category: "complex" }
];

// 자주 나오는 어미 패턴 분석
const endingPatterns: { [key: string]: string } = {
  '하세요': '하기',
  '해보세요': '해보기', 
  '확인하세요': '확인하기',
  '이용하세요': '이용하기',
  '참여하세요': '참여하기',
  '신청하세요': '신청하기',
  '문의하세요': '문의하기',
  '됩니다': '돼요',
  '입니다': '이에요',
  '있습니다': '있어요'
};

// 문장 스타일 분석
interface SentenceAnalysis {
  type: '명령문' | '의문문' | '서술문';
  confidence: number;
}

// 감정 분석
interface EmotionAnalysis {
  tone: 'neutral' | 'enthusiastic' | 'friendly' | 'professional' | 'playful';
  confidence: number;
}

// 키워드 분석
interface KeywordAnalysis {
  keywords: string[];
  frequency: { [key: string]: number };
}

// UX Tone 프로파일
interface UXToneProfile {
  sentenceStyle: SentenceAnalysis;
  emotion: EmotionAnalysis;
  keywords: KeywordAnalysis;
  suggestions: string[];
  overallTone: string;
  patterns: UXPattern[];
}

// 텍스트 분석 함수
function analyzeText(text: string): UXToneProfile {
  const sentences = text.split(/[.!?。！？]/).filter(s => s.trim().length > 0);
  
  // 문장 스타일 분석
  const sentenceStyle: SentenceAnalysis = analyzeSentenceStyle(text);
  
  // 감정 분석
  const emotion: EmotionAnalysis = analyzeEmotion(text);
  
  // 키워드 분석
  const keywords: KeywordAnalysis = analyzeKeywords(text);
  
  // 적용 가능한 패턴 찾기
  const patterns = findApplicablePatterns(text);
  
  // 제안사항 생성
  const suggestions = generateSuggestions(sentenceStyle, emotion, keywords, patterns);
  
  // 전체 톤 평가
  const overallTone = evaluateOverallTone(sentenceStyle, emotion);
  
  return {
    sentenceStyle,
    emotion,
    keywords,
    suggestions,
    overallTone,
    patterns
  };
}

// 문장 스타일 분석
function analyzeSentenceStyle(text: string): SentenceAnalysis {
  const commandPatterns = /(하세요|해보세요|하시기|하십시오|하라|해라|하자|해보자)/g;
  const questionPatterns = /(입니까|습니까|인가요|인가|할까요|할까|뭔가|무엇인가)/g;
  
  const commandMatches = text.match(commandPatterns) || [];
  const questionMatches = text.match(questionPatterns) || [];
  
  if (commandMatches.length > questionMatches.length) {
    return { type: '명령문', confidence: Math.min(0.9, 0.5 + commandMatches.length * 0.1) };
  } else if (questionMatches.length > 0) {
    return { type: '의문문', confidence: Math.min(0.9, 0.5 + questionMatches.length * 0.1) };
  } else {
    return { type: '서술문', confidence: 0.8 };
  }
}

// 감정 분석 (개선된 버전)
function analyzeEmotion(text: string): EmotionAnalysis {
  const emotionKeywords = {
    enthusiastic: ['설렘', '최고', '특가', '대박', '놀라운', '환상', '완벽', '!', '✨', '🎉', '🔥'],
    friendly: ['함께', '나만의', '여러분', '친구', '가족', '편안', '따뜻', '해요', '돼요', '있어요', '이에요'],
    professional: ['서비스', '품질', '전문', '안전', '신뢰', '보장', '관리', '합니다', '됩니다', '있습니다'],
    playful: ['재미', '즐거운', 'ㅋ', '귀여운', '신나는', '웃음', '놀이', '😊', '😄', '🎈']
  };
  
  const scores = {
    enthusiastic: 0,
    friendly: 0,
    professional: 0,
    playful: 0
  };
  
  // 각 감정 키워드 검사
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    for (const keyword of keywords) {
      const regex = new RegExp(keyword, 'g');
      const matches = text.match(regex) || [];
      scores[emotion as keyof typeof scores] += matches.length;
    }
  }
  
  // 가장 높은 점수의 감정 선택
  const maxScore = Math.max(...Object.values(scores));
  const dominantEmotion = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) as keyof typeof scores;
  
  // 신뢰도 계산
  const totalKeywords = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const confidence = totalKeywords > 0 ? Math.min(0.9, 0.3 + (maxScore / totalKeywords) * 0.6) : 0.5;
  
  return { 
    tone: dominantEmotion as 'neutral' | 'enthusiastic' | 'friendly' | 'professional' | 'playful', 
    confidence 
  };
}

// 키워드 분석
function analyzeKeywords(text: string): KeywordAnalysis {
  const words = text.replace(/[^\w\s가-힣]/g, ' ').split(/\s+/).filter(word => word.length > 1);
  const frequency: { [key: string]: number } = {};
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  const keywords = Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
  
  return { keywords, frequency };
}

// 적용 가능한 패턴 찾기
function findApplicablePatterns(text: string): UXPattern[] {
  return uxPatterns.filter(pattern => {
    const regex = new RegExp(escapeRegExp(pattern.pattern), 'g');
    return regex.test(text);
  });
}

// 제안사항 생성
function generateSuggestions(sentenceStyle: SentenceAnalysis, emotion: EmotionAnalysis, keywords: KeywordAnalysis, patterns: UXPattern[]): string[] {
  const suggestions: string[] = [];
  
  if (sentenceStyle.type === '명령문' && emotion.tone !== 'friendly') {
    suggestions.push('명령형을 친근한 제안형으로 변경하는 것을 권장합니다');
  }
  
  if (emotion.tone === 'professional') {
    suggestions.push('격식체를 친근체로 변경하여 사용자 친화적인 톤을 만드는 것을 권장합니다');
  }
  
  if (patterns.length > 0) {
    const categories = [...new Set(patterns.map(p => p.category))];
    suggestions.push(`${categories.length}가지 유형의 개선 패턴이 적용 가능합니다`);
  }
  
  if (keywords.keywords.length > 0) {
    suggestions.push(`주요 키워드 "${keywords.keywords.slice(0, 3).join(', ')}"를 활용한 일관된 메시지를 유지하세요`);
  }
  
  return suggestions;
}

// 전체 톤 평가
function evaluateOverallTone(sentenceStyle: SentenceAnalysis, emotion: EmotionAnalysis): string {
  if (emotion.tone === 'friendly' && sentenceStyle.type !== '명령문') {
    return '친근하고 사용자 친화적인 톤';
  } else if (emotion.tone === 'enthusiastic') {
    return '열정적이고 매력적인 톤';
  } else if (emotion.tone === 'professional') {
    return '전문적이고 신뢰할 수 있는 톤';
  } else if (emotion.tone === 'playful') {
    return '재미있고 경쾌한 톤';
  } else if (sentenceStyle.type === '명령문') {
    return '명령적이고 지시적인 톤';
  } else {
    return '중립적이고 정보 전달 중심의 톤';
  }
}

// 텍스트를 친근한 톤으로 변환하는 함수
function convertToFriendlyTone(text: string): string {
  let convertedText = text;
  
  // UX 패턴에 따른 변환
  for (const pattern of uxPatterns) {
    const regex = new RegExp(escapeRegExp(pattern.pattern), 'g');
    convertedText = convertedText.replace(regex, pattern.replacement);
  }
  
  // 어미 패턴에 따른 변환
  for (const [formal, friendly] of Object.entries(endingPatterns)) {
    const regex = new RegExp(escapeRegExp(formal), 'g');
    convertedText = convertedText.replace(regex, friendly);
  }
  
  // 추가적인 친근한 톤 변환 규칙
  convertedText = convertedText
    // 명령형 종결어미를 친근한 제안형으로
    .replace(/세요$/g, '해보세요')
    .replace(/하세요$/g, '해보세요')
    .replace(/보세요$/g, '보세요')
    
    // 격식체를 친근체로
    .replace(/습니다/g, '어요')
    .replace(/니다/g, '어요')
    
    // 부정적 표현을 긍정적으로
    .replace(/하지 마세요/g, '하지 않아도 돼요')
    .replace(/불가능합니다/g, '어려울 수 있어요')
    .replace(/문제가 있습니다/g, '개선이 필요해요');
  
  return convertedText;
}

// 정규식 특수문자 이스케이프 함수
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 선택된 텍스트 노드들을 분석
function analyzeSelectedTextNodes(): UXToneProfile[] {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('텍스트 노드를 선택해주세요!');
    return [];
  }
  
  const profiles: UXToneProfile[] = [];
  
  for (const node of selection) {
    if (node.type === 'TEXT') {
      const textNode = node as TextNode;
      
      if (textNode.hasMissingFont) {
        figma.notify('폰트가 누락된 텍스트가 있습니다. 폰트를 로드해주세요.');
        continue;
      }
      
      const text = textNode.characters;
      const profile = analyzeText(text);
      profiles.push(profile);
    }
  }
  
  return profiles;
}

// 선택된 텍스트 노드들을 친근한 톤으로 변환
function convertSelectedTextNodes() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('텍스트 노드를 선택해주세요!');
    return;
  }
  
  let convertedCount = 0;
  
  for (const node of selection) {
    if (node.type === 'TEXT') {
      const textNode = node as TextNode;
      
      if (textNode.hasMissingFont) {
        figma.notify('폰트가 누락된 텍스트가 있습니다. 폰트를 로드해주세요.');
        continue;
      }
      
      const originalText = textNode.characters;
      const convertedText = convertToFriendlyTone(originalText);
      
      if (originalText !== convertedText) {
        textNode.characters = convertedText;
        convertedCount++;
      }
    }
  }
  
  if (convertedCount > 0) {
    figma.notify(`${convertedCount}개의 텍스트가 친근한 톤으로 변경되었습니다!`);
  } else {
    figma.notify('변경할 텍스트가 없습니다.');
  }
}

// 선택한 Frame들의 텍스트 노드를 친근한 톤으로 변환
async function convertSelectedFramesTextNodes(selectedFrameIds: string[]) {
  if (selectedFrameIds.length === 0) {
    figma.notify('선택된 Frame이 없습니다.');
    return;
  }
  
  let convertedCount = 0;
  
  for (const frameId of selectedFrameIds) {
    const frameNode = figma.currentPage.findOne(node => node.id === frameId);
    
    if (!frameNode) {
      continue;
    }
    
    const textNodes = findAllTextNodes(frameNode);
    
    for (const textNode of textNodes) {
      if (textNode.hasMissingFont) {
        continue;
      }
      
      // 폰트 로드
      await loadFontsForTextNode(textNode);
      
      const originalText = textNode.characters;
      const convertedText = convertToFriendlyTone(originalText);
      
      if (originalText !== convertedText) {
        try {
          textNode.characters = convertedText;
          convertedCount++;
        } catch (error) {
          console.error('텍스트 변경 실패:', error);
        }
      }
    }
  }
  
  if (convertedCount > 0) {
    figma.notify(`${convertedCount}개의 텍스트가 친근한 톤으로 변경되었습니다!`);
  } else {
    figma.notify('변경할 텍스트가 없습니다.');
  }
}

// 모든 텍스트 노드를 친근한 톤으로 변환
async function convertAllTextNodes() {
  const textNodes = figma.currentPage.findAll(node => node.type === 'TEXT') as TextNode[];
  
  if (textNodes.length === 0) {
    figma.notify('변경할 텍스트가 없습니다.');
    return;
  }
  
  let convertedCount = 0;
  
  for (const textNode of textNodes) {
    if (textNode.hasMissingFont) {
      continue;
    }
    
    // 폰트 로드
    await loadFontsForTextNode(textNode);
    
    const originalText = textNode.characters;
    const convertedText = convertToFriendlyTone(originalText);
    
    if (originalText !== convertedText) {
      try {
        textNode.characters = convertedText;
        convertedCount++;
      } catch (error) {
        console.error('텍스트 변경 실패:', error);
      }
    }
  }
  
  if (convertedCount > 0) {
    figma.notify(`${convertedCount}개의 텍스트가 친근한 톤으로 변경되었습니다!`);
  } else {
    figma.notify('변경할 텍스트가 없습니다.');
  }
}

// UI에서 메시지 수신
figma.ui.onmessage = async (msg: { type: string; data?: any }) => {
  if (msg.type === 'analyze-selected') {
    const profiles = analyzeSelectedTextNodes();
    figma.ui.postMessage({ type: 'analysis-result', profiles });
  } else if (msg.type === 'generate-suggestions') {
    const suggestions = generateConversionSuggestions();
    figma.ui.postMessage({ type: 'suggestions-result', suggestions });
  } else if (msg.type === 'get-frames') {
    const frames = getAllFrames();
    figma.ui.postMessage({ type: 'frames-result', frames });
  } else if (msg.type === 'apply-selected-suggestions') {
    await applySelectedSuggestions(msg.data.selectedNodeIds);
    figma.notify('선택된 텍스트가 변환되었습니다!');
  } else if (msg.type === 'convert-selected') {
    await convertSelectedTextNodes();
  } else if (msg.type === 'convert-all') {
    await convertSelectedFramesTextNodes(msg.data?.selectedFrameIds || []);
  } else if (msg.type === 'apply-tone') {
    await convertSelectedTextNodes();
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
