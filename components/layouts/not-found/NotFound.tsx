export interface INotFound {
  customMessage?: string;
}

const NotFound: React.FC<INotFound> = ({
  customMessage = 'Page not found',
}) => {
  return (
    <section className="f-width flex flex-row   items-center pt-24">
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600 border-r-2 pr-2">
        404
      </h2>
      <p className="pl-2">{customMessage}</p>
    </section>
  );
};

export default NotFound;
