"use client"

import { useEffect, useState } from "react"

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) setShowBanner(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true")
    setShowBanner(false)
  }

  return showBanner ? (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-md p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-700 text-center md:text-left">
        Usamos cookies para melhorar a experiência do usuário. Ao continuar, você aceita nossa política de cookies.
      </p>
      <button
        onClick={acceptCookies}
        className="px-6 py-2 rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition"
      >
        Aceitar
      </button>
    </div>
  ) : null
}
