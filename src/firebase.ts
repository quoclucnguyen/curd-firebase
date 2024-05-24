import { initializeApp } from "firebase/app";
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

export const db = schema(($) => ({
  
  users: $.collection<User>().sub({
    notes: $.collection<Note>(),
  }),
  orders: $.collection<Order>(),
  books: $.collection<Book>(),
}));

export type Schema = Typesaurus.Schema<typeof db>;

// Your model types:

interface User {
  name: string;
}

interface Note {
  text: string;
}

interface Order {
  userId: Schema["users"]["Id"];
  bookId: Schema["books"]["Id"];
}

interface Book {
  title: string;
}
