import { DiscordSignInButton } from "./discord-sign-in-button";
import { GoogleSignInButton } from "./google-sign-in-button";
import { DialogContent, DialogTitle } from "./ui/dialog";

export const SignInDialog = () => {
  return (
    <DialogContent className="flex flex-col items-center p-6 w-sm">
      <DialogTitle className="text-xl font-semibold">Sign in</DialogTitle>
      <p className="text-center text-muted-foreground pb-4">
        Sign in to save your encounters and homebrew
      </p>
      <GoogleSignInButton />
      <DiscordSignInButton />
    </DialogContent>
  );
};
