export function GotaLogo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="80 30 320 445"
      fill="currentColor"
      className={className}
      aria-label="Logo LTRE"
    >
      <defs>
        <clipPath id="ltre-drop-clip">
          <path d="M238,42 C205,100 90,205 90,315 C90,396 156,460 238,460 C320,460 388,396 388,315 C388,205 271,100 238,42 Z" />
        </clipPath>
      </defs>

      {/* Gota toda branca */}
      <path
        d="M238,42 C205,100 90,205 90,315 C90,396 156,460 238,460 C320,460 388,396 388,315 C388,205 271,100 238,42 Z"
        fill="currentColor"
      />

      {/* Ondas internas */}
      <g clipPath="url(#ltre-drop-clip)" stroke="currentColor" strokeWidth="20" strokeLinecap="round" fill="none">
        <path d="M70,316 C125,298 165,346 215,338 C262,331 285,296 332,316 C358,327 378,332 410,330" opacity="0.35" />
        <path d="M70,366 C125,348 165,396 215,388 C262,381 285,346 332,366 C358,377 378,382 410,380" opacity="0.25" />
        <path d="M70,416 C125,398 165,446 215,438 C262,431 285,396 332,416 C358,427 378,432 410,430" opacity="0.15" />
      </g>
    </svg>
  );
}
