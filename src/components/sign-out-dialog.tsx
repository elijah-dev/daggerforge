"use client";

import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { signOutDialogAtom } from "@/atoms/modals";

export const SignOutDialog = () => {
  const [open, setOpen] = useAtom(signOutDialogAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-lg">
        <DialogTitle className="text-lg font-semibold">
          Are you sure you want to sign out?
        </DialogTitle>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              signOut();
              setOpen(false);
            }}
          >
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
