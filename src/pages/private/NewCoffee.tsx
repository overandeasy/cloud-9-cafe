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

function NewCoffee() {
  return (
    <ProtectedRoute>
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="flex w-full max-w-md self-center">
          <CardHeader className="text-center">
            <CardTitle>New Coffee</CardTitle>
            <CardDescription>
              Tell us about your new coffee creation! ☕️
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CoffeeForm />
          </CardContent>
          <CardFooter className="self-center text-sm">
            <CardAction></CardAction>
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  );
}

export default NewCoffee;
