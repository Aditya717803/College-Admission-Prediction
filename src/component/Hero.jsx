import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';  // Import the TypeAnimation component

export default function MathGridBackground() {
  const [hoverArea, setHoverArea] = useState(null);
  const gridSize = 40;

  const handleMouseMove = (e) => {
    const grid = e.target;
    const rect = grid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xIndex = Math.floor(x / gridSize) * gridSize;
    const yIndex = Math.floor(y / gridSize) * gridSize;

    setHoverArea({ x: xIndex, y: yIndex });
  };

  const handleMouseLeave = () => {
    setHoverArea(null);
  };

  return (
    <div
      className="relative w-full h-screen bg-black flex justify-center items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(to_right,white_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      {/* Side Fade Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left fade */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black to-transparent" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black to-transparent" />
        {/* Top fade */}
        <div className="absolute left-0 top-0 w-full h-44 bg-gradient-to-b from-black to-transparent" />
        {/* Bottom fade */}
        <div className="absolute left-0 bottom-0 w-full h-60 bg-gradient-to-t from-black to-transparent" />
      </div>
      {/* Enhanced Glowing Effect */}
      {hoverArea && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${hoverArea.x - gridSize}px`,
            top: `${hoverArea.y - gridSize}px`,
            width: `${gridSize * 3}px`,
            height: `${gridSize * 3}px`,
          }}
        >
          {/* Center Grid Cell */}
          <div
            className="absolute"
            style={{
              left: `${gridSize}px`,
              top: `${gridSize}px`,
              width: `${gridSize}px`,
              height: `${gridSize}px`,
              background: 'linear-gradient(45deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05))',
              boxShadow: '0 0 15px 2px rgba(168,85,247,0.2)',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
          />

          {/* Horizontal Lines */}
          <div className="absolute left-0 right-0 h-[1px] top-[40px] bg-purple-500 shadow-[0_0_15px_3px_rgba(168,85,247,0.5)] opacity-80" />
          <div className="absolute left-0 right-0 h-[1px] top-[80px] bg-purple-500 shadow-[0_0_15px_3px_rgba(168,85,247,0.5)] opacity-80" />
          
          {/* Vertical Lines */}
          <div className="absolute top-0 bottom-0 w-[1px] left-[40px] bg-purple-500 shadow-[0_0_15px_3px_rgba(168,85,247,0.5)] opacity-80" />
          <div className="absolute top-0 bottom-0 w-[1px] left-[80px] bg-purple-500 shadow-[0_0_15px_3px_rgba(168,85,247,0.5)] opacity-80" />

          {/* Corner Accents */}
          <div className="absolute w-2 h-2 left-[38px] top-[38px] bg-purple-500 rounded-full opacity-50" />
          <div className="absolute w-2 h-2 left-[78px] top-[38px] bg-purple-500 rounded-full opacity-50" />
          <div className="absolute w-2 h-2 left-[38px] top-[78px] bg-purple-500 rounded-full opacity-50" />
          <div className="absolute w-2 h-2 left-[78px] top-[78px] bg-purple-500 rounded-full opacity-50" />

          {/* Pulse Animation */}
          <div 
            className="absolute animate-pulse"
            style={{
              left: `${gridSize}px`,
              top: `${gridSize}px`,
              width: `${gridSize}px`,
              height: `${gridSize}px`,
              background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="text-center ">
      {/* <div className="absolute -inset-x-9 flex items-center justify-center">
      <div className="w-[500px] rounded-lg   shadow-[0_0_50px_40px_rgba(140,69,255,0.1)]"></div>

      </div> */}
      
        <h1 className="text-8xl font-semibold tracking-tight bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text border-transparent hover:border-4">Campusसारथी</h1>
        <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%, rgb(14,0,36,.5)_78%,transparent)]"></div>
        <TypeAnimation
          sequence={[
            '"Guiding your institution’s growth with AI-driven enrollment forecasting and resource optimization."', 
            10000, // Delay after typing finishes
          ]}
          speed={50} // Speed of typing effect
          wrapper="p"
          className="text-lg text-white/70 mt-7"
          cursor={true} // To show the cursor
        />

        <button className="relative px-6 py-2 rounded-lg font-semibold text-sm 
          bg-gradient-to-b from-[#2a0e5a] to-[#4a208a] 
          text-white shadow-[0px_5px_25px_#8c45ff] 
          transition-all duration-300 hover:scale-105 hover:shadow-[0px_5px_35px_#b362ff] mt-7">
          <div className="absolute inset-0 rounded-lg pointer-events-none">
            <div className="absolute inset-0 border border-white/20 rounded-lg 
              [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
            <div className="absolute inset-0 border border-white/40 rounded-lg 
              [mask-image:linear-gradient(to_top,black,transparent)]"></div>
            
            <div className="absolute inset-0 rounded-lg 
              shadow-[inset_0_0_10px_rgb(140,69,255,0.7)]"></div>
          </div>

          <span className="relative">Get Started</span>
        </button>
      </div>
    </div>
  );
}
