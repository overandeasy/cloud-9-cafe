import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import type { MyCoffee } from "@/types/coffee";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteMyCoffeeProps = {
  userId: string;
  coffeeId: string;
  allCoffees: MyCoffee[];
  setAllCoffees: React.Dispatch<React.SetStateAction<MyCoffee[]>>;
};
import { useState } from "react";

export default function DeleteMyCoffee({
  userId,
  coffeeId,

  setAllCoffees,
}: DeleteMyCoffeeProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      if (!userId || !coffeeId) {
        console.error("User ID and Coffee ID are required for deletion.");
        throw new Error("Invalid parameters for deletion.");
      }
      // Reference to the user's coffee
      const coffeeDocRef = doc(
        db,
        "userCreatedCoffees",
        userId,
        "myCoffees",
        coffeeId
      );
      const coffeeSnap = await getDoc(coffeeDocRef);

      if (!coffeeSnap.exists()) {
        throw new Error("Coffee not found.");
      }

      const coffeeData = coffeeSnap.data();
      // Delete from userCreatedCoffees
      await deleteDoc(coffeeDocRef);

      // If published, also delete from userPublishedCoffees
      if (coffeeData.published) {
        const publishedDocRef = doc(db, "userPublishedCoffees", coffeeId);
        await deleteDoc(publishedDocRef);
        setAllCoffees((previousCoffees) =>
          previousCoffees.filter((coffee) => coffee.id !== coffeeId)
        );
      }

      toast.success("Your coffee has been deleted successfully!", {
        style: {
          minWidth: "200px",
          maxWidth: "50vw",
          background: "oklch(0.4817 0.0839 198.73)",
          color: "white",
          fontSize: "1.25rem",
          borderRadius: "0.5rem",
          whiteSpace: "pre-line", // or "normal" for standard wrapping
          textAlign: "center", // optional: center the text
          margin: "auto",
          boxSizing: "border-box",
        },
      });

      // Optionally, you can add a callback or notification here
    } catch (error) {
      console.error("Error deleting coffee:", error);
      // Optionally, handle error UI here
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size={"icon"}
          variant={"destructive"}
          onClick={(e) => e.stopPropagation()} // Prevents opening parent dialog if inside a card
          title="Delete coffee"
        >
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={async (e) => {
              e.preventDefault();
              setIsDeleting(true);
              await handleDelete();
              setIsDeleting(false);
            }}
          >
            <Button type="button" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Continue"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
