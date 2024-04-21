import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  RequestTicketItem,
  ChangingTicketRequest,
  BaseResponse,
  BasketModel,
} from "../models/shared.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { RootState } from ".";
import { toast } from "react-toastify";

interface BasketState {
  basket: BasketModel | null;
  loading: boolean;
  error: string;
  changingTicket: {
    flightLoadId: string;
    ticketTypeId: string;
  } | null;
  isEmptying: boolean;
}

const initialState: BasketState = {
  basket: null,
  loading: false,
  error: "",
  changingTicket: null,
  isEmptying: false,
};

export const fetchBasket = createAsyncThunk("basket/fetchBasket", async () => {
  try {
    const response = await axiosIntance.get<
      null,
      AxiosResponse<BaseResponse<BasketModel>>
    >("/ShoppingCarts");
    return response.data.content;
  } catch (error) {
    const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
      message: string;
    }>;
    throw new Error(axiosError.response?.data.message || "");
  }
});

export const addTicketToBasket = createAsyncThunk(
  "basket/addTicket",
  async (ticket: RequestTicketItem, { dispatch, getState }) => {
    try {
      const basket = (getState() as RootState).basket.basket;
      const userCode = (getState() as RootState).auth.code;
      const items: RequestTicketItem[] =
        basket?.items.map((item) => {
          return {
            flightLoadId: item.flightLoadId,
            ticketTypeId: item.ticketTypeId,
            userCode: item.userCode === userCode ? null : item.userCode,
          };
        }) || [];
      items.push(ticket);
      const response = await axiosIntance.put<
        ChangingTicketRequest,
        AxiosResponse<BaseResponse<BasketModel>>
      >("/Reservations", { items });
      toast.success(response.data.message);
      dispatch(fetchBasket());
      return response.data.content;
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

export const removeTicketFromBasket = createAsyncThunk(
  "basket/removeTicket",
  async (tickets: RequestTicketItem[], { dispatch, getState }) => {
    try {
      const basket = (getState() as RootState).basket.basket;
      const userCode = (getState() as RootState).auth.code;
      let items: RequestTicketItem[] =
        basket?.items.map((item) => {
          return {
            flightLoadId: item.flightLoadId,
            ticketTypeId: item.ticketTypeId,
            userCode: item.userCode === userCode ? null : item.userCode,
          };
        }) || [];
      items = items.filter((item) => {
        const findInRemovings = tickets.find((ticket) => {
          const ticketUserCode: number | null =
            ticket.userCode === userCode ? null : ticket.userCode;
          return (
            ticket.flightLoadId === item.flightLoadId &&
            ticket.ticketTypeId === item.ticketTypeId &&
            ticketUserCode == item.userCode
          );
        });
        return !findInRemovings;
      });
      const response = await axiosIntance.put<
        ChangingTicketRequest,
        AxiosResponse<BaseResponse<BasketModel>>
      >("/Reservations", { items });
      toast.success(response.data.message);
      dispatch(fetchBasket());
      return response.data.content;
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

export const emptyBasket = createAsyncThunk(
  "basket/empty",
  async (_, { dispatch }) => {
    try {
      const response = await axiosIntance.put<
        ChangingTicketRequest,
        AxiosResponse<BaseResponse<BasketModel>>
      >("/Reservations", { items: [] });
      toast.success(response.data.message);
      dispatch(fetchBasket());
      return response.data.content;
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

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.basket = null;
      state.changingTicket = null;
      state.error = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasket.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
        state.basket = null;
      })
      //   add
      .addCase(addTicketToBasket.pending, (state, action) => {
        state.changingTicket = {
          flightLoadId: action.meta.arg.flightLoadId,
          ticketTypeId: action.meta.arg.ticketTypeId,
        };
      })
      .addCase(addTicketToBasket.fulfilled, (state) => {
        state.changingTicket = null;
      })
      .addCase(addTicketToBasket.rejected, (state) => {
        state.changingTicket = null;
      })
      //   remove
      .addCase(removeTicketFromBasket.pending, (state, action) => {
        state.changingTicket = {
          flightLoadId: action.meta.arg[0].flightLoadId,
          ticketTypeId: action.meta.arg[0].ticketTypeId,
        };
      })
      .addCase(removeTicketFromBasket.fulfilled, (state) => {
        state.changingTicket = null;
      })
      .addCase(removeTicketFromBasket.rejected, (state) => {
        state.changingTicket = null;
      })
      //   empty
      .addCase(emptyBasket.pending, (state) => {
        state.isEmptying = true;
      })
      .addCase(emptyBasket.fulfilled, (state) => {
        state.isEmptying = false;
      })
      .addCase(emptyBasket.rejected, (state) => {
        state.isEmptying = false;
      });
  },
});

export default basketSlice.reducer;
export const basketActions = basketSlice.actions;
