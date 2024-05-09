import { configureStore } from '@reduxjs/toolkit'

// here you import your slice's reducers
//whenever you create a new reducer 
import AuthenticateReducer from './AuthSlice/AuthSlice'
import EmployeeReducer from './EmployeeSlice/EmployeeSlice'

export const store = configureStore({
    reducer: {
        // here you add the imported reducers and name them
        authenticate: AuthenticateReducer,
        Employees: EmployeeReducer
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch