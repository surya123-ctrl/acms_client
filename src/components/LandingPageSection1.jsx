import React from "react";

const LandingPageSection1 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-20">
          Empower Your Legal Practice with Advocate Case Management System
        </h1>
        <h2 className="text-4xl font-semibold mb-8">
          Streamline your workflow, manage clients and cases efficiently, and
          communicate seamlessly with the Advocate case management system. Focus
          on winning cases while we take care of the rest.
        </h2>
        <div className="flex space-x-4 justify-center">
          <button className="button-transition bg-lime-400 text-xl text-white px-4 py-2 rounded border border-lime-400 relative overflow-hidden">
            <span className="relative z-10">Get Started</span>
          </button>
          <button className="button-transition text-xl text-white px-4 py-2 rounded border border-lime-400 relative overflow-hidden">
            <span className="relative z-10">Secondary Action</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection1;
