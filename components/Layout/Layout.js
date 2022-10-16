import Footer from './Footer';
import Header from './Header';
import LoaderSpinner from '../GeneralUI/LoadingSpinner';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const component = loading ? (
    <LoaderSpinner />
  ) : (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );

  return <>{component}</>;
};

export default Layout;
