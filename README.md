# 🎯 DOLGO Verbal System

한국어 UX Writing 친근한 톤 변환 피그마 플러그인입니다. 사용자가 선택한 텍스트 노드의 문장을 한국어 UX Writing 친근한 톤으로 자동 변환해드립니다.

## ✨ 주요 기능

- **선택한 텍스트 변환**: 선택한 텍스트 노드만 친근한 톤으로 변환
- **모든 텍스트 변환**: 페이지의 모든 텍스트를 한 번에 변환
- **다양한 변환 규칙**: 명령형 → 제안형, 격식체 → 친근체 등

## 🔄 변환 예시

| 변환 전 | 변환 후 |
|---------|---------|
| 확인해보세요 | 확인하기 |
| 클릭하세요 | 클릭하기 |
| 입력하세요 | 입력하기 |
| 문의하세요 | 문의하기 |
| 합니다 | 해요 |
| 있습니다 | 있어요 |

## 🚀 설치 및 사용법

### 1. 개발 환경 설정

먼저 Node.js를 설치하세요:
- [Node.js 다운로드](https://nodejs.org/en/download/)

### 2. 의존성 설치

```bash
npm install
```

### 3. TypeScript 컴파일

```bash
npm run build
```

### 4. 피그마에서 플러그인 로드

1. 피그마 데스크톱 앱을 엽니다
2. 메뉴에서 `Plugins` → `Development` → `Import plugin from manifest...` 선택
3. 이 프로젝트의 `manifest.json` 파일을 선택합니다

### 5. 플러그인 사용

1. 피그마에서 텍스트 노드를 선택합니다
2. 플러그인을 실행합니다 (`Plugins` → `DOLGO Verbal System`)
3. "선택한 텍스트 변환" 또는 "모든 텍스트 변환" 버튼을 클릭합니다

## 🛠️ 개발

### 빌드

```bash
npm run build
```

### 개발 모드 (자동 재컴파일)

```bash
npm run watch
```

### 린트 검사

```bash
npm run lint
```

## 📁 프로젝트 구조

```
DOLGO Verbal System/
├── code.ts          # 메인 플러그인 로직
├── ui.html          # 플러그인 UI
├── manifest.json    # 플러그인 설정
├── package.json     # 프로젝트 의존성
└── tsconfig.json    # TypeScript 설정
```

## 🎨 변환 규칙

### 명령형 → 친근한 제안형
- `확인해보세요` → `확인하기`
- `클릭하세요` → `클릭하기`
- `입력하세요` → `입력하기`

### 격식체 → 친근체
- `합니다` → `해요`
- `있습니다` → `있어요`
- `됩니다` → `돼요`

### 부정적 표현 → 긍정적 표현
- `실패했습니다` → `다시 시도해보세요`
- `문제가 있습니다` → `도움이 필요하시면 문의해주세요`

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🔗 참고 자료

- [피그마 플러그인 개발 가이드](https://www.figma.com/plugin-docs/)
- [피그마 플러그인 빠른 시작 가이드](https://www.figma.com/plugin-docs/plugin-quickstart-guide/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
