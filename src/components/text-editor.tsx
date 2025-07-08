import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Bold as BoldIcon } from "lucide-react";
import { Italic as ItalicIcon } from "lucide-react";
import { Underline as UnderlineIcon } from "lucide-react";
import { List } from "lucide-react";
import { ListOrdered } from "lucide-react";

export const TextEditor = ({
  placeholder = "Type here...",
  onChange,
}: {
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      ListItem,
      BulletList,
      OrderedList,
      Placeholder.configure({
        placeholder: placeholder || "Type here...",
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onChange(content);
    },
  });

  return (
    <div
      className={cn(
        "h-48 flex flex-col border-input rounded-md border dark:bg-input/30",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
      )}
    >
      <div className="flex gap-3 px-3 py-1">
        <div className="flex gap-1">
          <Button
            className="h-8 w-8 [&_svg]:h-4 [&_svg]w-4"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            size="icon"
            variant={editor?.isActive("bold") ? "default" : "outline"}
          >
            <BoldIcon />
          </Button>
          <Button
            className="h-8 w-8 [&_svg]:h-4 [&_svg]w-4"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            size="icon"
            variant={editor?.isActive("italic") ? "default" : "outline"}
          >
            <ItalicIcon />
          </Button>
          <Button
            className="h-8 w-8 [&_svg]:h-4 [&_svg]w-4"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            size="icon"
            variant={editor?.isActive("underline") ? "default" : "outline"}
          >
            <UnderlineIcon />
          </Button>
        </div>
        <div className="flex gap-1">
          <Button
            className="h-8 w-8 [&_svg]:h-4 [&_svg]w-4"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            size="icon"
            variant={editor?.isActive("bulletList") ? "default" : "outline"}
          >
            <List />
          </Button>
          <Button
            className="h-8 w-8 [&_svg]:h-4 [&_svg]w-4"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            size="icon"
            variant={editor?.isActive("orderedList") ? "default" : "outline"}
          >
            <ListOrdered />
          </Button>
        </div>
      </div>
      <EditorContent
        className={cn(
          "h-48 border-input px-3 py-1  md:text-sm",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "*:outline-none *:h-full"
        )}
        editor={editor}
      />
    </div>
  );
};
