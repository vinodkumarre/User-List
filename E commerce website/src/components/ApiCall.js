import { useEffect, useState } from "react";

const ApiCall = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(url);
    fetch(url).then((response) => response.json()).then((list) => setData(list));
  }, [url]);
  return [data];
};
export default ApiCall;
