const APIENDPOINT = "http://localhost:5050";
const ApiCall = (url, method, reguestSucces, body, headers) => {
  fetch(APIENDPOINT + url, {
    method,
    body,
    headers,
  }).then((response) => {
    if (method === "Get") {
      return response.json();
    }
    return response;
  }).then(reguestSucces);
};
export default ApiCall;
