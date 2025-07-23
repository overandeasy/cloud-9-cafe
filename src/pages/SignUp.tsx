import SignUpForm from "@/components/SignUpForm";
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

export default function SignUp() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="flex w-full max-w-md self-center text-center">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="self-center text-sm">
          <CardAction>
            <p className=" text-gray-500">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
