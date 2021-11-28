export const isAuthenticated = () => {
  let accessToken = null;
  if (localStorage.getItem("access-token")) {
    accessToken = localStorage.getItem("access-token");
  }
  return !!accessToken;
};
