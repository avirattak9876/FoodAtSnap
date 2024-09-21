import { useSelector } from "react-redux";
import ItemCart from "./ItemCart";
import Shimmer from "./Shimmer";

 
 const Cart = () =>{
        
   const cartItems = useSelector((store) => store.cart.items);
   
        
      return(
         <div>
             
             <div className=" w-[48em] ml-[15em]">
                 <ItemCart items={cartItems}  />
                
             </div>
         </div>
      )
 }

 export default Cart;