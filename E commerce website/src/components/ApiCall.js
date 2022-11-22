const ApiCall = (url, method, reguestSucces) => {
  fetch(url, {
    method,
  }).then((response) => response.json()).then(reguestSucces);
};
export default ApiCall;
