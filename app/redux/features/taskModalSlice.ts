"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface TaskModalSlice {
  isTaskModalOpen: boolean
}

const initialState: TaskModalSlice = {
  isTaskModalOpen: false,
}

export const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    setTaskModal: (state, action) => {
      state.isTaskModalOpen = action.payload
    },
  },
})

export const { setTaskModal } = taskModalSlice.actions

export default taskModalSlice.reducer
