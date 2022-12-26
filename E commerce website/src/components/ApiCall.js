const APIENDPOINT = "http://localhost:5050";
const ApiCall = (url, method, reguestSucces) => {
  fetch(APIENDPOINT + url, {
    method,
  }).then((response) => {
    if (response.json) {
      return response.json();
    }
    return response;
  }).then(reguestSucces);
};
export default ApiCall;
