import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AdminLayout, MainLayout } from '~/components/layout';
import { Box, Typography } from '@mui/material';
// import Header from '~/components/common/Header';

//dynamic giúp chỉ render bên phía client mà ko render bên phía server
// const Header = dynamic(() => import('~/components/common/header'), {
//   ssr: false,
// });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();

  const [postList, setPostList] = useState([]);
  const page = router.query?.page;

  console.log('About query: ', router.query);

  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [page]);

  //shallow routeing giúp ko phải chạy getStaticProps m,ỗi khi chỉ muốn thay đổi bên phía người dùng
  function handleNextClick() {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About Page
      </Typography>

      {/* <Header /> */}

      <ul>
        {postList.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <button onClick={handleNextClick}>next page</button>
    </Box>
  );
}

AboutPage.Layout = AdminLayout;

export const getStaticProps = async () => {
  console.log('get static props');
  return {
    props: {},
  };
};
