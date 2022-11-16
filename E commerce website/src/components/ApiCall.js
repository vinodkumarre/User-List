// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const ApiCall = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url).then((response) => response.json()).then((list) => setData(list));
  }, [url]);
  return [data];
};
export default ApiCall;
