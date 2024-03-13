import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError() as Error;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, the page that you're trying to access doesn't exist.</p>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <Link to="/">Go back home</Link>
    </div>
  );
}
