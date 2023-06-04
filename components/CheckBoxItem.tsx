"use client"

import { FC, useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RxCross1 } from "react-icons/rx"
import TextareaAutosize from "react-textarea-autosize"

interface CheckBoxItemProps {
  index: number
  description: string
  isChecked: boolean
  onDeleteSubtask: (index: number) => void
  subtasks: CustomSubtask[]
  setSubtasks: React.Dispatch<React.SetStateAction<CustomSubtask[]>>
}

interface handleSubtaskChangeProps {
  e: React.ChangeEvent<HTMLTextAreaElement>
  index: number
}

const CheckBoxItem: FC<CheckBoxItemProps> = ({
  index,
  description,
  isChecked,
  onDeleteSubtask,
  subtasks,
  setSubtasks,
}) => {
  const [checked, setChecked] = useState(false)

  const handleSubtaskChange = ({ e, index }: handleSubtaskChangeProps) => {
    const { value } = e.target
    const list = [...subtasks]
    list[index]["description"] = value
    setSubtasks(list)
  }

  const handleCheckedChange = ({ index }: { index: number }) => {
    const list = [...subtasks]
    list[index]["checked"] = !list[index]["checked"]
    setChecked(!checked)
    setSubtasks(list)
  }

  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])

  return (
    <div className="py-3 px-4 flex gap-4 items-center rounded-md justify-between bg-background hover:bg-accent">
      <div className="flex gap-5 items-center w-full">
        <Checkbox
          className={`${checked ? "bg-primary" : "bg-secondary"} w-5 h-5`}
          onCheckedChange={() => handleCheckedChange({ index })}
          checked={checked}
        />

        <TextareaAutosize
          placeholder="Subtask"
          className="font-semibold text-sm bg-transparent w-full focus:outline-none resize-none placeholder:font-semibold placeholder:invisible placeholder:focus:visible"
          maxLength={111}
          value={description}
          onChange={(e) => handleSubtaskChange({ e, index })}
        />
      </div>
      <button onClick={() => onDeleteSubtask(index)} type="button">
        <RxCross1 className="text-red-500 opacity-25 hover:opacity-100 w-5 h-5" />
      </button>
    </div>
  )
}

export default CheckBoxItem
