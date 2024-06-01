import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { schema, Typesaurus } from "typesaurus";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
export const storage = getStorage(app);

export const db = schema(($) => ({
  users: $.collection<User>(),
  items: $.collection<Item>(),
  itemTypes: $.collection<ItemType>().sub({
    items: $.collection<Item>(),
  }),
}));

export type Schema = Typesaurus.Schema<typeof db>;

// Your model types:

interface User {
  name: string;
}

interface ItemType {
  name: string;
}

export interface Item {
  name: string;
  imageUrl?: string;
  itemTypeId: string;
}
