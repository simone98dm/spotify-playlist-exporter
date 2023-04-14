export const useAccount = () => {
  return useState("currentUser", () => {
    const { hash } = useRoute();
    const { token } = extractTokenFromUrl(hash);
    return {
      token,
    };
  });
};
