import React from "react";

export default function StarRating({ ratingsAverage }) {
  const rating = Math.min(Math.max(ratingsAverage, 0), 5);
  const percentage = (rating / 5) * 100;

  return (
    <div className="relative inline-block text-gray-300">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <i key={index} className="fas fa-star text-lg"></i>
        ))}
      </div>
      <div
        className="absolute top-0 left-0 flex space-x-1 overflow-hidden text-yellow-500"
        style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
      >
        {[...Array(5)].map((_, index) => (
          <i key={index} className="fas fa-star text-lg"></i>
        ))}
      </div>
    </div>
  );
}
