import axios from 'axios';

export const requester = (query:string, variables?:Record<string | number, undefined>) => {
  const url = 'http://localhost:8000/graphql';
  const method = 'post';
  const headers = {
    'Content-Type': 'application/json'
  };
  const data = {
    query: query,
    variables: variables
  };
  return axios({
    url: url,
    method: method,
    headers: headers,
    data: data
  });
};
