import { withSession } from "../src/services/session";

function AuthPageSSR(props) {
  return (
    <div>
      <h1>Auth Page ServerSide Render</h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default AuthPageSSR;

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
});

// Código cru, antes de ser abstraido pelo withSession
// export async function getServerSideProps(ctx) {
//   try {
//     const session = await authService.getSession(ctx);
//     return {
//       props: {
//         session
//       }
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/?error=401'
//       }
//     }
//   }
// };