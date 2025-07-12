import { AdversaryForm } from "@/components/adversary-form";
import { AdversaryFormPreview } from "@/components/adversary-form-preview";

export default function Page() {
  return (
    <div className="flex justify-between h-full w-[70%] max-w-5xl py-8 items-start">
      <div className="flex flex-col w-[55%]">
        <h1 className="text-2xl font-semibold mb-4">Create Adversary</h1>
        <AdversaryForm />
      </div>
      <AdversaryFormPreview className="w-[40%] sticky top-[96px]" />
    </div>
  );
}
