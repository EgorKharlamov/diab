import axios from 'axios';

const requester = (query:string, variables?:Record<string | number, undefined>) => {
  const url = 'http://localhost:8000/graphql';
  const method = 'post';
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    query,
    variables,
  };
  return axios({
    withCredentials: true,
    url,
    method,
    headers,
    data,
  });
};

export default requester;
