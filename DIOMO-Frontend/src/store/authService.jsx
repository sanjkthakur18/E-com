/* export const isUserAuthenticated = () => {
    const authToken = document.cookie.split('; ').find((row) => row.startsWith('refreshToken='));
    if (authToken) {
      const token = authToken.split('=')[1];
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        return true;
      }
    }
    return false;
  }; */