import { X } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";

export type RemovableBadgeProps = BadgeProps & {
  onRemove: () => void;
};

export const RemovableBadge = ({
  children,
  onRemove,
  ...props
}: RemovableBadgeProps) => {
  return (
    <Badge {...props}>
      {children}
      <div
        className="cursor-pointer flex items-center justify-center"
        onClick={onRemove}
      >
        <X className="size-3.5" />
      </div>
    </Badge>
  );
};
