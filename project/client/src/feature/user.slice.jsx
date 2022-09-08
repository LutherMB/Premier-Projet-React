import { createSlice /*createAsyncThunk*/ } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    uploadPicture: (state, action) => {
      state = {...state, picture: action.payload};
      // state.user.picture = action.payload;
    },
  },
});

export function axiosUser(uid) {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
    })
      .then(async (res) => {
        console.log(res.data);
        await dispatch(getUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosPicture(data, id) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/upload/${id}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
      data,
    })
      .then(async (res) => {
        return await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
          },
          id,
        }).then((res) => {
          dispatch(uploadPicture(res.data.picture));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const { getUser, uploadPicture } = userSlice.actions;
export default userSlice.reducer;
