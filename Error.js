import { useRouteError } from "react-router-dom";

const Error = () =>{
       const err = useRouteError();
    return(
         
        <>
          <h2>Oops there is Error</h2>
          <h3>{err.status} : {err.statusText}</h3>
          
        </>
          
    );
}

export default Error;