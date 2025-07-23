import { CoffeeForm } from "@/components/CoffeeForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/Loading";
import { UserAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import type { CoffeeFormData } from "@/lib/zod";
import type { MyCoffee } from "@/types/coffee";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditCoffee({
  setAllCoffees,
}: {
  setAllCoffees: React.Dispatch<React.SetStateAction<MyCoffee[]>>;
}) {
  const { coffeeId } = useParams();
  const [coffee, setCoffee] = useState<
    (CoffeeFormData & { id: string }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = UserAuth() || {};
  useEffect(() => {
    async function fetchCoffee() {
      if (!user) {
        navigate("/sign-in");
        return;
      }
      if (!coffeeId) return;

      const userId = user?.uid;
      const docRef = doc(
        db,
        "userCreatedCoffees",
        userId!,
        "myCoffees",
        coffeeId
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCoffee({ id: coffeeId, ...docSnap.data() } as CoffeeFormData & {
          id: string;
        });
      } else {
        // Optionally redirect or show error
        navigate("/my-coffees");
      }
      setLoading(false);
    }
    fetchCoffee();
  }, [coffeeId, navigate]);

  if (loading) return <Loading />;
  if (!coffee) return <div>Coffee not found.</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="flex w-full max-w-md self-center">
          <CardHeader className="text-center">
            <CardTitle>Edit My Coffee</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <CoffeeForm coffee={coffee} setAllCoffees={setAllCoffees} />
          </CardContent>
          <CardFooter className="self-center text-sm">
            <CardAction></CardAction>
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
