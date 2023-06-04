"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface ToggleSidebarSlice {
  isSidebarOpen: boolean
}

const initialState: ToggleSidebarSlice = {
  isSidebarOpen: true,
}

export const toggleSidebarSlice = createSlice({
  name: "toggleSidebar",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.isSidebarOpen = action.payload
    },
  },
})

export const { setSidebar } = toggleSidebarSlice.actions

export default toggleSidebarSlice.reducer
