import React from "react";

export function AuthLeftPanel() {
  return (
    <div className="relative hidden h-full w-full flex-col p-10 text-white lg:flex">
      <img
        src="/Card.png"
        alt="Card Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex items-center text-lg font-medium">
        <img
          src="https://alertmfb.com.ng/Logo.svg"
          alt="AlertLogo"
          className="mr-2 h-8 w-8"
        />
        Card Portal
      </div>

      <div className="relative z-10 m-auto text-center px-6 py-4 bg-black/50 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Card Management</h1>
        <p className="text-lg leading-relaxed">
          Access and manage all debit card operations,
          <br />
          request approvals, activations, PIN resets, and more.
          <br />
          From one secure portal.
        </p>
      </div>
    </div>
  );
}
