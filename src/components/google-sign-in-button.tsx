"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

export const GoogleSignInButton = () => {

  return (
    <Button
      onClick={() => signIn("google")}
      className="w-full"
    >
      <FcGoogle className="text-xl" />
      Sign in with Google
    </Button>
  );
}