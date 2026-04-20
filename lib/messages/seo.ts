import type { MessageDictionary } from './types';

export const seoMessages: MessageDictionary = {
  'title-tag': {
    title: '제목 태그 누락 또는 부족',
    description: '페이지에 제목 태그가 없거나 너무 짧습니다(30자 미만).',
    fix: '페이지 내용을 정확하게 설명하는 30-60자 사이의 제목 태그를 추가하세요.',
  },
  'title-tag-long': {
    title: '제목 태그 초과',
    description: '제목 태그가 너무 깁니다(60자 초과). 검색 결과에서 잘릴 수 있습니다.',
    fix: '제목 태그를 60자 이내로 줄여서 검색 결과에서 완전히 표시되도록 하세요.',
  },
  'meta-description': {
    title: '메타 설명 누락 또는 부족',
    description: '페이지에 메타 설명이 없거나 너무 짧습니다(50자 미만).',
    fix: '페이지 내용을 요약하는 50-160자 사이의 메타 설명 태그를 추가하세요.',
  },
  'meta-description-long': {
    title: '메타 설명 초과',
    description: '메타 설명이 너무 깁니다(160자 초과). 검색 결과에서 잘릴 수 있습니다.',
    fix: '메타 설명을 160자 이내로 줄여서 검색 결과에서 완전히 표시되도록 하세요.',
  },
  'h1-tag': {
    title: 'H1 태그 누락 또는 중복',
    description: '페이지에 H1 태그가 없거나 여러 개 있습니다.',
    fix: '페이지당 하나의 H1 태그를 사용하여 주요 제목을 명확히 하세요.',
  },
  'og-title': {
    title: 'OG 제목 태그 누락',
    description: 'Open Graph 제목 태그가 없어 소셜 미디어 공유 시 원하는 제목이 표시되지 않을 수 있습니다.',
    fix: '<meta property="og:title" content="제목"> 태그를 추가하세요.',
  },
  'og-description': {
    title: 'OG 설명 태그 누락',
    description: 'Open Graph 설명 태그가 없어 소셜 미디어 공유 시 원하는 설명이 표시되지 않을 수 있습니다.',
    fix: '<meta property="og:description" content="설명"> 태그를 추가하세요.',
  },
  'og-image': {
    title: 'OG 이미지 태그 누락',
    description: 'Open Graph 이미지 태그가 없어 소셜 미디어 공유 시 이미지가 표시되지 않습니다.',
    fix: '<meta property="og:image" content="이미지 URL"> 태그를 추가하세요.',
  },
  'canonical-url': {
    title: '캐노니컬 URL 누락',
    description: '캐노니컬 URL 태그가 없어 중복 콘텐츠 문제로 검색 엔진 순위에 영향을 줄 수 있습니다.',
    fix: '<link rel="canonical" href="표준 URL"> 태그를 추가하세요.',
  },
  'robots-txt': {
    title: 'robots.txt 누락',
    description: 'robots.txt 파일이 없어 검색 엔진 크롤러에게 사이트 접근 규칙을 전달할 수 없습니다.',
    fix: '사이트 루트에 robots.txt 파일을 생성하여 크롤러 접근 규칙을 정의하세요.',
  },
  'sitemap-xml': {
    title: 'sitemap.xml 누락',
    description: 'sitemap.xml 파일이 없어 검색 엔진이 사이트 구조를 효율적으로 파악하기 어려울 수 있습니다.',
    fix: '사이트 루트에 sitemap.xml 파일을 생성하여 모든 중요한 페이지의 위치를 알려주세요.',
  },
  'viewport': {
    title: '뷰포트 메타 태그 누락',
    description: '뷰포트 메타 태그가 없어 모바일에서 페이지가 제대로 표시되지 않을 수 있습니다.',
    fix: '<meta name="viewport" content="width=device-width, initial-scale=1"> 태그를 추가하세요.',
  },
  'charset': {
    title: '문자 인코딩 선언 누락',
    description: '문자 인코딩 선언이 없어 브라우저가 문자를 잘못 해석할 수 있습니다.',
    fix: '<meta charset="UTF-8"> 태그를 HTML의 head 시작 부분에 추가하세요.',
  },
  'structured-data': {
    title: '구조화된 데이터 누락',
    description: 'JSON-LD 형식의 구조화된 데이터가 없어 검색 엔진이 페이지 내용을 정확히 이해하기 어려울 수 있습니다.',
    fix: 'schema.org 마크업을 추가하여 검색 엔진이 페이지 구조와 내용을 더 잘 이해할 수 있도록 하세요.',
  },
  'nondescriptive-links': {
    title: '설명 없는 링크 발견',
    description: '링크에 접근 가능한 텍스트가 없어 스크린리더 사용자가 링크의 목적을 알 수 없습니다.',
    fix: '링크 텍스트나 aria-label을 추가하여 스크린리더 사용자에게 링크 목적을 제공하세요.',
  },
};
