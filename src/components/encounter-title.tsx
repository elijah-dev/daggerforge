"use client";

import { useSetAtom } from "jotai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { addAdversaryModalAtom } from "@/atoms/modals";

export const EncounterTitle = () => {
  const setAddAdversaryModalOpen = useSetAtom(addAdversaryModalAtom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer rounded-sm px-4 py-2 hover:bg-accent">
        <h1 className="text-base font-bold">New Encounter</h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          onClick={() => {
            // Logic to create a new encounter
            console.log("New Encounter clicked");
          }}
        >
          Create New Encounter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAddAdversaryModalOpen(true)}>
          Add adversaries
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
