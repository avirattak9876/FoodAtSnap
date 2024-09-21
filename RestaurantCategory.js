import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setshow }) => {
  const handleClick = () => {
    setshow();
  };

  return (
    <div className="ml-[3em] w-[55em] shadow-lg  p-6 my-8 bg-white rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <div
        className="flex justify-between items-center font-bold text-xl cursor-pointer p-4 bg-green-50 rounded-lg hover:bg-green-100"
        onClick={handleClick}
      >
        <span>{data?.title} ({data?.itemCards?.length})</span>
        <span>&#11167;</span>
      </div>

      <div>
        {showItems && <ItemList items={data?.itemCards} id={data?.itemCards?.info?.id} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
