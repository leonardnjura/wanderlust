import { ParsedUrlQuery } from 'querystring';

export interface IEndpointNotDeployed {
  customMessage?: string;
}

const EndpointNotDeployed: React.FC<IEndpointNotDeployed> = ({
  customMessage = 'Endpoint undeployed or unengaged',
}) => {
  return (
    <section className="f-width flex flex-row   items-center pt-24">
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600 border-r-2 pr-2">
        id:
      </h2>
      <p className="pl-2">{customMessage}</p>
    </section>
  );
};

export default EndpointNotDeployed;
