const authErrorHandler = (errorCode) => {
  if (errorCode === "auth/invalid-email") {
    return "Incorrect email address";
  }
  if (errorCode === "auth/wrong-password") {
    return "The password is incorrect";
  }
  if (errorCode === "auth/weak-password") {
    return "Password is at least 6 characters long";
  }
  if (errorCode === "auth/email-already-in-use") {
    return "This email is already in use";
  }
};

export default authErrorHandler;
