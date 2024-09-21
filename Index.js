import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you are importing from 'react-dom/client'
import Heading from "./component/Header";
import Body from "./component/Body";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import Contact from "./component/Contact";
import About from "./component/About";
import Error from "./component/Error";
import RestaurantMenu from "./component/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./component/Cart";


const AppLayout = () =>{

     return (
      <Provider store={appStore}>
      <div>
        <Heading />
        <Outlet />
      </div>
      </Provider>

     );
};

const appRouter = createBrowserRouter([

      {
           path : "/",
           element : <AppLayout />,
           children:[
             
            {
              path :"/",
              element : <Body />
           },

            {
              path :"/contact",
              element : <Contact />
           },
     
           {
               path:"/about",
               element: <About />
           },

           {
                path:"/cart",
                element : <Cart />
           },

           {
              path:"/restaurant/:resId",
              element: <RestaurantMenu />

           }
           ],
           errorElement :<Error />
      },

  
]);


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(<RouterProvider router={appRouter} />);