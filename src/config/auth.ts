import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, updateProfile, updatePassword } from "firebase/auth"
import app from "@config/firebase"

export const auth = getAuth(app)

export const initAuthStateChangeListener = onAuthStateChanged;

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const logOut = () => {
    return signOut(auth)
}

export const verifyEmalil = sendEmailVerification;

export const updateUserProfile = updateProfile

export const updateUserPassword = updatePassword