import axios from "axios";

export function requestGetUser() {
  return axios.request({
    method: "get",
    url: "https://reqres.in/api/users?page=1",
  });
}
