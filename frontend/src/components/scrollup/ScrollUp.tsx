"use client";
import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export function ScrollUp() {
  const [visible, setVisible] = useState(false);

  // Detecta o scroll vertical da janela
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 100); // aparece após 100px scroll
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Volta ao topo suavemente
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className="fixed bottom-23 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-opacity duration-300 cursor-pointer z-50"
    >
      <FiArrowUp size={24} />
    </button>
  );
}
