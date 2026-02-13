import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { COLORS } from "./theme";
import { SunraysBackground } from "./scenes/SunraysBackground";
import { PainPoints } from "./scenes/PainPoints";
import { LogoReveal } from "./scenes/LogoReveal";
import { WhatYouGet } from "./scenes/WhatYouGet";
import { TheCLIs } from "./scenes/TheCLIs";
import { TheMCPs } from "./scenes/TheMCPs";
import { HowItWorks } from "./scenes/HowItWorks";
import { OneCommandInstall } from "./scenes/OneCommandInstall";
import { CallToAction } from "./scenes/CallToAction";

/**
 * Rising Tides Promo Video v3 - 111 seconds (3330 frames at 30fps)
 *
 * Timeline (adjusted to match actual voiceover duration):
 * 0-14s     (0-420)      Pain Points - The problems we solve
 * 14-23s    (420-690)    Logo Reveal - Brand introduction
 * 23-40s    (690-1200)   What You Get - Installation tree
 * 40-57s    (1200-1710)  The CLIs - 9 CLI cards
 * 57-74s    (1710-2220)  The MCPs - MCP capabilities
 * 74-86s    (2220-2580)  How It Works - Auto-discovery flow
 * 86-98s    (2580-2940)  One Command Install - Easy setup
 * 98-111s   (2940-3330)  Call to Action - CTA + close
 */
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Voiceover audio */}
      <Audio src={staticFile("voiceover-v4.mp3")} />

      {/* Persistent sun rays behind everything */}
      <SunraysBackground />

      {/* Scene 1: Pain Points (0s - 14s) */}
      <Sequence from={0} durationInFrames={420}>
        <PainPoints />
      </Sequence>

      {/* Scene 2: Logo Reveal (14s - 23s) */}
      <Sequence from={420} durationInFrames={270}>
        <LogoReveal />
      </Sequence>

      {/* Scene 3: What You Get - Installation tree (23s - 40s) */}
      <Sequence from={690} durationInFrames={510}>
        <WhatYouGet />
      </Sequence>

      {/* Scene 4: The CLIs - 9 CLI cards (40s - 57s) */}
      <Sequence from={1200} durationInFrames={510}>
        <TheCLIs />
      </Sequence>

      {/* Scene 5: The MCPs - MCP capabilities (57s - 74s) */}
      <Sequence from={1710} durationInFrames={510}>
        <TheMCPs />
      </Sequence>

      {/* Scene 6: How It Works - Auto-discovery (74s - 86s) */}
      <Sequence from={2220} durationInFrames={360}>
        <HowItWorks />
      </Sequence>

      {/* Scene 7: One Command Install (86s - 98s) */}
      <Sequence from={2580} durationInFrames={360}>
        <OneCommandInstall />
      </Sequence>

      {/* Scene 8: Call to Action (98s - 111s) */}
      <Sequence from={2940} durationInFrames={390}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
