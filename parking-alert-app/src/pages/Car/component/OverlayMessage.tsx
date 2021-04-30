import React from "react";
const OverlayMessage: React.FC<{
  code?: string;
  title: string;
  subtitle?: string;
}> = ({ code, title, subtitle }) => {
  return (
    <div>
      <div className="absolute h-screen w-screen block bg-gray-400	 opacity-50 z-10"></div>
      <div className="absolute h-screen w-screen block z-20">
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="animate-bounce rounded-xl bg-purple-600 p-10">
            <p className="font-bold text-5xl text-white">{code}</p>
            <p className="font-bold text-5xl text-white">{title}</p>
            <p className="font-normal text-2xl text-white">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayMessage;
