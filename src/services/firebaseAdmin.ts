process.env.FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
import admin, { ServiceAccount } from "firebase-admin"

const serviceAccount: ServiceAccount  = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
}

if (!admin.apps.length){
  if (process.env.NODE_ENV === "production") {
    admin.initializeApp(serviceAccount)
  } else {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    })
  }
}

export {admin}