import Router from 'next/router';

const redirect = (res: any, target: string, protectedList: object, pathname:string) => {
  for (const protectedRoute of Object.values(protectedList)) {
    if (pathname.indexOf(protectedRoute) >= 0 && res) {
      res.writeHead(303, { Location: target });
      res.end();
    }
  }
};

export default redirect;
