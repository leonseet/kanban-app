"use client"

import { setBoard } from "@/app/redux/features/taskOpsSlice"
import { store } from "@/app/redux/store"
import { FC, useRef } from "react"

interface PreloaderProps {}

const Preloader: FC<PreloaderProps> = ({ board }) => {
  const loaded = useRef(false)
  if (!loaded.current) {
    store.dispatch(setBoard(board))
    loaded.current = true
  }

  return null
}

export default Preloader
