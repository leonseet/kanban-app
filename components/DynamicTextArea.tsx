"use client"

import { FC, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Column as ColumnPrismaProps } from "@prisma/client"
import { updateColumn } from "@/lib/service/updateColumn"

interface DynamicTextAreaProps {
  column: ColumnPrismaProps
}

const DynamicTextArea: FC<DynamicTextAreaProps> = ({ column }) => {
  const [textInput, setTextInput] = useState<string>(column.title ?? "")

  const handleOnChange = ({ e }: { e: React.ChangeEvent<HTMLTextAreaElement> }) => {
    setTextInput(e.target.value)
  }

  const handleOnBlur = async ({ e }: { e: React.FocusEvent<HTMLTextAreaElement> }) => {
    await updateColumn({ columnId: column.id, title: e.target.value })
  }

  const handleOnKeyDown = ({ e }: { e: React.KeyboardEvent<HTMLTextAreaElement> }) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLTextAreaElement
      target.blur()
    }
  }

  return (
    <TextareaAutosize
      placeholder="e.g. Todo"
      className="font-heading text-secondary-foreground tracking-widest md:tracking-[.2em] placeholder:text-secondary-foreground placeholder:opacity-30 bg-transparent w-fit focus:outline-none resize-none placeholder:font-semibold"
      maxLength={30}
      value={textInput}
      onChange={(e) => handleOnChange({ e })}
      onBlur={(e) => handleOnBlur({ e })}
      onKeyDown={(e) => handleOnKeyDown({ e })}
    />
  )
}

export default DynamicTextArea
