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
          url: '',
          thumbnailUrl: '',
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
