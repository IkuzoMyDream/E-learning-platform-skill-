const isProd = process.env.NODE_ENV === "production";

const config = {
  isProd,
  serverUrlPrefix: isProd
    ? "https://wd11.cloud-workshop.online/api"
    : "http://localhost:1337/api",
  serverAdminUrlPrefix: isProd
    ? "https://wd11-admin.cloud-workshop.online"
    : "http://localhost:1337/api",
};

export default config;
