// components/DevelopmentBadge.tsx
export function DevelopmentBadge() {
  return (
    <div className="fixed top-23 right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 z-50 flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm font-medium rounded-xl px-4 py-2 shadow-lg animate-pulse pointer-events-none">
      <span className="text-lg">🔧</span>
      Aplicativo em desenvolvimento
    </div>
  );
}
