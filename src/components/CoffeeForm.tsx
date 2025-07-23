import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { coffeeFormSchema, type CoffeeFormData } from "@/lib/zod";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

import { Checkbox } from "./ui/checkbox";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import type { MyCoffee } from "@/types/coffee";

export function CoffeeForm({
  coffee,
  setAllCoffees,
}: {
  coffee?: CoffeeFormData & { id?: string };
  setAllCoffees?: React.Dispatch<React.SetStateAction<MyCoffee[]>>;
}) {
  const { user } = UserAuth() || {};
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const navigate = useNavigate();

  // Set up form with default values from coffee if editing, else blank
  const form = useForm<CoffeeFormData>({
    resolver: zodResolver(coffeeFormSchema),
    defaultValues: coffee
      ? {
          ...coffee,
          ingredients: coffee.ingredients ?? [{ name: "" }],
          image: undefined, // Don't prefill file input
        }
      : {
          title: "",
          description: "",
          ingredients: [{ name: "" }],
          image: undefined,
          published: false,
        },
  });

  useEffect(() => {
    if (coffee?.image && typeof coffee.image === "string") {
      setPreview(coffee.image);
    }
  }, [coffee]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const onSubmit = async (data: CoffeeFormData) => {
    try {
      let imageUrl =
        coffee?.image && typeof coffee.image === "string" ? coffee.image : "";

      // If user selected a new image, upload it and use its URL
      if (data.image) {
        const formattedDate = Timestamp.now().toDate().toISOString();
        const imageRef = ref(
          storage,
          `project-3/userCreatedCoffeeImages/${
            user ? user.uid : "anonymous"
          }/${formattedDate}_${data.image.name}`
        );
        await uploadBytes(imageRef, data.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const coffeeDataToSave = {
        ...data,
        image: imageUrl, // Use the new or existing image URL
        userId: user ? user.uid : null,
        userDisplayName: user ? user.displayName : "Anonymous",
        updatedAt: Timestamp.now(),
      };

      if (!user?.uid) {
        throw new Error("User is not authenticated.");
      }

      if (coffee?.id) {
        // EDIT MODE: update existing doc
        const coffeeDocRef = doc(
          db,
          "userCreatedCoffees",
          user.uid,
          "myCoffees",
          coffee.id
        );
        await updateDoc(coffeeDocRef, coffeeDataToSave);

        if (data.published) {
          await setDoc(
            doc(collection(db, "userPublishedCoffees"), coffee.id),
            coffeeDataToSave
          );
        }
        if (!data.published) {
          const publishedDocRef = doc(db, "userPublishedCoffees", coffee.id);
          await deleteDoc(publishedDocRef);
          setAllCoffees &&
            ((previousCoffees: MyCoffee[]) =>
              previousCoffees.filter((coffee) => coffee.id !== coffee.id));
        }

        toast.success("Your coffee has been updated successfully!", {
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
      } else {
        // CREATE MODE: create new doc
        const coffeeDocRef = collection(
          db,
          "userCreatedCoffees",
          user.uid,
          "myCoffees"
        );
        const submittedCoffeeRef = await addDoc(coffeeDocRef, coffeeDataToSave);
        if (data.published) {
          await setDoc(
            doc(collection(db, "userPublishedCoffees"), submittedCoffeeRef.id),
            { ...coffeeDataToSave }
          );
        }

        // console.log(
        //   "Coffee data to save (with uploaded image URL):",
        //   coffeeDataToSave
        // );

        toast.success("Your coffee has been submitted successfully!", {
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
      }
      form.reset();
      setPreview(undefined); // Reset the preview image
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      navigate("/my-coffees");
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        type: "manual",
        message:
          "An error occurred while submitting the form. Please try again.",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    } else {
      form.setValue("image", undefined, { shouldValidate: true });
      setPreview(undefined);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormDescription>
                What is the name of your invention? 😍
              </FormDescription>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>
                Make your coffee stand out in less than 300 words. 🌟
              </FormDescription>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel className="mb-2">Ingredients</FormLabel>
        <FormDescription>What is your magic potion? 🪄</FormDescription>
        {fields.map((item, index) => (
          <FormField
            key={item.id}
            control={form.control}
            name={`ingredients.${index}.name` as const}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl className="flex-1">
                  <Input {...field} placeholder={`Ingredient ${index + 1}`} />
                </FormControl>
                <Button
                  variant="ghost"
                  type="button"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <X strokeWidth="4" className=" text-cafe-theme" />
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => append({ name: "" })}
          >
            <Plus strokeWidth="4" className=" text-cafe-theme" />
          </Button>
        </div>
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormDescription>Make your coffee shine! ✨</FormDescription>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
              </FormControl>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className=" mt-2 max-w-3xs mx-auto rounded"
                />
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Share to Community?</FormLabel>
              </div>
              <FormDescription>
                Your coffee will appear on the homepage if you share it. 📢
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors && (
          <div className="text-destructive">
            {form.formState.errors.root?.message}
          </div>
        )}
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button
          className="w-full"
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </form>
    </Form>
  );
}
