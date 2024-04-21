import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserMessage, UserMessageResponse } from "../models/messages.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { BaseResponse, PagingParams } from "../models/shared.models";
import { toast } from "react-toastify";

interface MessagesState {
  messages: UserMessage[];
  total: number;
  unReadCount: number;
  isLoading: boolean;
  error: string;
  changingMessageid: string | null;
}

const initialState: MessagesState = {
  messages: [],
  unReadCount: 0,
  total: 0,
  error: "",
  isLoading: false,
  changingMessageid: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (pagingParmas: Partial<PagingParams>) => {
    try {
      const response = await axiosIntance.get<
        null,
        AxiosResponse<UserMessageResponse>
      >("/UserMessages", {
        params: {
          pageIndex: pagingParmas.pageIndex || 1,
          pageSize: pagingParmas.pageSize || 10,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
        message: string;
      }>;
      throw new Error(axiosError.response?.data.message || "");
    }
  }
);

export const readMessage = createAsyncThunk(
  "messages/readMessage",
  async (messageId: string) => {
    try {
      const response = await axiosIntance.put<
        null,
        AxiosResponse<BaseResponse<null>>
      >(`/UserMessages/${messageId}`);
      return response.data;
    } catch (error) {
      const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
        message: string;
      }>;
      const message = axiosError.response?.data.message || "";
      toast.error(message);
      throw new Error(message);
    }
  }
);

const messgeSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.error = "";
      state.isLoading = false;
      state.messages = action.payload.content;
      state.total = action.payload.total;
      state.unReadCount = action.payload.notVisited;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.error = action.error.message || "";
      state.isLoading = false;
      state.messages = [];
    });
    //read
    builder.addCase(readMessage.pending, (state, action) => {
      state.changingMessageid = action.meta.arg;
    });
    builder.addCase(readMessage.fulfilled, (state) => {
      const messageId = state.changingMessageid;
      state.messages = state.messages.map((message) => {
        if (message.id === messageId) {
          return { ...message, visited: true };
        }
        return { ...message };
      });
      state.changingMessageid = null;
      state.unReadCount = state.unReadCount - 1;
    });
    builder.addCase(readMessage.rejected, (state) => {
      state.changingMessageid = null;
    });
  },
});

export default messgeSlice.reducer;
