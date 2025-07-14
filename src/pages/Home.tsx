import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useEffect, useState } from "react";

export default function Home() {
  type coffee = {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    image: string;
  };
  const [coffees, setCoffees] = useState<coffee[]>([]);

  console.log("fetched coffee data:", coffees);
  useEffect(() => {
    async function fetchApiData() {
      try {
        const res = await fetch(`https://api.sampleapis.com/coffee/hot`);
        console.log("Response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          setCoffees(data);
        } else throw new Error("Failed to fetch coffee data");
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      }
    }
    fetchApiData();
  }, []);
  const CoffeeCard = (coffee: coffee) => {
    const { title, image } = coffee;
    return (
      <div className="hover:cursor-pointer">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img src={image} alt={title} width={300} height={600} />
          </CardContent>
        </Card>
      </div>
    );
  };

  // const CoffeeDetailCard = (coffee: coffee) => {
  //   const { id, title, description, ingredients, image } = coffee;

  //   return (
  //     <div className="hover:cursor-pointer">
  //       <Card className="h-full">
  //         <CardHeader>
  //           <CardTitle>{title}</CardTitle>
  //         </CardHeader>
  //         <CardContent className="justify-center">
  //           <img src={image} alt={title} width={300} height={600} />
  //           <div className="mt-4">
  //             <p>{description}</p>
  //             <h2 className="text-lg font-semibold">Ingredients:</h2>
  //             <ul className="list-disc pl-5">
  //               {ingredients.map((ingredient, index) => (
  //                 <li key={index}>{ingredient}</li>
  //               ))}
  //             </ul>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  // <div>
  //   <Card>
  //     <CardContent>
  //       <CoffeeCard {...coffee} />
  //       <div className="mt-4">
  //         <p>{description}</p>
  //         <h2 className="text-lg font-semibold">Ingredients:</h2>
  //         <ul className="list-disc pl-5">
  //           {ingredients.map((ingredient, index) => (
  //             <li key={index}>{ingredient}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     </CardContent>
  //   </Card>
  // </div>
  // );
  // };

  return (
    <div className="space-y-4 mt-4">
      <h1>Welcome to Cloud 9 Café</h1>
      <p>
        Explore our selection of coffees and sign in to share your original
        coffee creations!
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
        {coffees.map((coffee: coffee) => (
          <li key={coffee.id}>
            <Dialog>
              <DialogTrigger>
                <Button asChild variant="ghost" className="w-full">
                  <CoffeeCard {...coffee} />
                </Button>
              </DialogTrigger>
              <DialogContent showCloseButton={false} className="p-0">
                <Card className="h-full border-none shadow-none backdrop-blur-sm bg-transparent/20">
                  <CardHeader>
                    <CardTitle>{coffee.title}</CardTitle>
                    <CardDescription className="pt-4">
                      {coffee.description}
                    </CardDescription>
                    <CardAction></CardAction>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <img
                      src={coffee.image}
                      alt={coffee.title}
                      width={300}
                      height={600}
                    />
                    <div className="mt-4 flex flex-col items-start w-full">
                      <h2 className="text-lg font-semibold">Ingredients:</h2>
                      <ul className="list-disc pl-5">
                        {coffee.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
}
