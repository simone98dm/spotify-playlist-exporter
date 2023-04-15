export const useToken = () => {
  const { hash } = useRoute();
  const { token } = extractTokenFromUrl(hash);
  return {
    token,
  };
};
