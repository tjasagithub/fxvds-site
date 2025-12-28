import React from "react";

export default function InlineVpsVdsSvg() {
  const svg = `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block;">
  <defs>
    <style>
      @media (max-width: 767px) {
        .desktop-only {
          display: none;
        }
      }
    </style>

    <linearGradient id="vpsBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#475569"/>
      <stop offset="100%" style="stop-color:#64748B"/>
    </linearGradient>

    <linearGradient id="vdsBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D4AF37"/>
      <stop offset="100%" style="stop-color:#FBBF24"/>
    </linearGradient>

    <symbol id="server-rack" viewBox="0 0 100 180">
      <rect x="10" y="0" width="80" height="180" rx="4" fill="#1E293B" stroke="#334155" stroke-width="2"/>
      <rect x="15" y="20" width="70" height="20" rx="1" fill="#0F172A" stroke="currentColor" stroke-width="1"/>
      <rect x="15" y="45" width="70" height="20" rx="1" fill="#0F172A" stroke="currentColor" stroke-width="1"/>
      <rect x="15" y="70" width="70" height="40" rx="1" fill="#0F172A" stroke="currentColor" stroke-width="2"/>
      <rect x="15" y="115" width="70" height="20" rx="1" fill="#0F172A" stroke="currentColor" stroke-width="1"/>
      <rect x="15" y="140" width="70" height="20" rx="1" fill="#0F172A" stroke="currentColor" stroke-width="1"/>
    </symbol>

    <symbol id="user-icon" viewBox="0 0 40 40">
      <circle cx="20" cy="15" r="7" fill="currentColor"/>
      <path d="M10,35 C10,25 30,25 30,35" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    </symbol>
  </defs>

  
  <line x1="400" y1="50" x2="400" y2="450" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>

  {/* VPS (Left) */}
  <g transform="translate(20, 50)" color="#94A3B8">
    <text x="190" y="30" font-family="sans-serif" font-size="24" font-weight="bold" fill="currentColor" text-anchor="middle">VPS</text>
    <text x="190" y="55" font-family="sans-serif" font-size="14" fill="#64748B" text-anchor="middle">(Virtual Private Server)</text>

    <g transform="translate(40, 90)">
      <g color="#64748B">
        <use href="#server-rack" x="180" y="0"></use>
      </g>
      
      <g color="#94A3B8">
        <use href="#user-icon" x="0" y="10"/>
        <use href="#user-icon" x="0" y="110"/>
        <use href="#user-icon" x="40" y="60"/>
        <use class="desktop-only" href="#user-icon" x="80" y="10" />
        <use class="desktop-only" href="#user-icon" x="80" y="110" />
      </g>

      <path d="M35,30 C100,30 120,90 185,90" stroke="#334155" stroke-width="2" fill="none"/>
      <path d="M35,130 C100,130 120,90 185,90" stroke="#334155" stroke-width="2" fill="none"/>
      <path d="M75,80 C110,80 130,90 185,90" stroke="#334155" stroke-width="2" fill="none"/>
      <path class="desktop-only" d="M115,30 C140,30 150,90 185,90" stroke="#334155" stroke-width="2" fill="none"/>
      <path class="desktop-only" d="M115,130 C140,130 150,90 185,90" stroke="#334155" stroke-width="2" fill="none"/>
      <text x="130" y="70" font-family="sans-serif" font-size="12" fill="#64748B" font-weight="bold">SHARED</text>
    </g>

    <g transform="translate(40, 300)">
      <text x="0" y="0" font-family="sans-serif" font-size="14" fill="#94A3B8">Computer Power (Fluctuating)</text>
      <rect x="0" y="15" width="300" height="20" rx="4" fill="#1E293B"/>
      <rect x="0" y="15" width="180" height="20" rx="4" fill="url(#vpsBar)">
        <animate attributeName="width" values="180;160;190;180" dur="3s" repeatCount="indefinite" />
      </rect>
    </g>

    <g transform="translate(40, 370)" font-family="sans-serif" font-size="15" fill="#CBD5E1">
      <text x="0" y="0">• CPU & RAM shared with other users</text>
      <text x="0" y="30">• Performance can fluctuate under load</text>
      <text x="0" y="60">• Suitable for light or non-critical workloads</text>
    </g>
  </g>

  {/* VDS (Right) */}
  <g transform="translate(420, 50)" color="#FBBF24">
    <text x="190" y="30" font-family="sans-serif" font-size="24" font-weight="bold" fill="currentColor" text-anchor="middle">VDS</text>
    <text x="190" y="55" font-family="sans-serif" font-size="14" fill="#D4AF37" text-anchor="middle">(Virtual Dedicated Server)</text>

    <g transform="translate(40, 90)">
      <g color="#D4AF37">
        <use href="#server-rack" x="0" y="0"></use>
      </g>

      <g transform="translate(220, 60)" color="#FBBF24">
        <use href="#user-icon" x="0" y="0" transform="scale(1.2)"/>
        <path d="M5,15 A 15 15 0 0 1 35 15 L 35 25 A 15 15 0 0 0 20 40 A 15 15 0 0 0 5 25 Z" fill="#D4AF37" transform="translate(15,10) scale(0.7)"/>
        <path d="M22,23 C22,18 30,18 30,23" stroke="#121212" stroke-width="2" fill="none" transform="translate(15,10) scale(0.7)"/>
      </g>
      
      <text x="240" y="130" font-family="sans-serif" font-size="14" fill="#FBBF24" font-weight="bold">You</text>

      <path d="M90,90 L220,90" stroke="url(#vdsBar)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M90,90 L220,90" stroke="#FBBF24" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>
      <text x="155" y="75" font-family="sans-serif" font-size="12" fill="#FBBF24" text-anchor="middle" font-weight="bold">DEDICATED TO YOU</text>
    </g>

    <g transform="translate(40, 300)">
      <text x="0" y="0" font-family="sans-serif" font-size="14" fill="#FBBF24">Computer Power (Stable)</text>
      <rect x="0" y="15" width="300" height="20" rx="4" fill="#1E293B"/>
      <rect x="0" y="15" width="300" height="20" rx="4" fill="url(#vdsBar)">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
      </rect>
    </g>

    <g transform="translate(40, 370)" font-family="sans-serif" font-size="15" fill="#FFFFFF">
      <text x="0" y="0">• Dedicated CPU cores & RAM</text>
      <text x="0" y="30">• No resource sharing, no overselling</text>
      <text x="0" y="60">• Built for professional trading & automation</text>
    </g>
  </g>
</svg>
  `.trim();

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: 16,
        borderRadius: 16,
      }}
      aria-label="VPS vs VDS infographic"
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
