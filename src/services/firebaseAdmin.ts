import admin, { ServiceAccount } from "firebase-admin"
import { getAuth } from "firebase-admin/auth"

const serviceAccount: ServiceAccount  = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
}

if (!admin.apps.length){
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});}

const authAdmin = getAuth()

export { authAdmin }