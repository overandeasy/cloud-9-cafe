import { useEffect, useState } from "react";
import type { Coffee, MyCoffee } from "@/types/coffee";
import { CoffeeCard, CoffeeDetailCard } from "@/components/CoffeeCard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Loading from "@/components/ui/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [allCoffees, setAllCoffees] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllCoffees() {
      let apiCoffees: Coffee[] = [];
      let publishedCoffees: MyCoffee[] = [];
      let apiError = null;
      let firestoreError = null;

      // Fetch Firestore coffees
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "userPublishedCoffees"));
        snapshot.forEach((doc) => {
          publishedCoffees.push({ id: doc.id, ...doc.data() } as MyCoffee);
        });
      } catch (error) {
        firestoreError =
          "We are only able to show you coffees from the public coffee database instead of the user-shared coffees for now.";
        console.error(firestoreError, error);
      } finally {
        setLoading(false);
      }

      // Fetch API coffees
      try {
        setLoading(true);
        const apiRes = await fetch(`https://api.sampleapis.com/coffee/hot`);
        if (apiRes.ok) {
          apiCoffees = await apiRes.json();
        } else {
          apiError =
            "We are only able to show you coffees that the users shared instead of the API coffees for now.";
        }
      } catch (error) {
        apiError =
          "We are only able to show you coffees that users shared instead of ones from the public coffee database for now.";
        console.error(apiError, error);
      } finally {
        setLoading(false);
      }

      // Combine and set
      setAllCoffees([...publishedCoffees, ...apiCoffees]);

      // Set error messages if any
      if (apiError && firestoreError) {
        setError(
          `We are not able to show you any coffees right now. Please try again later.`
        );
      } else if (apiError) {
        setError(apiError);
      } else if (firestoreError) {
        setError(firestoreError);
      } else {
        setError(null);
      }
    }

    fetchAllCoffees();
  }, [setAllCoffees]);

  return (
    <div className="space-y-4 mt-4">
      <h1 className="text-2xl font-bold">Welcome to Cloud 9 Café</h1>
      <p>
        Explore our selection of coffees and sign in to share your original
        coffee creations!
      </p>
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {loading ? (
        <div className="flex items-center justify-center max-h-[60vh]">
          <Loading />
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
          {allCoffees.map((coffee: Coffee) => (
            <li key={coffee.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full">
                    <CoffeeCard
                      coffee={coffee}
                      allCoffees={allCoffees}
                      setAllCoffees={setAllCoffees}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="max-h-[90vh] overflow-y-auto p-0"
                >
                  <DialogTitle></DialogTitle>
                  <CoffeeDetailCard {...coffee} />
                  <DialogDescription></DialogDescription>
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
