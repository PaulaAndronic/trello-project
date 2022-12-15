import React from 'react'
import { Typography } from '@mui/material';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

type BoardsType = {
  boards: {
    id: number,
    title: string,
  }[]
}
const Boards = ({ boards }: BoardsType) => {
  return (
      <>
          <Head>
              <title>Trello</title>
              <meta
                  name="description"
                  content="Posts page description"
              />
          </Head>
          <h1>Posts page</h1>
          <div className="container">
              <div className="row">
                  {boards?.map(board => (
                      <div
                          key={board.id}
                          className="col"
                      >
                          <Typography>{board.title}</Typography>
                      </div>
                  ))}
              </div>
          </div>
      </>);
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://127.0.0.1:3001");
  const boards = await res.json();
  return {props: { boards }}
}

export default Boards;
