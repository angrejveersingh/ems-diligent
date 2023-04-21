import { createSlice } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  SerializableStateInvariantMiddleware: false
});


const initialState = {
  displayName : "",
  siteName:"",
  token:"",
  isLocationEnabled:false,
  lat : 0,
  long: 0
  
}



export const emsSlice = createSlice({
  
  name: 'ems',
  initialState,
  reducers: {
    setDisplayName: (state, action) => {
      //console.log("Display Name", action.payload);
      state.displayName = action.payload;
    },
    setSiteName: (state, action) => {
     // console.log("Site Name", action.payload);
      state.siteName = action.payload;
    },
    enableLocation: (state, action) => {
      //console.log("location redux", action.payload);
      state.isLocationEnabled = action.payload;
    },
    setToken:(state,action)=>{
      state.token = action.payload;
    },
    setLocation:(state, action)=>{
      console.log("Redux location",action.payload.coords );
      state.lat = action.payload.coords.latitude;
      state.long = action.payload.coords.longitude;
    }
 
  },
})

 export const {  setDisplayName, setSiteName, enableLocation, setLocation, setToken } = emsSlice.actions

export default emsSlice.reducer