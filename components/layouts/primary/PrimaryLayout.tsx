import Head from 'next/head';
import Footer from '../../navigation/footer/Footer';
import Header from '../../navigation/header/Header';

export interface IPrimaryLayout {
  children: React.ReactNode;
  justify?: 'items-start' | 'items-center' | 'items-end';
  pageTitle: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  justify = 'items-center',
  pageTitle,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle} | Wanderlust</title>
      </Head>
      <div className={`min-h-screen flex flex-col ${justify}`}>
        <Header />
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        <Footer />
      </div>
    </>
  );
};

export default PrimaryLayout;
