import { withSessionHOC } from "../src/services/session";

function AuthPageStatic(props) {

  return (
    <div>
      <h1>Auth Page Static</h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
      <p>
        <a href="/logout">Logout</a>
      </p>
    </div>
  );
};

export default withSessionHOC(AuthPageStatic);