'use client';

import { useState } from 'react';

export function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className="text-sm text-muted hover:text-foreground transition-colors"
      onClick={handleCopy}
    >
      {copied ? '복사됨' : '결과 URL 복사'}
    </button>
  );
}
