const refreshToken = localStorage.getItem("refreshToken");

export const config = {
  headers: {
    authorization: `Bearer ${
      refreshToken !== null ? refreshToken : ""
    }`,
    Accept: "application/json",
  },
};