import SignInForm from "@/components/SignInForm";
import { Link } from "react-router";

export default function SignIn() {
  return (
    <div className="flex flex-col space-y-2 p-4 justify-center items-center">
      <h1>Sign In</h1>
      <SignInForm />
      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
