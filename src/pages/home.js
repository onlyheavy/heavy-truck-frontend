import MainLayout from '@/layouts/MainLayout';

const HomePage = () => {
  return <div>Welcome to the Home Page!</div>;
};

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
