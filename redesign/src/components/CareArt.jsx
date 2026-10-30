import React from 'react';
import { Sticker } from '../stickers/Sticker';
import { heart, calendar, chat, folder, phone, notes } from '../stickers/icons';

// Actual fun-isometric runtime and worked drawings, recoloured for SehatFirstPro.
// Upstream source and MIT license are retained beside the kit.
export const carePalette = Object.freeze({
  main: '#b7d4ff', gold: '#16a34a', tint: '#eff6ff', ok: '#b7d4ff',
  hot: '#16a34a', deep: '#0a2350', white: '#ffffff', grey: '#cbd5e1',
  paper: '#eff6ff', ink: '#0a2350',
});

const stickers = {
  heartbeat: { ...heart, still: 100, name: 'Everyday heart care' },
  heart: { ...heart, still: 100, name: 'Everyday heart care' },
  calendar: { ...calendar, still: 150, name: 'A checkup on your calendar' },
  chat: { ...chat, still: 150, name: 'A conversation with your doctor' },
  folder: { ...folder, still: 150, name: 'Your health records together' },
  phone: { ...phone, still: 120, name: 'Care from your phone' },
  notes: { ...notes, still: 0, name: 'A personal plan for your health' },
};

export function CareSticker({ type = 'heartbeat', className = '', style, label, loop = false }) {
  return <Sticker icon={stickers[type] || stickers.heartbeat} palette={carePalette}
    loop={loop} replayOnHover enter={0.12} label={label}
    className={`care-sticker ${className}`} style={style} />;
}

// Small code-native decorative care mark for section dividers; the editorial
// hero is a separately generated image, not substituted by this SVG.
export function CareArt({ className = '', label = 'Care for the whole family' }) {
  return <svg className={className} viewBox="0 0 240 180" role="img" aria-label={label}
    xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M30 153C23 113 38 49 74 39C111 29 136 52 169 38C211 21 229 111 204 151Z" fill="#e6f0ff" />
    <path d="M58 151V117C58 98 76 88 91 88C111 88 126 102 126 117V151" fill="#b7d4ff" stroke="#0a2350" strokeWidth="2" />
    <path d="M131 151V112C131 95 147 85 163 85C183 85 195 103 195 117V151" fill="#16a34a" stroke="#0a2350" strokeWidth="2" />
    <path d="M70 60C70 36 111 33 113 62V75H70Z" fill="#0a2350" />
    <ellipse cx="92" cy="67" rx="19" ry="23" fill="#eac7a1" stroke="#0a2350" strokeWidth="2" />
    <path d="M71 58C78 62 92 51 94 46C98 54 106 58 112 59" fill="#0a2350" />
    <path d="M145 58C145 34 182 35 184 58L185 81H144Z" fill="#0a2350" />
    <ellipse cx="163" cy="65" rx="18" ry="22" fill="#c98c68" stroke="#0a2350" strokeWidth="2" />
    <path d="M145 56C152 59 169 48 173 45L182 56" fill="#0a2350" />
    <path d="M87 75Q93 81 99 75M158 74Q163 79 169 74" stroke="#0a2350" strokeWidth="2" strokeLinecap="round" />
    <path d="M82 64H84M100 64H102M154 63H156M170 63H172" stroke="#0a2350" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M99 152V139C99 122 108 115 121 115C137 115 145 128 145 139V152" fill="#eff6ff" stroke="#0a2350" strokeWidth="2" />
    <circle cx="121" cy="104" r="17" fill="#dfac85" stroke="#0a2350" strokeWidth="2" />
    <path d="M105 102C105 87 112 84 124 87C134 88 139 97 137 102C128 103 125 96 122 95C117 102 108 103 105 102Z" fill="#0a2350" />
    <path d="M116 109Q121 113 126 109" stroke="#0a2350" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M113 101H115M127 101H129" stroke="#0a2350" strokeWidth="2" strokeLinecap="round" />
    <path d="M111 32C98 21 106 12 114 18C120 8 135 16 126 28L119 36Z" fill="#16a34a" stroke="#0a2350" strokeWidth="2" />
    <path d="M34 153H211M47 68L44 61M40 78L32 76M207 75L212 69" stroke="#0a2350" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}

export default CareSticker;
