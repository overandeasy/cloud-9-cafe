import SignInForm from "@/components/SignInForm";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function SignIn() {
  return (
    <Card className="flex w-full max-w-md self-center text-center">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="self-center text-sm">
        <CardAction>
          <p className=" text-gray-500">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
