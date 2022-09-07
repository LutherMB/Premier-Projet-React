import { configureStore } from "@reduxjs/toolkit"; // Simplifie la création du store
import userReducer from "../feature/user.slice";

export default configureStore({
  reducer: {
    users: userReducer,
  },
});
