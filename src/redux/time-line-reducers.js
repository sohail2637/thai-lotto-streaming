import { createSlice } from "@reduxjs/toolkit";

export const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelinedata: null,
    resault: "",
    video: "",
    token: "",
  },
  reducers: {
    timeline: (state, action) => {
      state.timelinedata = action.payload;
      // console.log("this is reudcer timelis",action.payload);
    },
    resaults: (state, action) => {
      state.resault = action.payload;
      console.log("resaults reducer payload", state.resault);
    },
    drawvideo: (state, action) => {
      state.video = action.payload;
    },
    logintoken: (state, action) => {
      localStorage.setItem("thai-token", action.payload);
      state.token = localStorage.getItem("thai-token");
      console.log("logintoken reducer payload", state.token);
    },
  },
});

export const { timeline, resaults, drawvideo,logintoken } = timelineSlice.actions;

export default timelineSlice.reducer;
