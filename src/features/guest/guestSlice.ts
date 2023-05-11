import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {}
});

export default guestSlice.reducer