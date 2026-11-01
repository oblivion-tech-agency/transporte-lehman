/**
 * Side view of a Lehman rig: white tractor and blue-tarp semitrailer, like the fleet photos.
 * Wheels spin and the body rides on its suspension while an ancestor has `data-moving`.
 */
const TRAILER_WHEELS = [14, 23.5, 33];
const TRACTOR_WHEELS = [99, 108.5, 122];
const WHEEL_Y = 37.7;

function Wheel({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} ${WHEEL_Y})`}>
      <g className="truck-wheel">
        <circle r="4.3" fill="#151d40" stroke="#3a4a85" strokeWidth="0.6" />
        <circle r="2.6" fill="none" stroke="#2a3a73" strokeWidth="0.6" />
        <circle r="1.5" fill="#c9d0e0" />
        <path d="M-2.6 0H2.6M0-2.6V2.6" stroke="#0b1024" strokeWidth="0.6" />
      </g>
    </g>
  );
}

export function TruckSide({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 46" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="truck-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff2cc" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff2cc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="truck-tarp" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3355c8" />
          <stop offset="1" stopColor="#1f3a9e" />
        </linearGradient>
      </defs>
      <ellipse cx="68" cy="42.4" rx="66" ry="1.5" fill="#000" opacity="0.45" />
      <polygon className="truck-beam" points="131,24 170,15 170,37" fill="url(#truck-beam)" />

      <g className="truck-body">
        {/* semitrailer: tarp body, ribs, chassis, landing leg, rear guard */}
        <rect x="2" y="4.5" width="90" height="26.5" fill="url(#truck-tarp)" />
        <rect x="2" y="4.5" width="90" height="1.4" fill="#5b7ff0" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={9.5 + i * 7.6} y="5.9" width="0.7" height="25.1" fill="#16308a" />
        ))}
        <rect x="2" y="4.5" width="1.6" height="26.5" fill="#c9d0e0" />
        <rect x="5" y="31" width="87" height="2.6" fill="#0b1024" />
        <rect x="3" y="33.6" width="5" height="1.6" fill="#0b1024" />
        <rect x="64" y="33.6" width="1.6" height="4.6" fill="#0b1024" />
        {[12, 42, 72].map((x) => (
          <rect key={x} x={x} y="31.6" width="1.8" height="1.2" fill="#ffb23e" />
        ))}

        {/* tractor */}
        <rect x="92" y="31" width="39" height="2.6" fill="#0b1024" />
        <path d="M99 4Q105.5 1 117 1.8V4Z" fill="#d9deea" />
        <path d="M95 31V8Q95 4 99 4H116.5L124.6 7.6Q127 8.7 127.6 11L130.6 20V31Z" fill="#eef2fb" />
        <path d="M117.6 8.2 124.3 10.9 126.9 18.6H117.6Z" fill="#10183a" />
        <rect x="117.6" y="16.8" width="9" height="1.8" fill="#7a1f2a" />
        <rect x="108" y="8.5" width="7" height="9" fill="#10183a" />
        <rect x="115.6" y="8.4" width="1.3" height="7.4" fill="#0b1024" />
        <path d="M106 18.6V30.4" stroke="#c9d0e0" strokeWidth="0.5" />
        <rect x="127.3" y="20.5" width="3.6" height="8.5" fill="#a9b4d0" />
        <path d="M127.6 22.6H130.6M127.6 24.6H130.6M127.6 26.6H130.6" stroke="#7b86a6" strokeWidth="0.4" />
        <rect x="128.6" y="21.2" width="2.4" height="1.6" fill="#fff6d6" />
        <rect x="123.5" y="29" width="7.8" height="2.4" fill="#8a95b2" />
        <rect x="102.5" y="26.4" width="10.5" height="4.2" rx="1.6" fill="#a9b4d0" />
        <rect x="117.8" y="27.6" width="4.4" height="0.9" fill="#0b1024" />
        {TRACTOR_WHEELS.map((cx) => (
          <path
            key={cx}
            d={`M${cx - 5.6} ${WHEEL_Y}A5.6 5.6 0 0 1 ${cx + 5.6} ${WHEEL_Y}`}
            fill="none"
            stroke="#0b1024"
            strokeWidth="1.4"
          />
        ))}
      </g>

      {[...TRAILER_WHEELS, ...TRACTOR_WHEELS].map((cx) => (
        <Wheel key={cx} cx={cx} />
      ))}
    </svg>
  );
}
