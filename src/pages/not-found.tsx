import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, the page that you're trying to access doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
