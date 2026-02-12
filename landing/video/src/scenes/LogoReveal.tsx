import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Initial fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "There's a better way" intro text
  const introOpacity = interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Wave and brand appear after intro
  const waveScale = spring({
    frame: frame - 50, fps,
    config: { damping: 8, stiffness: 200, mass: 0.5 },
  });

  // Golden burst effect
  const burstOpacity = interpolate(frame, [50, 65, 120], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const burstScale = interpolate(frame, [50, 120], [0.3, 3], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Brand name animation
  const brandText = "Rising Tides";
  const brandStart = 70;

  // "Pack" subtitle
  const starterOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const starterY = interpolate(frame, [130, 150], [15, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Tagline
  const tagOpacity = interpolate(frame, [160, 180], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [160, 180], [15, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Final fade out
  const fadeOut = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* "There's a better way" intro */}
      <div
        style={{
          position: "absolute",
          fontFamily: FONT.sans,
          fontSize: 48,
          color: COLORS.textBright,
          opacity: introOpacity,
          textShadow: `0 0 30px ${COLORS.accent}40`,
        }}
      >
        There's a better way.
      </div>

      {/* Bright orange burst */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentHot}90 0%, ${COLORS.accentBright}60 25%, ${COLORS.accent}30 50%, transparent 70%)`,
          opacity: burstOpacity,
          transform: `scale(${burstScale})`,
          filter: "blur(30px)",
        }}
      />

      <div style={{ textAlign: "center", position: "relative" }}>
        {/* The ~ wave — much stronger glow */}
        <div
          style={{
            fontSize: 150,
            fontFamily: FONT.mono,
            color: COLORS.accentBright,
            transform: `scale(${Math.max(0, waveScale)})`,
            textShadow: `
              0 0 30px ${COLORS.accentBright},
              0 0 60px ${COLORS.accent}cc,
              0 0 120px ${COLORS.accent}80,
              0 0 200px ${COLORS.accentDim}40
            `,
            lineHeight: 1,
            marginBottom: 10,
            opacity: frame > 50 ? 1 : 0,
          }}
        >
          ~
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 82,
            fontFamily: FONT.mono,
            fontWeight: 700,
            color: COLORS.textBright,
            letterSpacing: -2,
            display: "flex",
            justifyContent: "center",
            opacity: frame > 50 ? 1 : 0,
          }}
        >
          {brandText.split("").map((char, i) => {
            const charFrame = brandStart + i * 3;
            const charOpacity = interpolate(frame, [charFrame, charFrame + 8], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            const charY = interpolate(frame, [charFrame, charFrame + 8], [20, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            return (
              <span
                key={i}
                style={{
                  opacity: charOpacity,
                  transform: `translateY(${charY}px)`,
                  display: "inline-block",
                  minWidth: char === " " ? 22 : undefined,
                  textShadow: `0 0 20px ${COLORS.accentBright}40`,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* "Starter Pack" subtitle - combines with "Rising Tides" above */}
        <div
          style={{
            fontSize: 36,
            fontFamily: FONT.mono,
            fontWeight: 600,
            color: COLORS.accentBright,
            opacity: starterOpacity,
            transform: `translateY(${starterY}px)`,
            marginTop: 12,
            textShadow: `0 0 20px ${COLORS.accent}60`,
          }}
        >
          Starter Pack
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            fontFamily: FONT.sans,
            color: COLORS.purpleBright,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            marginTop: 20,
            letterSpacing: 1,
          }}
        >
          The complete starter pack for Claude Code.
        </div>
      </div>
    </AbsoluteFill>
  );
};
