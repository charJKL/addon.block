import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./Store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: RootState, dispatch: AppDispatch}>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();