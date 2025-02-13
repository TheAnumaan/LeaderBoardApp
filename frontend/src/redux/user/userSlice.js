import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUSer: null,
    error:null,
    loading:false}

    const userSlice = createSlice({
        name: "user",
        initialState,
        reducers:{
                signInStart:(state)=>{
                    state.loading=true;
                    state.error=null;
                },
                signInSuccess:(state,action)=>{
                    state.loading=false;
                    state.currentUser=action.payload;
                },
                signInFailure:(state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                },
                updateStart: (state) => {
                    state.loading = true;
                    state.error = null;
                  },
                  updateSuccess: (state, action) => {
                    state.currentUser = action.payload;
                    state.loading = false;
                    state.error = null;
                  },
                  updateFailure: (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  },
                  signOut:(state)=>{
                    state.currentUser=null;
                    state.error=null;
                    state.loading=false;
                  }

        }}
    )

    export const {signInStart,signInSuccess,signInFailure,updateFailure,updateSuccess,updateStart,signOut}=userSlice.actions;   
    export default userSlice.reducer;