"use client";

import { useEffect, useRef } from "react";

const BARS = 15; // per side
const MIN_H = 4;
const MAX_H = 90;

type Props = { stream: MediaStream | null; active: boolean };

export function SoundBars({ stream, active }: Props) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
  const reset = () =>
    barRefs.current.forEach((el) => el && (el.style.height = `${MIN_H}px`));



  if (!stream || !active || stream.getAudioTracks().length === 0) {
    reset();
    return;
  }

  const ctx = new AudioContext();
  ctx.resume()
  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.8;
  source.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

    let raf = 0;

    const tick = () => {
      analyser.getByteFrequencyData(data);

            // refs 0..BARS-1 = left side (outer to inner), BARS..2*BARS-1 = right (inner to outer)
      barRefs.current.forEach((el, idx) => {
        if (!el) return;
        const isLeft = idx < BARS;
        const pos = isLeft ? idx : idx - BARS; // position within its cluster
        const bin = isLeft ? BARS - pos : pos + 1; // low frequencies sit near the orb
        const level = data[bin] / 255;
        const envelope = Math.sin((Math.PI * (pos + 0.5)) / BARS); // bell shape
        el.style.height = `${MIN_H + level * envelope * (MAX_H - MIN_H) * 1.4}px`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      source.disconnect();
      ctx.close();
      reset();
    };
  }, [stream, active]);

  const bar = (key: number) => (
    <span
      key={key}
      ref={(el) => {
        barRefs.current[key] = el;
      }}
      className="w-[2px] rounded-full bg-[#C6F135]/70"
      style={{ height: MIN_H }}
    />
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden items-center justify-center gap-[20rem] transition-opacity duration-500 md:flex ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-[6px]">
        {Array.from({ length: BARS }, (_, i) => bar(i))}
      </div>
      <div className="flex items-center gap-[6px]">
        {Array.from({ length: BARS }, (_, i) => bar(BARS + i))}
      </div>
    </div>
  );
}