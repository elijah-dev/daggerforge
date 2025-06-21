"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SignInDialog } from "./sign-in-dialog";
import { useState } from "react";
import { Button } from "./ui/button";

export const UserBadge = () => {
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;

  console.log("UserBadge session:", session);

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm ">Sign in</span>
          </div>
        </DialogTrigger>
        <SignInDialog />
      </Dialog>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer rounded-sm px-4 py-2 hover:bg-accent">
          <span className="text-sm font-semibold">
            {user.name || user.email}
          </span>
          <Avatar>
            <AvatarImage
              src={user.image ?? ""}
              alt={user.name || "User Avatar"}
            />
            <AvatarFallback>{user.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setSignOutDialogOpen(true)}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={signOutDialogOpen} onOpenChange={setSignOutDialogOpen}>
        <DialogContent>
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
                setSignOutDialogOpen(false);
              }}
            >
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
