import DeleteMyCoffee from "@/api/DeleteMyCoffee";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import type { MyCoffee } from "@/types/coffee";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Edit, LockIcon, LockOpen } from "lucide-react";
import { UserAuth } from "@/context/AuthContext";

type CoffeeCardProps = {
  coffee: MyCoffee;
  allCoffees: MyCoffee[];
  setAllCoffees: React.Dispatch<React.SetStateAction<MyCoffee[]>>;
};

const CoffeeCard = ({ coffee, allCoffees, setAllCoffees }: CoffeeCardProps) => {
  const { title, image, published } = coffee;
  const { user } = UserAuth() || {};
  const EditCoffeeButton = (coffee: MyCoffee) => {
    if (!coffee.userId) return null; // Only show edit button if userId exists
    return (
      <Button
        asChild
        type="button"
        size={"icon"}
        variant={"default"}
        title="Edit Coffee"
      >
        <Link to={`/my-coffees/edit/${coffee.id}`}>
          <Edit size={20} />
        </Link>
      </Button>
    );
  };

  return (
    <div className="hover:cursor-pointer group">
      <Card className="max-h-120 flex flex-col">
        <CardHeader className="max-h-20 overflow-hidden">
          <CardTitle className="truncate" title={title}>
            {title}
          </CardTitle>
        </CardHeader>
        <div className="relative flex-1 flex items-center justify-center">
          <CardContent className="flex justify-center items-center relative w-full h-full p-0">
            <img
              src={image ? image : "/defaultAvatar.png"}
              alt={title}
              className="object-cover w-full h-70 px-2"
              style={{ maxHeight: "20rem" }}
            />
            {coffee.userId && user?.uid === coffee.userId ? (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 space-x-2">
                <DeleteMyCoffee
                  userId={String(coffee.userId)}
                  coffeeId={String(coffee.id)}
                  allCoffees={allCoffees}
                  setAllCoffees={setAllCoffees}
                />
                <EditCoffeeButton {...coffee} />
              </div>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex text-sm text-gray-500">
          {published ? (
            <span className="flex gap-2" title="Published">
              <LockOpen size={16} className="text-green-500" />
              {`Created by: ${coffee.userDisplayName}`}
            </span>
          ) : published === false ? (
            <span className="flex gap-2" title="Private">
              <LockIcon size={16} className="text-red-500" />
              {`Created by: ${coffee.userDisplayName}`}
            </span>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

const CoffeeDetailCard = (coffee: MyCoffee) => {
  return (
    <Card className="h-full border-none shadow-none backdrop-blur-sm bg-transparent/20">
      <CardHeader>
        <CardTitle>{coffee.title}</CardTitle>
        <CardDescription className="pt-4">{coffee.description}</CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <img
          src={coffee.image ? coffee.image : "/defaultAvatar.png"}
          alt={coffee.title}
          className="object-cover w-full px-2"
        />
        <div className="mt-4 flex flex-col items-start w-full">
          <h2 className="text-lg font-semibold">Ingredients:</h2>
          <ul className="list-disc pl-5">
            {coffee.ingredients.map((ingredient, index) => (
              <li key={index}>
                {typeof ingredient === "object" &&
                ingredient !== null &&
                "name" in ingredient
                  ? (ingredient as { name: string }).name
                  : ingredient}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export { CoffeeCard, CoffeeDetailCard };
