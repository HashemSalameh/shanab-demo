import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './Store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// it's better to create typed versions of the useDispatch and useSelector hooks for usage in your application.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()