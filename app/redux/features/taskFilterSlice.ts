"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface TaskFilterSlice {
  searchInput: string
}

const initialState: TaskFilterSlice = {
  searchInput: "",
}

export const taskFilterSlice = createSlice({
  name: "taskFilter",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload
    },
  },
})

export const { setSearchInput } = taskFilterSlice.actions

export default taskFilterSlice.reducer
