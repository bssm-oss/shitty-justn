import type { MessageDictionary } from './types';

export const securityMessages: MessageDictionary = {
  'strict-transport-security': {
    title: 'HSTS 헤더 누락',
    description: 'Strict-Transport-Security 헤더가 없어 HTTPS 강제가 제대로 작동하지 않을 수 있습니다.',
    fix: 'Strict-Transport-Security 헤더를 추가하세요. 권장 값: max-age=31536000; includeSubDomains; preload',
  },
  'content-security-policy': {
    title: 'CSP 헤더 누락 또는 약함',
    description: 'Content-Security-Policy 헤더가 없어 XSS 공격에 취약할 수 있습니다.',
    fix: '적절한 Content-Security-Policy 헤더를 추가하세요. 기본값으로 "default-src \'self\'"부터 시작하세요.',
  },
  'x-content-type-options': {
    title: 'X-Content-Type-Options 헤더 누락',
    description: 'X-Content-Type-Options 헤더가 없어 MIME 유형 스니핑 공격에 취약할 수 있습니다.',
    fix: 'X-Content-Type-Options: nosniff 헤더를 추가하세요.',
  },
  'x-frame-options': {
    title: 'X-Frame-Options 헤더 누락',
    description: 'X-Frame-Options 헤더가 없어 클릭재킹 공격에 취약할 수 있습니다.',
    fix: 'X-Frame-Options: DENY 또는 SAMEORIGIN 헤더를 추가하세요.',
  },
  'referrer-policy': {
    title: 'Referrer-Policy 헤더 누락',
    description: 'Referrer-Policy 헤더가 없어 참조자 정보가 의도보다 많이 유출될 수 있습니다.',
    fix: 'Referrer-Policy 헤더를 추가하세요. 권장 값: strict-origin-when-cross-origin',
  },
  'permissions-policy': {
    title: 'Permissions-Policy 헤더 누락',
    description: 'Permissions-Policy 헤더가 없어 카메라, 마이크 등 브라우저 기능 접근을 제어할 수 없습니다.',
    fix: 'Permissions-Policy 헤더를 추가하여 브라우저 기능 접근을 제어하세요.',
  },
  'x-xss-protection': {
    title: 'X-XSS-Protection 헤더 누락',
    description: 'X-XSS-Protection 헤더가 없어 브라우저의 XSS 필터가 비활성화되어 있을 수 있습니다.',
    fix: 'X-XSS-Protection: 1; mode=block 헤더를 추가하세요.',
  },
  'server-header': {
    title: '서버 헤더 노출',
    description: '서버 헤더가 기술 스택을 노출하여 표적 공격에 활용될 수 있습니다.',
    fix: '서버 헤더를 제거하거나 일반 값으로 변경하세요.',
  },
  'powered-by-header': {
    title: 'X-Powered-By 헤더 노출',
    description: 'X-Powered-By 헤더가 기술 스택을 노출하여 표적 공격에 활용될 수 있습니다.',
    fix: 'X-Powered-By 헤더를 제거하세요.',
  },
  'exposed-paths': {
    title: '민감한 경로 노출',
    description: '.env, .git 등 민감한 경로가 외부에서 접근 가능합니다.',
    fix: '노출된 경로를 차단하거나 접근 권한을 제한하세요.',
  },
  'no-https': {
    title: 'HTTPS 미사용',
    description: '사이트가 HTTPS를 사용하지 않아 통신이 도청 및 변조에 취약합니다.',
    fix: 'SSL/TLS 인증서를 설치하여 HTTPS를 활성화하세요.',
  },
};
