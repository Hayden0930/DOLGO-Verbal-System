// DOLGO Verbal System - 한국어 UX Writing 친근한 톤 변환 플러그인
// 사용자가 선택한 텍스트 노드의 문장을 한국어 UX Writing 친근한 톤으로 변경합니다.

// UI 표시
figma.showUI(__html__, { width: 400, height: 300 });

// 한국어 UX Writing 친근한 톤 변환 규칙
const friendlyToneRules: { [key: string]: string } = {
  // 명령형 → 친근한 제안형
  '확인해보세요': '확인하기',
  '확인하세요': '확인하기',
  '클릭하세요': '클릭하기',
  '입력하세요': '입력하기',
  '선택하세요': '선택하기',
  '다운로드하세요': '다운로드하기',
  '업로드하세요': '업로드하기',
  '저장하세요': '저장하기',
  '삭제하세요': '삭제하기',
  '수정하세요': '수정하기',
  '등록하세요': '등록하기',
  '신청하세요': '신청하기',
  '문의하세요': '문의하기',
  '연락하세요': '연락하기',
  '찾아보세요': '찾아보기',
  '살펴보세요': '살펴보기',
  '검색하세요': '검색하기',
  '이동하세요': '이동하기',
  '돌아가세요': '돌아가기',
  '나가세요': '나가기',
  '닫으세요': '닫기',
  '열어보세요': '열어보기',
  '보내세요': '보내기',
  '받으세요': '받기',
  '공유하세요': '공유하기',
  '추천하세요': '추천하기',
  '평가하세요': '평가하기',
  '리뷰하세요': '리뷰하기',
  '알려주세요': '알려주기',
  '설정하세요': '설정하기',
  '변경하세요': '변경하기',
  '업데이트하세요': '업데이트하기',
  '새로고침하세요': '새로고침하기',
  '다시하세요': '다시하기',
  '취소하세요': '취소하기',
  '완료하세요': '완료하기',
  '시작하세요': '시작하기',
  '종료하세요': '종료하기',
  '중단하세요': '중단하기',
  '계속하세요': '계속하기',
  '다음하세요': '다음하기',
  '이전하세요': '이전하기',
  '첫번째로가세요': '첫번째로가기',
  '마지막으로가세요': '마지막으로가기',
  '위로가세요': '위로가기',
  '아래로가세요': '아래로가기',
  '왼쪽으로가세요': '왼쪽으로가기',
  '오른쪽으로가세요': '오른쪽으로가기',
  
  // 격식체 → 친근체
  '합니다': '해요',
  '됩니다': '돼요',
  '있습니다': '있어요',
  '없습니다': '없어요',
  
  // 부정적 표현 → 긍정적 표현
  '실패했습니다': '다시 시도해보세요',
  '오류가 발생했습니다': '잠시 후 다시 시도해보세요',
  '문제가 있습니다': '도움이 필요하시면 문의해주세요',
  '불가능합니다': '다른 방법을 시도해보세요',
  '제한됩니다': '더 많은 기능을 사용해보세요',
  
  // 복잡한 표현 → 간단한 표현
  '사용자 인증이 필요합니다': '로그인이 필요해요',
  '시스템 점검 중입니다': '잠시만 기다려주세요',
  '서버에 연결할 수 없습니다': '인터넷 연결을 확인해주세요',
  '데이터를 불러올 수 없습니다': '새로고침해보세요',
  '권한이 부족합니다': '관리자에게 문의해주세요'
};

// 텍스트를 친근한 톤으로 변환하는 함수
function convertToFriendlyTone(text: string): string {
  let convertedText = text;
  
  // 규칙에 따른 변환
  for (const formal of Object.keys(friendlyToneRules)) {
    const friendly = friendlyToneRules[formal];
    convertedText = convertedText.replace(new RegExp(escapeRegExp(formal), 'g'), friendly);
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
      
      // 텍스트가 편집 가능한지 확인
      if (textNode.hasMissingFont) {
        figma.notify('폰트가 누락된 텍스트가 있습니다. 폰트를 로드해주세요.');
        continue;
      }
      
      // 텍스트 내용 가져오기
      const originalText = textNode.characters;
      const convertedText = convertToFriendlyTone(originalText);
      
      // 텍스트 변경
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

// 모든 텍스트 노드를 친근한 톤으로 변환
function convertAllTextNodes() {
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
    
    const originalText = textNode.characters;
    const convertedText = convertToFriendlyTone(originalText);
    
    if (originalText !== convertedText) {
      textNode.characters = convertedText;
      convertedCount++;
    }
  }
  
  if (convertedCount > 0) {
    figma.notify(`${convertedCount}개의 텍스트가 친근한 톤으로 변경되었습니다!`);
  } else {
    figma.notify('변경할 텍스트가 없습니다.');
  }
}

// UI에서 메시지 수신
figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'convert-selected') {
    convertSelectedTextNodes();
  } else if (msg.type === 'convert-all') {
    convertAllTextNodes();
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
