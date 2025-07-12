import { AdversaryForm } from "@/zod/adversary";
import { atom } from "jotai";
import { DeepPartial } from "react-hook-form";

export const adversaryFormAtom = atom<DeepPartial<AdversaryForm> | null>(null);
