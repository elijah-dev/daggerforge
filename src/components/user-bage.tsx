"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useSetAtom } from "jotai";
import { signInDialogAtom, signOutDialogAtom } from "@/atoms/modals";

export const UserBadge = () => {
  const setSignInDialogOpen = useSetAtom(signInDialogAtom);
  const setSignOutDialogOpen = useSetAtom(signOutDialogAtom);
  const session = useSession();
  const user = session.data?.user;

  if (!user) {
    return (
      <div
        onClick={() => setSignInDialogOpen(true)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-sm ">Sign in</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer rounded-sm px-4 py-2 hover:bg-accent">
        <span className="text-sm font-semibold">{user.name || user.email}</span>
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
  );
};
