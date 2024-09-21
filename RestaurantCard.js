import React from "react";
import { CDN_link } from "../utils/common";

const Restaurant = ({ name, cloudinaryImageId, cuisines, costForTwo, avgRating, sla }) => {
  return (
    <div className="restaurant-card w-[18em] h-[20em] relative bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
      <img src={CDN_link + cloudinaryImageId} alt={name} className="w-full h-[11em] object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
        {cuisines && (
          <p className="text-sm text-gray-600 mb-2 truncate" title={cuisines.join(", ")}>
            Cuisines: {cuisines.join(", ")}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-yellow-500">{avgRating} ⭐</p>
          <p className="text-lg font-semibold text-yellow-500">{sla.slaString}</p>
        </div>
        <p className="mt-2 text-sm text-orange-600 font-bold text-center">({costForTwo} for two)</p>
      </div>
    </div>
  );
};

export const HigherRestaurant = (Restaurant) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="pure-veg-label absolute top-2 left-2 bg-green-500 text-white z-10 p-1 rounded-md shadow-md">
          PURE VEG
        </label>
        <Restaurant {...props?.info} />
      </div>
    );
  };
};

export default Restaurant;
