// import type { Route } from "./+types/about";

import { Button } from "@/components/ui/button";

// export async function clientLoader({ params }: Route.LoaderArgs) {
//   // Simulate a data fetching
//   let title = params.title;
//   return {
//     title: title,
//   };
// }

// export default function About() {
//   return (
//     <div className="pt-4">
//       <h1 className="text-2xl font-bold mb-4">About Us</h1>
//       <span>
//         <img
//           src="/favicon.ico"
//           alt="Cloud 9 Cafe Logo"
//           className="w-20 h-20 mb-4"
//         />
//       </span>
//       <p>
//         <h2 className="text-xl font-bold mb-2">Welcome to Cloud 9 Cafe. </h2>
//         Here you will find a magnificent collection of coffee drinks from all
//         over the world. <br />
//         If you are a creative coffee lover, you can share your original coffee
//         drink with others here. <br />
//         Inspire!
//       </p>
//     </div>
//   );
// }
export default function About() {
  return (
    <div className="max-w-xl mx-auto mt-12 bg-white/80 dark:bg-zinc-900/80 rounded-xl shadow-lg p-8 flex flex-col items-center">
      <img
        src="/favicon.ico"
        alt="Cloud 9 Cafe Logo"
        className="w-20 h-20 mb-4 rounded-full border-2 border-cafe-theme shadow"
      />
      <h1 className="text-3xl font-extrabold mb-2 text-cafe-theme">About Us</h1>
      <h2 className="text-xl font-semibold mb-4">Welcome to Cloud 9 Cafe</h2>
      <p className="text-base text-gray-700 dark:text-gray-300 text-center mb-2">
        Here you will find a magnificent collection of coffee drinks from all
        over the world.
      </p>
      <p className="text-base text-gray-700 dark:text-gray-300 text-center">
        If you are a creative coffee lover, you can share your original coffee
        drink with others here.
        <br />
        <span className="font-semibold text-cafe-theme">Inspire!</span>
      </p>
      <Button className="mt-6" variant="default" size="lg" asChild>
        <a href="/sign-up">Join the Community</a>
      </Button>
    </div>
  );
}
