import { UserForm } from "./user-form";
import { Users } from "./users";

export default async function Adversaries() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-2xl font-bold">Adversaries</h1>
      <Users />
      <UserForm />
    </main>
  );
}
