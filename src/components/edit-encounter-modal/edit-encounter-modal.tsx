"use client";

import { useAtom } from "jotai";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "../ui/dialog";
import { addAdversaryModalAtom } from "@/atoms/modals";
import { EditEncounterModalContent } from "./edit-encounter-modal-content";

export const CreateAdversaryModal = () => {
  const [open, setOpen] = useAtom(addAdversaryModalAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[90vw] max-w-7xl h-[80vh] max-h-[80vh] flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit Encounter
          </DialogTitle>
        </DialogHeader>
        <EditEncounterModalContent />
      </DialogContent>
    </Dialog>
  );
};
