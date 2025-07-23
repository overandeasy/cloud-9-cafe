import { auth } from "@/lib/firebase";
import type { SignInFormData, SignUpFormData } from "@/lib/zod";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";



const signUp = async (values: SignUpFormData) => {
    const { firstName, lastName, email, password } = values;


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;
        await updateProfile(currentUser, {
            displayName: `${firstName} ${lastName}`
        });
    } catch (error: any) {

        const errorCode: string = error?.code
        const errorMessage: string = error?.message;

        console.error('Firebase error:', error);
        console.error("Error signing up with email and password", error);

        return ({ error: { code: errorCode, message: errorMessage } })
    }


}

const signOut = async () => {

    try {
        await auth.signOut();

    } catch (error) {
        console.error("Error signing out with Google", error);
    }


}



const signIn = async (values: SignInFormData) => {
    try {

        const { email, password } = values
        await signInWithEmailAndPassword(auth, email, password)


    } catch (error: any) {
        console.error("Error signing in with email and password", error);
        const errorCode: string = error?.code
        const errorMessage: string = error?.message;

        // console.error('Firebase error:', error);
        return ({ error: { code: errorCode, message: errorMessage } })
    }

}
export { signUp, signIn, signOut, auth };