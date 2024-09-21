import { useState } from "react"


const useOnlineStatus = () =>{

      const [onlineStatus,setonlineStatus] = useState("True");


      window.addEventListener("online", () => {
           setonlineStatus("True");
      });

      window.addEventListener("offline", () => {
        setonlineStatus("False");
   });


     return onlineStatus;
    
}

export default useOnlineStatus;