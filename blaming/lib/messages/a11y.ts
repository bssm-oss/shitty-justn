import type { MessageDictionary } from './types';

export const a11yMessages: MessageDictionary = {
  'color-contrast': {
    title: '색상 대비 부족',
    description: '텍스트와 배경 사이의 색상 대비가 WCAG 기준(일반 텍스트 4.5:1, 큰 텍스트 3:1)에 미치지 못합니다.',
    fix: '텍스트와 배경 색상의 대비 비율을 최소 4.5:1(일반 텍스트) 또는 3:1(큰 텍스트) 이상으로 조정하세요.',
  },
  'aria-allowed-attr': {
    title: '잘못된 ARIA 속성 사용',
    description: '요소에 허용되지 않은 ARIA 속성이 사용되어 보조 기술에서 잘못 해석될 수 있습니다.',
    fix: 'ARIA 스펙에 정의된 속성만 사용하고, 각 역할(role)에 적합한 속성을 확인하세요.',
  },
  'aria-required-children': {
    title: '필수 자식 요소 누락',
    description: '특정 ARIA 역할을 가진 요소에 필수 자식 요소가 없습니다.',
    fix: 'ARIA 역할에 필요한 자식 요소를 추가하거나, 역할을 수정하여 유효한 구조를 만드세요.',
  },
  'aria-required-parent': {
    title: '필수 부모 요소 누락',
    description: '특정 ARIA 역할을 가진 요소에 필수 부모 요소가 없습니다.',
    fix: '요소를 적절한 부모 요소 내에 배치하거나, 역할 요구사항을 확인하여 수정하세요.',
  },
  'button-name': {
    title: '버튼 이름 누락',
    description: '버튼에 접근 가능한 이름이 없어 스크린리더 사용자가 버튼의 목적을 이해하기 어렵습니다.',
    fix: '버튼에 텍스트 내용이나 aria-label, aria-labelledby 속성을 추가하여 접근 가능한 이름을 제공하세요.',
  },
  'heading-order': {
    title: '헤딩 순서 오류',
    description: '헤딩 요소(h1-h6)가 논리적인 순서를 따르지 않아 내용 구조가 혼란스러울 수 있습니다.',
    fix: '헤딩을 단계별로(h1 → h2 → h3 ...) 사용하여 문서 구조를 명확히 하세요.',
  },
  'image-alt': {
    title: '이미지 대체 텍스트 누락',
    description: '이미지에 alt 속성이 없어 스크린리더 사용자에게 이미지 정보가 전달되지 않습니다.',
    fix: '의미 있는 이미지에는 alt="설명"을, 장식용 이미지에는 alt=""를 추가하세요.',
  },
  'label': {
    title: '폼 레이블 누락',
    description: '폼 컨트롤과 연결된 레이블이 없어 스크린리더 사용자가 입력 필드의 목적을 알 수 없습니다.',
    fix: '각 폼 컨트롤에 <label> 요소를 연결하거나 aria-label, aria-labelledby 속성을 제공하세요.',
  },
  'link-name': {
    title: '링크 이름 누락',
    description: '링크에 접근 가능한 이름이 없어 스크린리더 사용자가 링크의 목적을 알 수 없습니다.',
    fix: '링크에 텍스트 내용이나 aria-label, aria-labelledby 속성을 추가하여 접근 가능한 이름을 제공하세요.',
  },
  'tabindex': {
    title: '탭 순서 오류',
    description: '탭을 통한 탐색 순서가 논리적이지 않아 키보드 사용자에게 혼란을 줄 수 있습니다.',
    fix: '의미 있는 순서대로 tabindex를 관리하거나, 자연스러운 DOM 순서를 따라 탭 이동이 일어나도록 하세요.',
  },
};
