'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      new URL(targetUrl); // validate

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '분석 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      router.push(`/r/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-3">blaming</h1>
        <p className="text-muted mb-10">
          URL을 입력하면 6가지 항목을 한국어로 진단합니다.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="url-input" className="sr-only">분석할 URL</label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com"
            disabled={loading}
            className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-score-good/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-foreground text-background font-medium rounded-lg transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {loading ? '분석 중...' : '분석'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-score-bad">{error}</p>
        )}
      </div>
    </main>
  );
}
