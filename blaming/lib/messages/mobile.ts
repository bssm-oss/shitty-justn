import type { MessageDictionary } from './types';

export const mobileMessages: MessageDictionary = {
  'viewport': {
    title: '뷰포트 설정 누락',
    description: '뷰포트 메타 태그가 없어 모바일에서 페이지가 제대로 표시되지 않을 수 있습니다.',
    fix: '<meta name="viewport" content="width=device-width, initial-scale=1"> 태그를 추가하세요.',
  },
  'font-size': {
    title: '폰트 크기 부족',
    description: '본문 폰트 크기가 너무 작아 모바일에서 읽기 어려울 수 있습니다.',
    fix: '본문 텍스트의 최소 폰트 크기를 12px 이상으로 설정하세요.',
  },
  'tap-targets': {
    title: '터치 대상 크기 부족',
    description: '버튼이나 링크가 너무 작아 모바일에서 정확하게 터치하기 어렵습니다.',
    fix: '터치 대상의 최소 크기를 48x48dp로 설정하고, 충분한 간격을 유지하세요.',
  },
  'image-aspect-ratio': {
    title: '이미지 크기 속성 누락',
    description: '이미지에 width와 height 속성이 없어 로드 시 레이아웃 이동이 발생할 수 있습니다.',
    fix: '모든 이미지에 적절한 width와 height 속성을 추가하세요.',
  },
  'uses-responsive-images': {
    title: '반응형 이미지 미적용',
    description: '이미지가 반응형이 아니라 불필요하게 큰 이미지가 모바일에서 다운로드됩니다.',
    fix: 'srcset과 sizes 속성을 사용하여 기기에 적합한 이미지를 제공하세요.',
  },
  'uses-http2': {
    title: 'HTTP/2 미사용',
    description: '서버가 HTTP/2를 지원하지 않아 모바일 네트워크에서 로드 성능이 떨어질 수 있습니다.',
    fix: '서버에서 HTTP/2를 활성화하여 멀티플렉싱과 헤더 압축으로 모바일 로드 속도를 개선하세요.',
  },
  'redirects': {
    title: '불필요한 리다이렉트',
    description: '페이지 로드 중 불필요한 리다이렉트가 발생하여 모바일에서 로드 시간이 늘어납니다.',
    fix: '리다이렉트 체인을 최소화하고 가능한 경우 직접 최종 URL을 가리키도록 하세요.',
  },
  'minify-css': {
    title: 'CSS 미니파이 미적용',
    description: 'CSS 파일이 미니파이되지 않아 모바일에서 불필요하게 큰 파일이 다운로드됩니다.',
    fix: 'CSS 파일을 미니파이하여 다운로드 크기를 줄이세요.',
  },
  'minify-javascript': {
    title: 'JavaScript 미니파이 미적용',
    description: 'JavaScript 파일이 미니파이되지 않아 모바일에서 불필요하게 큰 파일이 다운로드됩니다.',
    fix: 'JavaScript 파일을 미니파이하여 다운로드 크기를 줄이세요.',
  },
  'offline-start-url': {
    title: '서비스 워커 미등록',
    description: '서비스 워커가 등록되지 않아 오프라인 기능을 사용할 수 없습니다.',
    fix: '서비스 워커를 등록하여 오프라인 캐싱과 백그라운드 동기화를 제공하세요.',
  },
  'slow-mobile-interactive': {
    title: '모바일 상호작용 시간 과다',
    description: '모바일에서 페이지가 상호 작용 가능해지기까지 시간이 오래 걸립니다.',
    fix: '주요 리소스의 로드 우선순위를 조정하고, 사용하지 않는 JavaScript를 줄이며, 크리티컬 렌더링 경로를 최적화하세요.',
  },
  'poor-mobile-cls': {
    title: '모바일 레이아웃 이동 과다',
    description: '모바일에서 레이아웃 이동이 과다하여 사용자 경험이 나빠집니다.',
    fix: '이미지와 동영상에 크기 속성을 추가하고, 폰트 교체 시 레이아웃 변경을 최소화하며, 동적 콘텐츠에 공간을 예약하세요.',
  },
};
