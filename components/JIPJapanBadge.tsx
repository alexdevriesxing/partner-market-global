"use client";

import React from "react";

type JIPJapanBadgeProps = {
  variant?: "card" | "detail" | "inline";
  showLabel?: boolean;
  className?: string;
};

export function JIPJapanBadge({
  variant = "card",
  showLabel = true,
  className = ""
}: JIPJapanBadgeProps) {
  if (variant === "card") {
    return (
      <div
        className={`jip-badge-card ${className}`}
        style={{
          position: "absolute",
          top: "9px",
          right: "11px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(4px)",
          padding: "3px 8px",
          borderRadius: "6px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
          zIndex: 10
        }}
        title="JIP Japan verified business opportunity"
      >
        <img
          src="/assets/jip-logo.png"
          alt="JIP Japan verified business opportunity"
          style={{ height: "14px", width: "auto", objectFit: "contain" }}
        />
        {showLabel && (
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#1e293b", letterSpacing: "0.02em" }}>
            JIP Japan Vetted
          </span>
        )}
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <span
        className={`jip-badge-detail ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#0f172a",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
        }}
        title="JIP Japan verified business opportunity"
      >
        <img
          src="/assets/jip-logo.png"
          alt="JIP Japan verified business opportunity"
          style={{ height: "16px", width: "auto", objectFit: "contain" }}
        />
        {showLabel && <span>JIP Japan Vetted</span>}
      </span>
    );
  }

  return (
    <span
      className={`jip-badge-inline ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        verticalAlign: "middle"
      }}
      title="JIP Japan verified business opportunity"
    >
      <img
        src="/assets/jip-logo.png"
        alt="JIP Japan verified business opportunity"
        style={{ height: "14px", width: "auto", objectFit: "contain" }}
      />
      {showLabel && <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>JIP Japan Vetted</span>}
    </span>
  );
}
