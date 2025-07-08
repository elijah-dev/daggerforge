import { AdversaryForm } from "@/components/adversary-form";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex justify-between h-full w-[70%] max-w-4xl py-8 items-start">
      <div className="flex flex-col w-[60%]">
        <h1 className="text-2xl font-semibold mb-4">Create Adversary</h1>
      <AdversaryForm />
      </div>
      <Card className="w-[35%]"></Card>
    </div>
  );
}
