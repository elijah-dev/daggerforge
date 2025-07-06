"use client";

import { useAtom } from "jotai";
import { DiscordSignInButton } from "./discord-sign-in-button";
import { GoogleSignInButton } from "./google-sign-in-button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { signInDialogAtom } from "@/atoms/modals";

export const SignInDialog = () => {
  const [open, setOpen] = useAtom(signInDialogAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center p-6 w-sm w-lg">
        <DialogTitle className="text-xl font-semibold">Sign in</DialogTitle>
        <p className="text-center text-muted-foreground pb-4">
          Sign in to save your encounters and homebrew
        </p>
        <GoogleSignInButton />
        <DiscordSignInButton />
      </DialogContent>
    </Dialog>
  );
};
