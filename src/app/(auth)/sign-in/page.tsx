import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { DiscordSignInButton } from "@/components/discord-sign-in-button";

export default function SignIn() {
  return (
    <main className="flex flex-col gap-[32px] items-center h-full justify-center">
      <Card className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold pb-4 font-(family-name:--font-sen)">DAGGERFORGE</h1>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Please sign in to continue using the application.
          </CardDescription>
        </div>
        <CardContent className="flex flex-col gap-4">
          <GoogleSignInButton />
          <DiscordSignInButton />
        </CardContent>
      </Card>
    </main>
  );
}
