import React, { useEffect, useState } from "react";
import Restaurant, { HigherRestaurant } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useUserLocation from "../utils/useUserLocation";
const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filterofRestaurants, setFilterofRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const { location, error } = useUserLocation();
  const { latitude, longitude } = location;

  useEffect(() => {
    if (latitude && longitude) {
      getRestaurants(latitude, longitude);
    }
  }, [latitude, longitude]);

  const getRestaurants = async (lat, lng) => {
    try {
      const data = await fetch(
        `https://foodfire.onrender.com/api/restaurants?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`
      );

      const json = await data.json();

      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const resData = await checkJsonData(json);

      setListofRestaurants(resData);
      setFilterofRestaurants(resData);

    } catch (error) {
      console.log(error);
    }
  };

  const status = useOnlineStatus();

  if (!status) {
    return <h1 className="text-center text-red-600 mt-4">You are currently offline</h1>
  }

  if (error) {
    return <h1 className="text-center text-red-600 mt-4">{error}</h1>;
  }

  const filterTopRatedRestaurants = () => {
    const filteredList = listofRestaurants.filter(
      (res) => res?.info?.avgRating > 4.5
    );
    setFilterofRestaurants(filteredList);
    setShowClearButton(true);
  };

  const clearFilters = () => {
    setSearchText("");
    setFilterofRestaurants(listofRestaurants);
    setShowClearButton(false);
  };

  const filterSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilterofRestaurants(listofRestaurants);
    } else {
      const filteredList = listofRestaurants.filter(
        (res) => res?.info?.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilterofRestaurants(filteredList);
    }
  };

  const PureVEG = HigherRestaurant(Restaurant);

  return listofRestaurants.length === 0 ? <Shimmer /> : (
    <>
      <div className="filters flex gap-6 items-center mt-9 ml-5 justify-center flex-wrap">
        <div className="searching flex items-center bg-white rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-64 h-10 px-3 border border-gray-300 rounded-l-md focus:outline-none"
            value={searchText}
            onChange={(e) => filterSearch(e.target.value)}
          />
          <button className="px-4 py-2 bg-green-400 text-white rounded-r-md hover:bg-green-500 focus:outline-none" onClick={() => filterSearch(searchText)}>
            Search
          </button>
        </div>
        <div className="relative">
          <button className="px-6 py-2 w-[14em] font-semibold bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none" onClick={filterTopRatedRestaurants}>
            Top Ratings
          </button>
          {showClearButton && (
            <button className="absolute right-0 top-0 px-3 py-2 font-bold  text-gray-700 rounded-md ml-2 focus:outline-none" onClick={clearFilters}>
              X
            </button>
          )}
        </div>
      </div>
      <div className="restaurantList mt-6 flex flex-wrap p-10 gap-6 justify-center">
        {filterofRestaurants.map((restaurant) => (
          <Link className="link-cards" to={"/restaurant/" + restaurant?.info.id} key={restaurant?.info.id}>
            {
              restaurant?.info?.veg ? <PureVEG {...restaurant} /> : <Restaurant {...restaurant?.info} />
            }
          </Link>
        ))}
      </div>
    </>
  );
};

export default Body;
