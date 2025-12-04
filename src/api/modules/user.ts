export const adminLoginApi = (data: { email: string; password: string }) => {
  return Promise.resolve({
    token: "token-" + Date.now(),
  });
};
