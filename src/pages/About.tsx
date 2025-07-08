// import type { Route } from "./+types/about";

// export async function clientLoader({ params }: Route.LoaderArgs) {
//   // Simulate a data fetching
//   let title = params.title;
//   return {
//     title: title,
//   };
// }

export default function About() {
  return (
    <div className="p-4">
      <h1>About Us</h1>
      <span>
        <img
          src="/favicon.ico"
          alt="Cloud 9 Cafe Logo"
          className="w-16 h-16 mb-4"
        />
      </span>
      <p>
        Welcome to Cloud 9 Cafe. <br />
        Here you will find a magnificent collection of coffee drinks from all
        over the world. <br />
        If you are a creative coffee lover, you can share your original coffee
        drink with others here. <br />
        Inspire!
      </p>
    </div>
  );
}
