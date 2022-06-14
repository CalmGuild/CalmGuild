const redirect = "/api/auth";
const scope = "identify";
export default (clientId: string, siteUrl: string) => `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteUrl + redirect)}&response_type=code&scope=${scope}`;
