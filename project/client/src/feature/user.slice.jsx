import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  // Le slice (qui regroupe le reducer et l'action)
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    getUser: async (state, action) => {
      // Le reducer setUser mettra le payload comme valeur du champ "user" du state
      // state.user = action.payload;
      return await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user`,
        withCredentials: true,
        // headers: {
        //   Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
        // },
      })
        .then((res) => {
          console.log(res);
          state.user = action.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
