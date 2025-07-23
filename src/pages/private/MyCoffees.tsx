import { MyCoffeeList } from "@/components/MyCoffeeList";
import ProtectedRoute from "@/components/ProtectedRoute";

function MyCoffees() {
  return (
    <ProtectedRoute>
      <div className="pt-4 justify-between flex">
        <h1 className="text-2xl font-bold mb-4">My Coffees</h1>
      </div>
      <MyCoffeeList />
    </ProtectedRoute>
  );
}

export default MyCoffees;
