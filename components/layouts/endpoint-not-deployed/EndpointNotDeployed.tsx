import { ParsedUrlQuery } from 'querystring';

export interface IEndpointNotDeployed {
  customMessage?: string;
}

const EndpointNotDeployed: React.FC<IEndpointNotDeployed> = ({
  customMessage = 'Endpoint undeployed or unengaged',
}) => {
  return (
    <section className="f-width flex flex-row   items-center pt-24">
      <h2 className="my-vrule">id:</h2>
      <p className="my-vrule-text">{customMessage}</p>
    </section>
  );
};

export default EndpointNotDeployed;
