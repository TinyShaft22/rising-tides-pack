import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { COLORS } from "./theme";
import { SunraysBackground } from "./scenes/SunraysBackground";
import { PainPoints } from "./scenes/PainPoints";
import { LogoReveal } from "./scenes/LogoReveal";
import { WhatYouGet } from "./scenes/WhatYouGet";
import { TheCLIs } from "./scenes/TheCLIs";
import { TheMCPs } from "./scenes/TheMCPs";
import { HowItWorks } from "./scenes/HowItWorks";
import { ContextEfficiency } from "./scenes/ContextEfficiency";
import { OneCommandInstall } from "./scenes/OneCommandInstall";
import { CallToAction } from "./scenes/CallToAction";

/**
 * Rising Tides Promo Video v2 - 112 seconds (3360 frames at 30fps)
 *
 * Timeline:
 * 0-12s     (0-360)      Pain Points - The problems we solve
 * 12-20s    (360-600)    Logo Reveal - Brand introduction
 * 20-40s    (600-1200)   What You Get - Installation tree
 * 40-55s    (1200-1650)  The CLIs - 9 CLI cards
 * 55-70s    (1650-2100)  The MCPs - MCP capabilities
 * 70-82s    (2100-2460)  How It Works - Auto-discovery flow
 * 82-92s    (2460-2760)  Context Efficiency - The magic stats
 * 92-102s   (2760-3060)  One Command Install - Easy setup
 * 102-112s  (3060-3360)  Call to Action - CTA + close
 */
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Voiceover audio */}
      <Audio src={staticFile("voiceover.mp3")} />

      {/* Persistent sun rays behind everything */}
      <SunraysBackground />

      {/* Scene 1: Pain Points (0s - 12s) */}
      <Sequence from={0} durationInFrames={360}>
        <PainPoints />
      </Sequence>

      {/* Scene 2: Logo Reveal (12s - 20s) */}
      <Sequence from={360} durationInFrames={240}>
        <LogoReveal />
      </Sequence>

      {/* Scene 3: What You Get - Installation tree (20s - 40s) */}
      <Sequence from={600} durationInFrames={600}>
        <WhatYouGet />
      </Sequence>

      {/* Scene 4: The CLIs - 9 CLI cards (40s - 55s) */}
      <Sequence from={1200} durationInFrames={450}>
        <TheCLIs />
      </Sequence>

      {/* Scene 5: The MCPs - MCP capabilities (55s - 70s) */}
      <Sequence from={1650} durationInFrames={450}>
        <TheMCPs />
      </Sequence>

      {/* Scene 6: How It Works - Auto-discovery (70s - 82s) */}
      <Sequence from={2100} durationInFrames={360}>
        <HowItWorks />
      </Sequence>

      {/* Scene 7: Context Efficiency - Stats (82s - 92s) */}
      <Sequence from={2460} durationInFrames={300}>
        <ContextEfficiency />
      </Sequence>

      {/* Scene 8: One Command Install (92s - 102s) */}
      <Sequence from={2760} durationInFrames={300}>
        <OneCommandInstall />
      </Sequence>

      {/* Scene 9: Call to Action (102s - 112s) */}
      <Sequence from={3060} durationInFrames={300}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
