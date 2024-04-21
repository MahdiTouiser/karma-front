import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { BaseResponse } from "../models/shared.models";
import { GeneralSettings } from "../models/settings.models";
import { axiosIntance } from "../hooks/useApi";

interface GeneralSettingsState {
  generalSettings: GeneralSettings | null;
  loading: boolean;
  error: string;
}

const initialState: GeneralSettingsState = {
  generalSettings: null,
  loading: false,
  error: "",
};

export const fetchGeneralSettings = createAsyncThunk(
  "generalSettings/fetch",
  async () => {
    try {
      const response = await axiosIntance.get<
        null,
        AxiosResponse<BaseResponse<GeneralSettings>>
      >("/Settings");
      return response.data.content;
    } catch (error) {
      const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
        message: string;
      }>;
      throw new Error(axiosError.response?.data.message || "");
    }
  }
);

const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralSettings.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchGeneralSettings.fulfilled, (state, action) => {
        state.generalSettings = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchGeneralSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
        state.generalSettings = null;
      });
  },
});

export default generalSettingsSlice.reducer;
