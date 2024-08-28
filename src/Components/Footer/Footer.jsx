import React, { useState } from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-200 py-10 px-4 ">
        <div className="container">
          <h2>Get the FreshCart app</h2>
          <p>
            we will send you a link open it on your phone to download the app
          </p>
          <div className="flex flex-wrap items-center justify-between my-5">
            <input
              type="email"
              id="email-address-icon"
              className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 block w-3/4"
              placeholder="Email"
            />
            <button className="px-6 py-1 bg-emerald-600 hover:bg-emerald-700 cursor-pointer rounded-lg text-white">
              Share App Link
            </button>
          </div>
          <hr className="bg-gray-300 h-[1.2px]" />
          <div className="flex items-center justify-between my-5">
            <div className="w-1/3">
              <p>Payment Partners </p>
            </div>
            <div className="w-1/3">
              <p>Get deliveries with FreshCart</p>
            </div>
          </div>
          <hr className="bg-gray-300 h-[1.2px]" />
          <hr className="bg-gray-300 h-[1.2px]" />
        </div>
      </footer>
    </>
  );
}