import type { MessageDictionary } from './types';

export const performanceMessages: MessageDictionary = {
  'first-contentful-paint': {
    title: 'FCP (첫 콘텐츠 표시) 느림',
    description: '첫 번째 콘텐츠가 화면에 표시되는 데 너무 오래 걸립니다.',
    fix: '서버 응답 시간을 줄이고, 렌더링 차단 리소스를 최소화하며, 중요한 CSS를 인라인으로 포함하세요.',
  },
  'largest-contentful-paint': {
    title: 'LCP (화면에 가장 큰 요소가 뜨는 시간) 느림',
    description: '화면에서 가장 큰 콘텐츠 요소가 로드되는 데 너무 오래 걸립니다.',
    fix: '이미지 최적화, 텍스트 압축, 중요 리소스 프리로드, 서버 응답 시간 개선을 통해 LCP를 개선하세요.',
  },
  'total-blocking-time': {
    title: 'TBT (메인 스레드 차단 시간) 과다',
    description: '메인 스레드가 장시간 차단되어 사용자 입력을 처리하지 못합니다.',
    fix: 'JavaScript 실행 시간을 줄이고, 긴 작업을 작은 청크로 나누며, 웹 워커를 사용해 보세요.',
  },
  'cumulative-layout-shift': {
    title: 'CLS (누적 레이아웃 이동) 과다',
    description: '페이지 로드 중에 예기치 않은 레이아웃 이동이 발생합니다.',
    fix: '이미지와 동영상에 크기 속성을 추가하고, 폰트 교체 시 레이아웃 변경을 최소화하며, 동적으로 삽입되는 콘텐츠에 공간을 예약하세요.',
  },
  'speed-index': {
    title: '속도 지수 느림',
    description: '페이지 콘텐츠가 시각적으로 표시되는 속도가 느립니다.',
    fix: '크리티컬 렌더링 경로를 최적화하고, 사용하지 않는 CSS를 제거하며, 이미지를 압축하고 적절한 형식을 사용하세요.',
  },
  'uses-optimized-images': {
    title: '이미지 최적화 부족',
    description: '이미지가 적절히 압축되지 않거나 현대적인 형식(WebP, AVIF)을 사용하지 않습니다.',
    fix: '이미지를 압축하고, 가능한 경우 WebP 또는 AVIF 형식으로 변환하며, 반응형 이미지를 위한 srcset과 sizes 속성을 사용하세요.',
  },
  'uses-text-compression': {
    title: '텍스트 압축 미적용',
    description: '텍스트 기반 리소스(HTML, CSS, JavaScript)에 압축이 적용되지 않습니다.',
    fix: '서버에서 Gzip 또는 Brotli 압축을 활성화하여 텍스트 리소스 전송 크기를 줄이세요.',
  },
  'unused-css-rules': {
    title: '사용되지 않는 CSS 규칙',
    description: '페이지에서 실제로 사용되지 않는 CSS 규칙이 포함되어 있어 불필요하게 파일 크기를 증가시킵니다.',
    fix: '사용되지 않는 CSS를 제거하고, 필요한 스타일만 포함하도록 스타일시트를 최적화하세요. PurgeCSS나 유사한 도구를 고려하세요.',
  },
  'unused-js': {
    title: '사용되지 않는 JavaScript',
    description: '페이지에서 실제로 실행되지 않는 JavaScript 코드가 포함되어 있어 불필요하게 파일 크기를 증가시킵니다.',
    fix: '사용되지 않는 JavaScript를 제거하고, 코드 스플리팅을 통해 필요한 시점에만 로드하도록 하세요.',
  },
  'render-blocking-resources': {
    title: '렌더링 차단 리소스',
    description: '렌더링을 차단하는 CSS 또는 JavaScript 리소스가 초기 페이지 로드를 지연시킵니다.',
    fix: '비중요한 CSS와 JavaScript는 비동기로 로드하거나, 중요도를 나누어 초기 렌더링에 필요한 것만 포함하세요.',
  },
  'total-byte-weight': {
    title: '전체 페이지 용량 과다',
    description: '전체 페이지 다운로드 크기가 너무 커서 로드 속도에 부정적인 영향을 줍니다.',
    fix: '이미지 최적화, 텍스트 압축, 사용하지 않는 코드 제거, 적절한 캐싱 전략을 통해 전체 페이지 용량을 줄이세요.',
  },
};
