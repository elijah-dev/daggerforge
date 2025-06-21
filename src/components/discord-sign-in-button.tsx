"use client";

import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { Button } from "./ui/button";

export const DiscordSignInButton = () => {
  return (
    <Button
      onClick={() => signIn("discord")}
      className="w-full"
    >
      <FaDiscord className="text-xl" />
      Sign in with Discrord
    </Button>
  );
}