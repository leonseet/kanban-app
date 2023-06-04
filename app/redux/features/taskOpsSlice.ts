"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface TaskOpsSlice {
  board: any
}

const initialState: TaskOpsSlice = {
  board: {},
}

export const taskOpsSlice = createSlice({
  name: "taskops",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload
      console.log(initialState)
    },
    addTask: (state, action) => {
      console.log(action.payload)
    },
    updateTask: (state, action) => {
      console.log(action.payload)
    },
    deleteTask: (state, action) => {
      console.log(action.payload)
    },
  },
})

export const { setBoard, addTask, updateTask, deleteTask } = taskOpsSlice.actions

export default taskOpsSlice.reducer
