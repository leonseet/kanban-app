"use client"

import { configureStore } from "@reduxjs/toolkit"
import taskModalReducer from "./features/taskModalSlice"
import toggleSidebarReducer from "./features/toggleSidebarSlice"
// import taskOpsReducer from "./features/taskOpsSlice"

export const store = configureStore({
  reducer: {
    taskModal: taskModalReducer,
    toggleSidebar: toggleSidebarReducer,
    // taskOps: taskOpsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
