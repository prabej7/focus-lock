export default function AuroraBackground({
  isRunning,
}: {
  isRunning: boolean;
}) {
  return (
    <>
      <style>{`
        @keyframes aurora-drift {
          0%   { transform: translate(-10%, -10%) scale(1);   }
          50%  { transform: translate(10%, 10%) scale(1.2);   }
          100% { transform: translate(-10%, -10%) scale(1);   }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-1/3 -left-1/4 size-150 rounded-full blur-3xl transition-opacity duration-1000 ${
            isRunning ? "opacity-40" : "opacity-20"
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            animation: "aurora-drift 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 size-150 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--muted), transparent 70%)",
            animation: "aurora-drift 18s ease-in-out infinite",
            animationDelay: "-9s",
          }}
        />
      </div>
    </>
  );
}

export function LiquidBlobsBackground({ isRunning }: { isRunning: boolean }) {
  return (
    <>
      <style>{`
        @keyframes blob-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(40px, -30px) scale(1.15); }
          66%      { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes blob-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(-50px, 20px) scale(1.1); }
          66%      { transform: translate(30px, -40px) scale(0.9); }
        }
        @keyframes blob-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(60px, 50px) scale(1.2); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[10%] left-[15%] size-90 rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.18 280), transparent 70%)",
            animation: "blob-a 20s ease-in-out infinite",
            opacity: isRunning ? 0.55 : 0.3,
            transition: "opacity 1000ms ease",
          }}
        />
        <div
          className="absolute top-[40%] right-[10%] size-100 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.2 330), transparent 70%)",
            animation: "blob-b 24s ease-in-out infinite",
            opacity: isRunning ? 0.45 : 0.25,
            transition: "opacity 1000ms ease",
          }}
        />
        <div
          className="absolute bottom-[5%] left-[30%] size-80 rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.15 200), transparent 70%)",
            animation: "blob-c 28s ease-in-out infinite",
            opacity: isRunning ? 0.5 : 0.28,
            transition: "opacity 1000ms ease",
          }}
        />
      </div>
    </>
  );
}

export function WaveLinesBackground({ isRunning }: { isRunning: boolean }) {
  return (
    <>
      <style>{`
        @keyframes wave-shift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-80px); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className="absolute left-0 w-[120%]"
            style={{
              top: `${15 + i * 12}%`,
              opacity: isRunning ? 0.35 - i * 0.04 : 0.18 - i * 0.02,
              transition: "opacity 1000ms ease",
              animation: `wave-shift ${8 + i * 2}s linear infinite`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
            viewBox="0 0 800 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q100,0 200,20 T400,20 T600,20 T800,20"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    </>
  );
}

export  function NeonGridBackground({ isRunning }: { isRunning: boolean }) {
  return (
    <>
      <style>{`
        @keyframes grid-scroll {
          0%   { background-position: 0 0;    }
          100% { background-position: 0 60px; }
        }
        @keyframes horizon-glow {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.7; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Horizon glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60%]"
          style={{
            background: "radial-gradient(ellipse at bottom, var(--primary), transparent 60%)",
            animation: isRunning ? "horizon-glow 3s ease-in-out infinite" : "none",
            opacity: isRunning ? undefined : 0.2,
            transition: "opacity 800ms ease",
          }}
        />

        {/* Perspective grid */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in oklab, var(--primary) 40%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklab, var(--primary) 40%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(300px) rotateX(60deg)",
            transformOrigin: "bottom",
            maskImage: "linear-gradient(to top, black 20%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 90%)",
            animation: "grid-scroll 3s linear infinite",
            opacity: isRunning ? 0.5 : 0.25,
            transition: "opacity 800ms ease",
          }}
        />
      </div>
    </>
  );
}

export  function FloatingOrbsBackground({ isRunning }: { isRunning: boolean }) {
  const orbs = [
    { x: "10%", y: "20%", s: 120, d: 12, delay: 0,   hue: 280 },
    { x: "75%", y: "15%", s: 90,  d: 15, delay: 2,   hue: 200 },
    { x: "20%", y: "70%", s: 100, d: 18, delay: 4,   hue: 330 },
    { x: "85%", y: "65%", s: 140, d: 14, delay: 1,   hue: 260 },
    { x: "45%", y: "45%", s: 80,  d: 16, delay: 3,   hue: 220 },
    { x: "60%", y: "85%", s: 110, d: 20, delay: 5,   hue: 300 },
  ];

  return (
    <>
      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0)     scale(1);    }
          25%      { transform: translate(30px, -40px) scale(1.1);  }
          50%      { transform: translate(-20px, -20px) scale(0.95); }
          75%      { transform: translate(20px, 30px)  scale(1.05); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {orbs.map((o, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              left: o.x,
              top: o.y,
              width: o.s,
              height: o.s,
              background: `radial-gradient(circle, oklch(0.7 0.2 ${o.hue}), transparent 70%)`,
              animation: `orb-float ${o.d}s ease-in-out infinite`,
              animationDelay: `${o.delay}s`,
              opacity: isRunning ? 0.5 : 0.25,
              transition: "opacity 1000ms ease",
            }}
          />
        ))}
      </div>
    </>
  );
}

export  function RipplesBackground({ isRunning }: { isRunning: boolean }) {
  return (
    <>
      <style>{`
        @keyframes ripple {
          0%   { transform: scale(0.4); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Ambient center glow */}
        <div
          className="absolute size-100 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 60%)",
            opacity: isRunning ? 0.3 : 0.12,
            transition: "opacity 800ms ease",
          }}
        />

        {/* Ripples only when running */}
        {isRunning &&
          [0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute size-60 rounded-full border"
              style={{
                borderColor: "color-mix(in oklab, var(--primary) 60%, transparent)",
                animation: `ripple 3s ease-out infinite`,
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}
      </div>
    </>
  );
}

