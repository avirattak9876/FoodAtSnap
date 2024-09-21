import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurentMenu = () => {
    const { resId } = useParams();
    const resinfo = useResMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if (resinfo == null) {
        return <Shimmer />;
    }

    const {
        name,
        cuisines,
        areaName,
        avgRatingString,
        totalRatingsString,
        city,
        locality,      
        costForTwoMessage,
        aggregatedDiscountInfo,
    } = resinfo?.cards[2]?.card?.card?.info || {};

    let categoryCardsArray = resinfo?.categoryCardsData || [];

    // Filter out categories with no items
    categoryCardsArray = categoryCardsArray.filter(category => category?.card?.card?.itemCards?.length > 0);

    return (
        <div className="restaurant-menu-container mt-8 max-w-5xl mx-auto px-4">
            {/* Top section containing breadcrumb */}
            <div className="top-section text-sm text-gray-500">
                <p>Home / {city} / {locality} / {areaName} / <span className="font-semibold">{name}</span></p>
            </div>

            {/* Restaurant details section */}
            <div className="restaurant-details mt-8">
                <h2 className="text-3xl font-bold mb-4">{name}</h2>
               
                <div className="restaurant-info  bg-white rounded-lg shadow-lg shadow-orange-300 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rating bg-green-500 text-white rounded-lg px-3 py-1 flex items-center font-semibold">
                            <span>⭐ {avgRatingString}</span>
                            <span className="ml-2">({totalRatingsString})</span>
                        </div>
                        <div className="cost-for-two">
                            <span className="font-semibold">Average Cost: {costForTwoMessage}</span>
                        </div>
                    </div>

                    <div className="cuisines">
                        <p className="text-orange-500 font-semibold">Cuisines: {cuisines.join(", ")}</p>
                    </div>

                    <div className="discount-info mt-4">
                        <p className="text-orange-700">{aggregatedDiscountInfo?.descriptionList[0]?.meta}</p>
                        <p className="text-orange-700">{aggregatedDiscountInfo?.descriptionList[1]?.meta}</p>
                    </div>
                </div>
            </div>

            <div className="menu-categories mt-[5em]">
                {categoryCardsArray.map((category, index) => (
                    <RestaurantCategory 
                        key={index}
                        data={category?.card?.card} 
                        showItems={index === showIndex}
                        setshow={() => setShowIndex(index === showIndex ? null : index)}  
                    />
                ))}
            </div>
        </div>
    );
};

export default RestaurentMenu;
