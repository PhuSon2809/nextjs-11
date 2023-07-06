import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { FeatureWorks, HeroSection, RecentPosts } from '~/components/home';
import { MainLayout } from '~/components/layout';
import { NextPageWithLayout } from '../models';
import Seo from '~/components/common/seo';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Box>
      <Seo
        data={{
          title: 'NextJS Tutorials | Phu Son Frontend Developer',
          description:
            'Step-by-step tutorials to build a full CRUD website using NextJS for beginners',
          url: 'https://ps-learn-nextjs.vercel.app/',
          thumbnailUrl:
            'https://tse1.mm.bing.net/th?id=OIP.rcKVwmwg1wZlroN8v1nBeAHaHa&pid=Api&P=0&h=180',
        }}
      />

      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
