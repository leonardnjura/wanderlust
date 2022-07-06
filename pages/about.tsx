import { GetServerSideProps } from 'next';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { ILocationData, IUserData } from '../data/types';
import { loadUsers } from '../lib/get-users';
import { detectUserIp, getPublicIpData } from '../services/location.service';
import { NextPageWithLayout } from './page';

export interface IAboutProps {
  userDataApiResponse: IUserData[];
  locationDataApiResponse: ILocationData;
  detectedIp: string;
}
export const getServerSideProps: GetServerSideProps<IAboutProps> = async (
  context
) => {
  let userDataApiResponse: IUserData[] = [];
  let locationDataApiResponse: ILocationData;

  const { req } = context;
  const detectedIp = await detectUserIp(req);

  const data0: IUserData[] = await loadUsers(['_id', 'email']);
  const data1: ILocationData = await getPublicIpData(detectedIp);

  if (Array.isArray(data0)) {
    userDataApiResponse = data0;
  }
  locationDataApiResponse = data1;

  return {
    props: {
      userDataApiResponse,
      locationDataApiResponse,
      detectedIp,
    },
  };
};

const About: NextPageWithLayout<IAboutProps> = ({
  userDataApiResponse,
  locationDataApiResponse,
  detectedIp,
}) => {
  return (
    <section className="flex flex-col items-start gap-y-5">
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">
        About
      </h2>
      <p>
        Nulla luctus risus eu orci convallis, id luctus nibh molestie dedicado.
        In pulvinar fringilla diam id posuere ao. Class aptent taciti sociosqu
        ad litora torquent per conubia nostra, per inceptos himenaeos doce.
        Phasellus at ornare odio doce. Sed vitae bibendum diam pendo. In
        convallis congue turpis, non dapibus turpis efficitur congue. Etiam
        posuere commodo dignissim. Sed nec sem ultrices, sagittis urna id,
        lacinia purus for. Mauris consectetur urna non ipsum blandit, vitae
        hendrerit tellus varius a. Morbi suscipit finibus arcu, id tristique
        turpis vulputate id. Fala de{' '}
        {`${locationDataApiResponse.country?.toLowerCase()} e ${locationDataApiResponse.continent?.toLowerCase()}`}
        .
      </p>

      <div className="flex flex-row pt-4 pb-2">
        {userDataApiResponse.map((item, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{item.email}
          </span>
        ))}
      </div>
    </section>
  );
};

export default About;

About.getLayout = (page) => {
  return <PrimaryLayout pageTitle="About">{page}</PrimaryLayout>;
};
