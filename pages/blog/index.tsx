import { Box, Container, Divider } from '@mui/material';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import PostItem from '~/components/blog/post-item';
import { MainLayout } from '~/components/layout';
import { Post } from '~/models';
import { getPostList } from '~/utils/blogs';

// NextJS là Server Site render
// Trang sử dụng Static Site Gereration - SSG
export interface BlogListPageProps {
  posts: Post[];
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  console.log(posts);

  return (
    <Box>
      <Container>
        <h1>Blog</h1>

        <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <PostItem post={post} />
              </Link>

              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

BlogListPage.Layout = MainLayout;

//Không dùng chung với hàm getServerSideProps
export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  //Convert markdown files into list of javascript object
  const postList = await getPostList();

  return {
    props: {
      posts: postList,
    },
  };
};
