import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import UserCard from '../../components/cards/user/UserCard';
import NotFound from '../../components/layouts/not-found/NotFound';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { IUserData } from '../../data/types';
import { loadOneUser, loadUsers } from '../../lib/get-users';
import { NextPageWithLayout } from '../page';

export interface IUserProps {
  userDataApiResponse: IUserData;
}

export const getStaticProps: GetStaticProps<IUserProps, Params> = async (
  context
) => {
  let userDataApiResponse: IUserData = {} as IUserData; //nugget: all fields initialized as null, we check [say, obj._id != null] to prevent ugly renders

  const data0: IUserData = await loadOneUser(context.params!.id);

  if (data0 != null) {
    userDataApiResponse = data0;
  }

  return {
    props: {
      userDataApiResponse,
    },
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const items: IUserData[] = await loadUsers();

  // nugget: set fallback to 'blocking' to serve other all untraversed paths as manually requested by site users
  // nugget: if using an undeployed local api $ yarn build fails, enable a tempfix but do a follow up deployment with all static auto-generated paths to enjoy next.js static speed

  // tempfix: enable to pass build [traverse just a few known live ids]
  // const paths = Array.from({ length: 3 }, (_, index) => ({
  //   params: {
  //     id: (index + 1).toString(),
  //   },
  // }));

  // preferred: works always in dev [fails $ yarn build if it uses a local api that has not been deployed as cannot find ids :/]
  const ids = items.map((item: IUserData) => item._id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

const About: NextPageWithLayout<IUserProps> = ({ userDataApiResponse }) => {
  return userDataApiResponse._id == null ? (
    <NotFound customMessage="Item not found" />
  ) : (
    <section className="flex flex-col items-start gap-y-5">
      <UserCard {...userDataApiResponse} />
      <p className="mb-2"></p>
    </section>
  );
};

export default About;

About.getLayout = (page) => {
  return <PrimaryLayout pageTitle="User">{page}</PrimaryLayout>;
};
