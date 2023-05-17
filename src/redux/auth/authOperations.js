// import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authSlice";
import { auth } from "../../firebase/config";
import Toast from "react-native-toast-message";
import authErrorHandler from "../../../helpers/authErrorHandler";

const { updateUser, authStateChange, authSignOut, changeAvatar } =
  authSlice.actions;

// export const authRegister = createAsyncThunk(
//   "auth/register",
//   async ({ login, email, password, imageURL = null }, { rejectWithValue }) => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password); //Створення користувача

//       await updateProfile(auth.currentUser, {
//         displayName: login,
//         photoURL: imageURL,
//       }); //Оновлює інформацію про користувача

//       const { uid, displayName, photoURL } = auth.currentUser;
//       return {
//         userId: uid,
//         nickname: displayName,
//         email: email,
//         avatarURL: photoURL,
//       }; //Повертає оновлену інформацію про користувача
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.message", error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const authLogin = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);

//       // console.log(auth.currentUser);
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.message", error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const authLogOut = createAsyncThunk(
//   "auth/logout",
//   async (_, { dispatch, getState, rejectWithValue }) => {
//     try {
//       await signOut(auth);
//       dispatch(authSignOut());
//     } catch (error) {
//       console.log(error.code);
//       return rejectWithValue("Logout failed");
//     }
//   }
// );

// export const authStateUserChange = createAsyncThunk(
//   "auth/stateChange",
//   async (_, { dispatch }) => {
//     auth.onAuthStateChanged((user) => {
//       // якщо такий користувач знайдений
//       if (user) {
//         // оновлюємо його профайл
//         const userUpdateProfile = {
//           userId: user.uid,
//           nickname: user.displayName,
//           email: user.email,
//           avatarURL: user.photoURL,
//         };

//         dispatch(updateUser(userUpdateProfile));
//         dispatch(authStateChange({ stateChange: true }));
//         return;
//       }
//       dispatch(authStateChange({ stateChange: false }));
//     });
//   }
// );

// export const changeUserPhotoURL = createAsyncThunk(
//   "auth/changeAvatar",

//   async ({ newAvatarUrl }, { rejectWithValue }) => {
//     try {
//       await updateProfile(auth.currentUser, {
//         photoURL: newAvatarUrl,
//       });
//       return newAvatarUrl;
//     } catch (error) {
//       console.log(error.code);
//       return rejectWithValue("Avatar change failed");
//     }
//   }
// );

export const authRegister =
  ({ login, email, password, imageURL = null }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: imageURL,
      });
      const { uid, displayName, photoURL } = auth.currentUser;
      dispatch(
        updateUser({
          userId: uid,
          nickname: displayName,
          email: email,
          avatarURL: photoURL,
        })
      );
    } catch (error) {
      const message = authErrorHandler(error.code);
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const message = authErrorHandler(error.code);
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };

export const authLogOut = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateUserChange = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
        email: user.email,
        avatarURL: user.photoURL,
      };
      dispatch(updateUser(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
      return;
    }
    dispatch(authStateChange({ stateChange: false }));
  });
};

export const changeUserPhotoURL =
  ({ newAvatarURL }) =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: newAvatarURL,
      });
      dispatch(changeAvatar({ avatarURL: newAvatarURL }));
    } catch (error) {
      console.log(error.code);
    }
  };
