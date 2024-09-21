import { useDispatch } from "react-redux";
import { CDN_link } from "../utils/common";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
    
   const dispatch = useDispatch(); 

  const handleAddItem = (item) =>{
       
     dispatch(addItem(item));
     
  }

  if (!items) {
    return <div>No items available</div>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item?.card?.info?.id} className="mt-[1.3em] border-b-2 pb-7">
          <div className="flex justify-between">
            <div className="flex-grow">
              <h2 className="font-bold">
                {item?.card?.info?.name} <br />
                <span className="font-semibold pt-2">
                  ₹{item?.card?.info?.defaultPrice / 100 || item?.card?.info?.price / 100}
                </span>
              </h2>
              <p className="text-sm font-thin pt-3 overflow-hidden text-ellipsis max-w-[45em] max-h-[3.6em] line-clamp-2">
                {item?.card?.info?.description}
              </p>
            </div>
            <div className="relative w-36 h-32">
              <img 
                src={CDN_link + item?.card?.info?.imageId} 
                className="w-full h-full object-cover rounded-lg" 
                alt={item?.card?.info?.name} 
              />
              <button onClick={() => handleAddItem(item)} className="absolute px-6 py-2 border-2 bottom-[-0.8em] z-5 font-bold left-7 text-[1.2em] bg-white text-green-500 text-xs rounded-lg hover:bg-green-500 hover:text-white transition duration-300 ">
                ADD+
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
