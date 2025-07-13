// export async function clientLoader() {
//   const user = await auth.authStateReady();
//   console.log("clientLoader user:", user);
//   return user;
// }

import ProtectedRoute from "@/components/ProtectedRoute";

function MyCoffees() {
  return (
    <ProtectedRoute>
      <div>My Coffees</div>
    </ProtectedRoute>
  );
}

export default MyCoffees;
