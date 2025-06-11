export function TermsOfUseNotice() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 text-center shadow-sm">
      Ao continuar utilizando esta aplicação, você concorda com os nossos
      <a
        href="/politica"
        className="underline text-yellow-700 font-medium hover:text-yellow-900 ml-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Termos de Uso e Política de Privacidade
      </a>.
    </div>
  );
}
