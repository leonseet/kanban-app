"use client"

import { configureStore } from "@reduxjs/toolkit"
import taskModalReducer from "./features/taskModalSlice"
import toggleSidebarReducer from "./features/toggleSidebarSlice"
import taskFilterReducer from "./features/taskFilterSlice"
// import taskOpsReducer from "./features/taskOpsSlice"

export const store = configureStore({
  reducer: {
    taskModal: taskModalReducer,
    toggleSidebar: toggleSidebarReducer,
    taskFilter: taskFilterReducer,
    // taskOps: taskOpsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
