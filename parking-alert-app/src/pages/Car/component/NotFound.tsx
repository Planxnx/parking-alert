import React from "react";
const NotFoundScreen: React.FC = () => {
  return (
    <div>
      <div className="absolute h-screen w-screen block bg-gray-400	 opacity-50 z-10"></div>
      <div className="absolute h-screen w-screen block z-20">
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="animate-bounce rounded-xl bg-purple-600 p-10">
            <p className="font-bold text-5xl text-white">
              404
              <br />
              NotFound!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
