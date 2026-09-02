export default function ThemeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-transparent">
      <div 
        className="absolute inset-0 opacity-[0.45] dark:opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div 
        className="
          absolute 
          top-[-10%] 
          left-[-5%] 
          w-[600px] 
          h-[600px] 
          rounded-full 
          bg-cyan-200/20 
          blur-[130px] 
          dark:opacity-0
        " 
      />

      <div
        className="
          absolute
          top-[25%]
          right-[-10%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-violet-200/25
          blur-[140px]
          dark:opacity-0
        "
      />

      <div
        className="
          absolute
          bottom-[-15%]
          left-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-200/20
          blur-[110px]
          dark:opacity-0
        "
      />

      <div
        className="absolute inset-0 opacity-0 dark:opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="
          absolute
          left-1/2
          top-[-180px]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-transparent
          blur-[140px]
          dark:bg-[#FF7700]/[0.06]
        "
      />

      <div
        className="
          absolute
          bottom-[-250px]
          right-[-150px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-transparent
          blur-[140px]
          dark:bg-[#FF2200]/[0.035]
        "
      />
    </div>
  );
}
