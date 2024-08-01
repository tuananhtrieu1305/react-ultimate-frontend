import { useRouteError } from "react-router-dom";
import "./notfound.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="wrapper-error">
      <div id="error-page" className="container-error">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <div className="back">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
