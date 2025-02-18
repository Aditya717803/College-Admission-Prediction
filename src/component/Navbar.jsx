import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // This will navigate to the login page
  };

  return (
    <header className="py-4 bg-black/90">
      <div className="max-w-screen-lg mx-auto px-2">
        <div className="flex justify-between items-center border border-violet-100/30 p-2.5 rounded-lg">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-white tracking-wide">
          <h1 className="text-2xl font-semibold tracking-tight bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.8))] text-transparent bg-clip-text border-transparent hover:border-4">Campusसारथी</h1>
          <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.8)_15%, rgb(14,0,36,.5)_78%,transparent)]"></div>
          </div>
          <div>
            <nav className="flex gap-8">
              <a href="#" className="text-white/70 font-semibold text-sm mx-2 hover:text-violet-500">Tab1</a>
              <a href="#" className="text-white/70 font-semibold text-sm mx-2 hover:text-violet-500">Tab2</a>
              <a href="#" className="text-white/70 font-semibold text-sm mx-2 hover:text-violet-500">Tab3</a>
            </nav>
          </div>

          <button
            className="relative px-6 py-2 rounded-lg font-semibold text-sm 
            bg-gradient-to-b from-[#2a0e5a] to-[#4a208a] 
            text-white shadow-[0px_5px_25px_#8c45ff] 
            transition-all duration-300 hover:scale-105 hover:shadow-[0px_5px_35px_#b362ff]"
            onClick={handleLoginClick} // Handle click
          >
            <div className="absolute inset-0 rounded-lg pointer-events-none">
              <div className="absolute inset-0 border border-white/20 rounded-lg 
                [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
              <div className="absolute inset-0 border border-white/40 rounded-lg 
                [mask-image:linear-gradient(to_top,black,transparent)]"></div>
              <div className="absolute inset-0 rounded-lg 
                shadow-[inset_0_0_10px_rgb(140,69,255,0.7)]"></div>
            </div>
            <span className="relative">Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
