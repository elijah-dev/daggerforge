import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const handleSignIn = async () => {
    "use server";
    await signIn("google", { redirectTo: "/" });
  };

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/sign-in" });
  };

  return (
    <main className="flex flex-col gap-[32px] items-center h-full justify-center">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="text-gray-500">Please sign in to continue.</p>
      <Button onClick={handleSignIn}>Sign in with Google</Button>
      <Button onClick={handleSignOut}>Sign out</Button>
    </main>
  );
}
