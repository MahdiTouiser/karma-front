import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDatail } from "../models/usermanagement.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { BaseResponse } from "../models/shared.models";

interface UsermanagementState {
  userDetail: UserDatail | null;
  loading: boolean;
  error: string;
}

const initialState: UsermanagementState = {
  userDetail: null,
  loading: false,
  error: "",
};

export const fetchUserDetail = createAsyncThunk(
  "userManagement/fetchUserDetail",
  async (id: string) => {
    try {
      const response = await axiosIntance.get<
        null,
        AxiosResponse<BaseResponse<UserDatail>>
      >(`/Admin/UserDetail/${id}`);
      return response.data.content;
    } catch (error) {
      const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
        message: string;
      }>;
      throw new Error(axiosError.response?.data.message || "");
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: initialState,
  reducers: {
    resetUserDetail: (state) => {
      (state.userDetail = null), (state.error = "");
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
        state.userDetail = null;
      });
    //   add
    //   .addCase(addTicketToBasket.pending, (state, action) => {
    //     state.changingTicket = {
    //       flightLoadId: action.meta.arg.flightLoadId,
    //       ticketTypeId: action.meta.arg.ticketTypeId,
    //     };
    //   })
    //   .addCase(addTicketToBasket.fulfilled, (state) => {
    //     state.changingTicket = null;
    //   })
    //   .addCase(addTicketToBasket.rejected, (state) => {
    //     state.changingTicket = null;
    //   })
    //   //   remove
    //   .addCase(removeTicketFromBasket.pending, (state, action) => {
    //     state.changingTicket = {
    //       flightLoadId: action.meta.arg[0].flightLoadId,
    //       ticketTypeId: action.meta.arg[0].ticketTypeId,
    //     };
    //   })
    //   .addCase(removeTicketFromBasket.fulfilled, (state) => {
    //     state.changingTicket = null;
    //   })
    //   .addCase(removeTicketFromBasket.rejected, (state) => {
    //     state.changingTicket = null;
    //   });
  },
});

export default userManagementSlice.reducer;
export const usermanagementActions = userManagementSlice.actions;
