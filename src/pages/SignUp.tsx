import SignUpForm from "@/components/SignUpForm";
import { Link } from "react-router";

export default function SignUp() {
  return (
    <div className="flex flex-col space-y-2 p-4 justify-center items-center">
      <h1>Sign Up</h1>
      <SignUpForm />
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
