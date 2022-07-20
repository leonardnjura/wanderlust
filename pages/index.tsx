import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return <section className="my-page">&nbsp;</section>;
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout titleBar="Home">{page}</PrimaryLayout>;
};
