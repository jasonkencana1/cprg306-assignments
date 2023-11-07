"use client"

import { useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";


export default function ShoppingListPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await gitHubSignIn();
      } catch (error) {
        console.log("Error", error);
      }
    };
  

    initializeUser();
}, [gitHubSignIn]);

 const handleSignOut = async () => {
  try {
    await firebaseSignOut();
  } catch (error) {
    console.log("Error:", error);
  }
 };
  
  return (
     <section>
      <div>
        <p> Welcome, {user.displayName} ({user.email}) </p>;
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
     </section>

  );
}

 

