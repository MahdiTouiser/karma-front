import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosIntance } from "../hooks/useApi";
import { toast } from "react-toastify";
const initialState = {
    messages: [],
    unReadCount: 0,
    total: 0,
    error: "",
    isLoading: false,
    changingMessageid: null,
};
export const fetchMessages = createAsyncThunk("messages/fetchMessages", async (pagingParmas) => {
    try {
        const response = await axiosIntance.get("/UserMessages", {
            params: {
                pageIndex: pagingParmas.pageIndex || 1,
                pageSize: pagingParmas.pageSize || 10,
            },
        });
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        throw new Error(axiosError.response?.data.message || "");
    }
});
export const readMessage = createAsyncThunk("messages/readMessage", async (messageId) => {
    try {
        const response = await axiosIntance.put(`/UserMessages/${messageId}`);
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        const message = axiosError.response?.data.message || "";
        toast.error(message);
        throw new Error(message);
    }
});
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
