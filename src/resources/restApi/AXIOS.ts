import axios from "axios";
import {
  API_ENDPOINT_BASE_URL
} from "resources/application";

const baseURL = `${__REST_API__BASE_URL__}${API_ENDPOINT_BASE_URL}`;

export const AXIOS = axios.create({
  baseURL,
  data: {}
});

AXIOS.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.resolve({ data: { isSuccess: false, message: "Please check your server/internet connection" } });
    }

    if (error.response.data) {
      console.log(error.response);
      return Promise.resolve({ data: error.response.data });
    }

    return Promise.reject(error);
  }
);

// export const auth = async (Authorization: string | undefined) => {
//   if (!Authorization) {
//     return Promise.resolve({ data: { isSuccess: false, statusCode: "", message: "Client error" } });
//   }

//   return AXIOS
//     .post("/users/login", {}, { headers: { Authorization } })
//     .catch((error) => {
//       if (error.response.data.message) {
//         return error.response;
//       }

//       return { data: { isSuccess: false, statusCode: error.response.status, message: "Server error" } };
//     });
// };

// export const basicAuth = async (username: string, password: string) => {
//   const Authorization = `Basic ${encodeBase64(`${username}:${password}`)}`;

//   return auth(Authorization);
// };

// export const bearerTokenAuth = async () => {
//   const Authorization = getCredentials()?.token;

//   return auth(Authorization);
// };
