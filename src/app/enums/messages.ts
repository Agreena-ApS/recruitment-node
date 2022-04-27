
export = {
  USER_ALREADY_SIGNED_UP: {
    type: "warning",
    text: "You have already signed up",
  },
  USER_SIGNED_UP_SUCCESSFULLY: {
    type: "success",
    text: "Registration was successful. An activation link was sent to your email.",
  },
  SIGNED_IN_SUCCESSFULLY: {
    type: "success",
    text: "Signed in successfully.",
  },
  SIGNED_OUT_SUCCESSFULLY: {
    type: "success",
    text: "Signed out successfully.",
  },
  NOT_SIGNED_IN: {
    type: "warning",
    text: "You are not signed in.",
  },
  USER_ACTIVATED_SUCCESSFULLY: {
    type: "success",
    text: "Account activated successfully",
  },
  USER_DEACTIVATED_SUCCESSFULLY: {
    type: "warning",
    text: "Account deactivated",
  },
 
  ACCESS_REVOKED_SUCCESSFULLY: (count: string) => {
    return {
      type: "warning",
      text: `${count} security token successfully revoked`,
    };
  },


  DATA_SUBMITTED_SUCCESSFULLY: (noun: string) => {
    return {
      type: "success",
      text: `${noun} submitted successfully`,
    };
  },
  DATA_EDITED_SUCCESSFULLY: (noun: string) => {
    return {
      type: "success",
      text: `${noun} updated successfully`,
    };
  },

  FAILED_USER_SIGN_UP: {
    type: "warning",
    text: "The registration process encountered a problem.",
  },
  PASSWORD_RESET_CODE_SENT: {
    type: "success",
    text: "A password reset code will be sent to you if the username or email is valid..",
  },
  PASSWORD_RESET_VERIFICATION_EMAIL_SENT: {
    type: "success",
    text: "An activation link will be sent to you if the username or email is valid.",
  },

  EMAIL_VERIFIED_SUCCESSFULLY: "Email verified successfully.",
  EMAIL_ALREADY_VERIFIED: "Email already verified.",
  EMAIL_VERIFICATION_CODE_EXPIRED: "Email verification code expired.",
  EMAIL_VERIFICATION_CODE_NOT_FOUND: "Email verification code not found.",
};
