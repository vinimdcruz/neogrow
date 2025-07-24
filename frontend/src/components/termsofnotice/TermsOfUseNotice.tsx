import Link from "next/link";

export function TermsOfUseNotice() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 text-center shadow-sm">
      Ao utilizar esta aplicação, você concorda com os nossos{" "}
      <Link
        href="/privacyandterms"
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-medium hover:underline"
      >
        Termos de Uso e Política de Privacidade
      </Link>
      .
    </div>
  );
}
