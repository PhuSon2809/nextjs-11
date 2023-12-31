// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string;
// };

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Nhắc với hàm handler là khi nào khi nafp proxy xong sẽ nhắn hành là đx có response đã xong
  return new Promise(() => {
    //Convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      req.headers.authorization = 'Bearer ' + accessToken;
    }

    //don't send cookies to API server
    req.headers.cookie = '';

    // /api/students
    // https://js-post-api.herokuapp.com/api/students

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
