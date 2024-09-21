// src/utils/useResMenu.js
import { useState, useEffect } from "react";
import useUserLocation from "./useUserLocation";

const useResMenu = (resId) => {
  const [resinfo, setResinfo] = useState(null);
  const { location, error } = useUserLocation()
  const { latitude, longitude } = location;

  useEffect(() => {
    const fetchData = async () => {
      if (latitude && longitude) {
        try {
          const response = await fetch(
            `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resId}`
          );
          const data = await response.json();


          const findCategoryCards = (jsonData) => {
            const cards = jsonData?.data?.cards;
            if (cards) {
              for (let i = 0; i < cards.length; i++) {
                const categoryCards = cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
                if (categoryCards) {
                  const filteredCategoryCards = categoryCards.filter((c) => {
                    const cardType = c?.card?.card?.["@type"];
                    return (
                      cardType === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
                      cardType === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
                    );
                  });
                  if (filteredCategoryCards.length > 0) {
                    return filteredCategoryCards;
                  }
                }
              }
            }
            return [];
          };

          const categoryCardsData = findCategoryCards(data);
         
          setResinfo({ ...data.data, categoryCardsData });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [resId, latitude, longitude]);

  if (error) {
    console.error("Location error:", error);
  }

  return resinfo;
};

export default useResMenu;
