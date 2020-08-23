import axios from 'axios';
import { addr } from '../config/addr'

export const requester = (query: string, variables?: Record<string | number, undefined>) => {

  const url = `${addr.protocol || 'http'}://${addr.domain || 'localhost'}:${addr.port || 8000}/graphql`;
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
