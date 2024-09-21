import { useDispatch } from "react-redux";
import { CDN_link } from "../utils/common";
import { incrementQuantity, decrementQuantity, removeItem, clearCart } from "../utils/cartSlice";

const ItemCart = ({ items }) => {
  const dispatch = useDispatch(); 

  const handleIncrementQuantity = (id) => {
    const itemExists = items.some(item => item?.card?.info?.id === id);
    if (itemExists) {
      dispatch(incrementQuantity({ id }));
    }
  }

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity({ id }));
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  }

  const handleClear = () => {
    dispatch(clearCart());
  }

  if (!items || items.length === 0) {
    return <div className="text-center py-8 text-gray-500">No items available</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 mb-8">
      <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 mb-6" onClick={handleClear}>
        Clear Cart
      </button>

      {items.map((cartItem) => (
        <div key={cartItem?.card?.info?.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-md flex items-center">
          <div className="flex-grow pr-4">
            <h2 className="font-bold text-xl text-gray-800">
              {cartItem?.card?.info?.name}
            </h2>
            <span className="block font-semibold text-gray-600 pt-2">
              ₹{cartItem?.card?.info?.defaultPrice / 100 || cartItem?.card?.info?.price / 100}
            </span>
            <p className="text-sm font-light text-gray-600 pt-3 max-w-[45em] line-clamp-2 overflow-hidden">
              {cartItem?.card?.info?.description}
            </p>
            <div className="flex mt-4 items-center">
              <button onClick={() => handleDecrementQuantity(cartItem?.card?.info?.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg mr-2 hover:bg-red-200 transition duration-300">-</button>
              <span className="px-4 py-1 bg-gray-200 rounded-lg text-gray-700">{cartItem.quantity}</span>
              <button onClick={() => handleIncrementQuantity(cartItem?.card?.info?.id)} className="px-3 py-1 bg-green-100 text-green-600 rounded-lg ml-2 hover:bg-green-200 transition duration-300">+</button>
            </div>
          </div>
          <div className="relative w-36 h-32">
            <img 
              src={CDN_link + cartItem?.card?.info?.imageId} 
              className="w-full h-full object-cover rounded-lg shadow-md" 
              alt={cartItem?.card?.info?.name} 
            />
            <button 
              onClick={() => handleRemoveItem(cartItem?.card?.info?.id)} 
              className="absolute top-2 right-1 px-2 py-1 bg-white text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition duration-300 shadow-md"
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCart;
