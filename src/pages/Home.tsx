// import type { Route } from "./+types/about";

// export async function loader({ request }: Route.LoaderArgs) {
//   const data = await fetchApiFromServer({ request }); // (1)
//   return data;
// }

// export async function clientLoader({ request }: Route.ClientLoaderArgs) {
//   const data = await fetchApiFromClient({ request }); // (2)
//   return data;
// }

// export async function clientLoader({ params }: Route.LoaderArgs) {
//   // Simulate a data fetching
//   let title = params.title;
//   return {
//     title: title,
//   };
// }

function Home() {
  return <div>Home</div>;
}

export default Home;
