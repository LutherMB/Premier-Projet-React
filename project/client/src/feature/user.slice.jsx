import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    users: null,
    post: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    uploadPicture: (state, action) => {
      state.user = { ...state.user, picture: action.payload };
    },
    updateBio: (state, action) => {
      state.user = { ...state.user, bio: action.payload };
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    followUser: (state, action) => {
      state.user = {
        ...state.user,
        following: [...state.user.following, action.payload],
      };
    },
    unfollowUser: (state, action) => {
      state.user = {
        ...state.user,
        following: state.user.following.filter((id) => id !== action.payload),
      };
    },
    getPosts: (state, action) => {
      state.post = action.payload;
    },
    likePost: (state, action) => {
      state.post = state.post.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [...post.likers, action.payload.userId],
          };
        } else {
          return post;
        }
      });
    },
    unlikePost: (state, action) => {
      state.post = state.post.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
            // [...post.likers, action.payload.userId],
          };
        } else {
          return post;
        }
      });
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
  console.log(data);
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
      .then(async () => {
        return await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
          },
        }).then((res) => {
          console.log(res.data.picture);
          dispatch(uploadPicture(res.data.picture));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosBio(uid, bio) {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
      data: {
        bio: bio,
      },
    })
      .then(async (res) => {
        console.log(res.data.result.bio);
        await dispatch(updateBio(res.data.result.bio));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosUsers() {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
    })
      .then(async (res) => {
        console.log(res);
        await dispatch(getUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosFollow(followerId, idToFollow) {
  return async (dispatch) => {
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/${followerId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
      data: {
        idToFollow,
      },
    })
      .then(async (res) => {
        console.log(res);
        await dispatch(followUser(idToFollow));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosUnfollow(followerId, idToUnfollow) {
  return async (dispatch) => {
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/${followerId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
      data: {
        idToUnfollow,
      },
    })
      .then(async (res) => {
        console.log(res);
        await dispatch(unfollowUser(idToUnfollow));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosGetPosts(num) {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
    })
      .then(async (res) => {
        console.log(res);
        const array = res.data.slice(0, num)
        await dispatch(getPosts(array));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosLikePost(postId, userId) {
  return async (dispatch) => {
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
      data: {
        id: userId,
      },
    })
      .then(async (res) => {
        console.log(res);
        await dispatch(likePost({ postId, userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function axiosUnlikePost(postId, userId) {
  return async (dispatch) => {
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
      },
      data: {
        id: userId,
      },
    })
      .then(async (res) => {
        console.log(res);
        await dispatch(unlikePost({ postId, userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const {
  getUser,
  uploadPicture,
  updateBio,
  getUsers,
  followUser,
  unfollowUser,
  getPosts,
  likePost,
  unlikePost,
} = userSlice.actions;
export default userSlice.reducer;
