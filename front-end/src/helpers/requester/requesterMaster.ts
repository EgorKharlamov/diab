import axios from 'axios';

axios.defaults.withCredentials = true;
const requesterMaster = async (query:string, ctx?:any) => {
  const url = 'http://localhost:8000/graphql';
  const method = 'post';
  let headers;
  if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie: ctx.req.headers.cookie,
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  const data = {
    query,
  };
  const response = await axios({
    url,
    method,
    headers,
    data,
  });
  return response.data;
};
export default requesterMaster;
