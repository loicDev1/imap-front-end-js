import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div  style={{textAlign:"center"}}>
      
      <span class="loaderperso"></span>
      
    </div>
  );
}

export default ErrorPage