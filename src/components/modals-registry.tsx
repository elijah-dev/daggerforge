import { CreateAdversaryModal } from "./create-adversary-modal";
import { SignInDialog } from "./sign-in-dialog";
import { SignOutDialog } from "./sign-out-dialog";

export const ModalsRegistry = () => {
  return (
    <>
      <SignInDialog />
      <SignOutDialog />
      <CreateAdversaryModal />
    </>
  );
};
