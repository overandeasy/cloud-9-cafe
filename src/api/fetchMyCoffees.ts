import { UserAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import type { MyCoffee } from "@/types/coffee";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


export function useFetchMyCoffees() {
    const [myCoffees, setMyCoffees] = useState<MyCoffee[]>([]);

    const [loading, setLoading] = useState(true);
    const { user } = UserAuth() || {};


    useEffect(() => {
        async function fetchMyCoffees() {
            try {
                const coffees: MyCoffee[] = [];
                if (user) {


                    const snapshot = await getDocs(
                        collection(db, "userCreatedCoffees", user.uid, "myCoffees")
                    );

                    snapshot.forEach((doc) => {
                        coffees.push({ id: doc.id, ...doc.data() } as MyCoffee);
                    });
                    setMyCoffees(coffees);
                }



            } catch (error) {
                console.error("Error fetching coffees from Firestore:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMyCoffees();
    }, [user]);

    return { myCoffees, setMyCoffees, loading };
}
