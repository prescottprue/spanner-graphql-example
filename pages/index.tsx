import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import JOBS_QUERY from '../graphql/team.query';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  // Create a query hook
  const { data, loading, error } = useQuery(JOBS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  console.log('data:', data)
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;