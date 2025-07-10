import { CreateAdversaryModal } from "./edit-encounter-modal/edit-encounter-modal";
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
