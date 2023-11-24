export const auth: (accessToken: string) => { Authorization: string } = accessToken => ({
  Authorization: `Bearer ${accessToken}`,
});
