import firebase from "firebase/app"
import "firebase/firestore"
import { firebaseConfig } from "./firebaseconfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
