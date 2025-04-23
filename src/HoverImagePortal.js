import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

export function HoverImagePortal({ src, top, left, width }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, [src]); // ✅ 이미지 src가 바뀔 때마다 재실행

  return ReactDOM.createPortal(
    <img
      src={src}
      alt="hovered"
      style={{
        position: "fixed",
        top,
        left,
        width,
        borderRadius: 12,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(2px)",
        transform: visible
          ? "scale(1.3) translateY(-8px)"
          : "scale(1) translateY(0px)",
        transformOrigin: "center center",
        boxShadow: visible
          ? "0 12px 30px rgba(0, 0, 0, 0.3)"
          : "0 0px 0px rgba(0, 0, 0, 0.0)",
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), " +
          "opacity 0.3s ease, " +
          "filter 0.3s ease, " +
          "box-shadow 0.4s ease",
      }}
    />,
    document.body
  );
}
