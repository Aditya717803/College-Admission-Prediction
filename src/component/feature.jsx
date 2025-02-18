import React from 'react';
import { motion } from 'framer-motion';
import image from '../assets/Image1.png';

const Feature = () => {
  const features = [
    {
      icon: "data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E",
      title: "Predict Future Trends with Accuracy",
    },
    {
      icon: "data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'/%3E%3C/svg%3E",
      title: "Optimize Resource Allocation",
    },
    {
      icon: "data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z'/%3E%3C/svg%3E",
      title: "Improve Operational Efficiency",
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-medium text-center tracking-tighter text-white mb-6">
          Elevate Your Efforts
        </h2>
        <p className="text-white/70 text-lg tracking-tighter text-center mb-16">
        Unlock the power of AI to make smarter, more informed decisions about your college’s resources and enrollment management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              {/* Masked border animation container */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-purple-700 rounded-xl opacity-75 group-hover:opacity-100 
                            blur group-hover:blur-md transition-all duration-1000 animate-border-flow"></div>
              
              {/* Content container */}
              <div className="relative flex items-center space-x-4 p-4 bg-black rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-white/10 p-2.5 flex items-center justify-center group-hover:bg-purple-500 transition-all">
                  <img src={feature.icon} alt="" className="w-8 h-8 group-hover:fill-purple-500 transition-all" />
                </div>
                <h3 className="text-lg font-medium text-white">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes borderFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-border-flow {
          animation: borderFlow 8s ease infinite;
          background-size: 200% 200%;
        }
        .group:hover img {
          fill: #6b46c1; /* Change this color as per your need */
        }
      `}</style>
<div className="border border-white/20 rounded-2xl shadow-[0_0_50px_40px_rgba(140,69,255,0.1)] h-[750px] w-[1400px] mt-28 mx-auto ">
  <div className="flex items-center justify-center h-full">
    
    <img src={image} alt="" className="h-[700px] w-[1300px] rounded-2xl" />
  </div>
</div>

      
    </section>
    
  );
};

export default Feature;
