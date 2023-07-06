import { Box, Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Script from 'next/script';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';
import { MainLayout } from '~/components/layout';
import { Post } from '~/models';
import { getPostList } from '~/utils/blogs';

export interface BlogPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: BlogPageProps) {
  if (!post) return null;

  return (
    <Box>
      <Container>
        <h1>Post Detail Page</h1>

        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>

      <Script src="/prism.js" strategy="afterInteractive"></Script>
    </Box>
  );
}

BlogDetailPage.Layout = MainLayout;

//Fecthing data been phía server side
export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nget static paths');

  const postList = await getPostList();

  // rerturn về 2 key require
  return {
    // paths có bai nhiêu item thì sẽ gọi hàm getStaticProps bấy nhiêu lần
    // để tạo ra bấy nhiêu file html tương ứng
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context: GetStaticPropsContext
) => {
  console.log('\nget static props', context.params?.slug);
  const postList = await getPostList();

  const postSlug = context.params?.slug;
  if (!postSlug) return { notFound: true };

  const post = postList.find((x) => x.slug === postSlug);
  if (!post) return { notFound: true };

  // parse md to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'agenda.*' })
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeDocument, { title: 'Blog details page' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || '');
  post.htmlContent = file.toString();

  return {
    props: {
      post: post,
    },
  };
};
