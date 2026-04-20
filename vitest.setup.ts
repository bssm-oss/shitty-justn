import { vi } from 'vitest';

// Mock next/navigation for tests
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    pathname: '',
    query: {},
    asPath: '',
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));