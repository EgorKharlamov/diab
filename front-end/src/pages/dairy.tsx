import React from 'react';
import withAuth from '../components/HOC/withAuth';
import Layout from '../components/Layout';
import Table from '../components/Table';

const Dairy = ({ pageProps }:any) => {
  console.log(pageProps);
  return (
    <>
      <Layout>
        <h1>Dairy</h1>
        <Table />
      </Layout>
    </>
  );
};
export const getServerSideProps = async (context:any) => {
  const kek = 'kek';
  return {
    props: {
      pageProps: 'ahahaha',
    },
  };
};

export default withAuth(Dairy);
