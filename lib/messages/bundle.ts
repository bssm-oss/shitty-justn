import type { MessageDictionary } from './types';

export const bundleMessages: MessageDictionary = {
  'uses-optimized-images': {
    title: '이미지 최적화 부족',
    description: '이미지가 적절히 압축되지 않거나 현대적인 형식(WebP, AVIF)을 사용하지 않습니다.',
    fix: '이미지를 압축하고, WebP 또는 AVIF 형식으로 변환하며, srcset과 sizes 속성을 사용하세요.',
  },
  'uses-text-compression': {
    title: '텍스트 압축 미적용',
    description: '텍스트 기반 리소스(HTML, CSS, JavaScript)에 압축이 적용되지 않습니다.',
    fix: '서버에서 Gzip 또는 Brotli 압축을 활성화하여 전송 크기를 줄이세요.',
  },
  'unused-css-rules': {
    title: '사용되지 않는 CSS 규칙',
    description: '페이지에서 사용되지 않는 CSS 규칙이 포함되어 불필요하게 파일 크기를 증가시킵니다.',
    fix: '사용되지 않는 CSS를 제거하고 스타일시트를 최적화하세요. PurgeCSS 등을 고려하세요.',
  },
  'unused-js': {
    title: '사용되지 않는 JavaScript',
    description: '페이지에서 실행되지 않는 JavaScript 코드가 포함되어 불필요하게 파일 크기를 증가시킵니다.',
    fix: '사용되지 않는 JavaScript를 제거하고, 코드 스플리팅으로 필요한 시점에만 로드하세요.',
  },
  'render-blocking-resources': {
    title: '렌더링 차단 리소스',
    description: '렌더링을 차단하는 CSS 또는 JavaScript가 초기 페이지 로드를 지연시킵니다.',
    fix: '비중요한 리소스는 비동기로 로드하고, 초기 렌더링에 필요한 것만 포함하세요.',
  },
  'total-byte-weight': {
    title: '전체 페이지 용량 과다',
    description: '전체 페이지 다운로드 크기가 너무 커서 로드 속도에 부정적인 영향을 줍니다.',
    fix: '이미지 최적화, 텍스트 압축, 불필요한 코드 제거, 적절한 캐싱 전략을 적용하세요.',
  },
  'large-javascript-bundles': {
    title: 'JavaScript 번들 과대',
    description: 'JavaScript 파일이 100KB를 초과하여 모바일에서 로드 성능에 영향을 줍니다.',
    fix: '코드 스플리팅과 지연 로딩을 적용하여 번들 크기를 줄이세요.',
  },
  'large-css-bundles': {
    title: 'CSS 번들 과대',
    description: 'CSS 파일이 50KB를 초과하여 불필요한 스타일이 다운로드됩니다.',
    fix: '사용하지 않는 스타일을 제거하고, 모듈식 CSS를 고려하세요.',
  },
};
