import type { MyCoffee } from "@/types/coffee";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { CoffeeCard, CoffeeDetailCard } from "./CoffeeCard";
import { useFetchMyCoffees } from "@/api/fetchMyCoffees";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import Loading from "./ui/Loading";

export function MyCoffeeList() {
  const { myCoffees, setMyCoffees, loading } = useFetchMyCoffees();

  if (loading) return <Loading />;
  if (!myCoffees.length)
    return (
      <div>
        <div>You haven't created any coffees yet.</div>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Button
            asChild
            variant={"secondary"}
            className="justify-between size-20 hover:bg-cafe-theme/80 active:bg-cafe-theme/20"
          >
            <Link
              to="/my-coffees/new"
              className="flex justify-center items-center group"
              style={{ lineHeight: 0 }}
            >
              <Plus
                type="icon"
                className="size-18 text-cafe-theme group-hover:text-white"
                strokeWidth={4}
              />
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
      {myCoffees.map((coffee: MyCoffee) => (
        <li key={coffee.id}>
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full">
                <CoffeeCard
                  coffee={coffee}
                  allCoffees={myCoffees}
                  setAllCoffees={setMyCoffees}
                />
              </div>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="max-h-[90vh] overflow-y-auto p-0"
            >
              <DialogTitle></DialogTitle>
              <CoffeeDetailCard {...coffee} />
            </DialogContent>
            <DialogDescription></DialogDescription>
          </Dialog>
        </li>
      ))}
      <li>
        <div className="flex justify-center items-center h-full">
          <Button
            asChild
            variant={"secondary"}
            className="justify-between size-20 hover:bg-cafe-theme/80 active:bg-cafe-theme/20"
          >
            <Link
              to="/my-coffees/new"
              className="flex justify-center items-center group"
              style={{ lineHeight: 0 }}
            >
              <Plus
                type="icon"
                className="size-18 text-cafe-theme group-hover:text-white"
                strokeWidth={4}
              />
            </Link>
          </Button>
        </div>
      </li>
    </ul>
  );
}
