export default function MountainBackground() {
  return (
    <div
      className="fixed inset-0 z-10 overflow-hidden bg-black/5"
      aria-hidden="true"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/mountain-clouds.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark charcoal overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Subtle DevPulse gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF2200]/10 via-transparent to-[#FFDD00]/10" />
    </div>
  );
}