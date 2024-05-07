import {createSlice} from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    isRecording: false,
    savedRecording: null,
  },
  reducers: {
    startRecording: (state, action) => {
      console.log('action.payload of recording', action.payload);
      state.isRecording = true;
      state.savedRecording = action.payload;
    },
    stopRecording: (state, action) => {
      console.log('action.payload of recording after stopping', action.payload);
      state.isRecording = false;
      state.savedRecording = action.payload;
    },
    clearRecording: state => {
      state.isRecording = false;
      state.savedRecording = null;
    },
  },
});

export const {startRecording, stopRecording, clearRecording} =
  audioSlice.actions;
export const savedRecording = state => state.audio.savedRecording;
export default audioSlice.reducer;
