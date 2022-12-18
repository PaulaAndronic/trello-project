import React, { useEffect } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Navbar } from '../components/Navbar';
import styled from '@emotion/styled';
import { AddBoardModal } from '../components/boards/AddBoardModal';
import { useRouter } from 'next/router';
import { ItemContent } from '../components/ItemContent';

type BoardsType = {
  boards: {
    boardid: number,
    title: string,
    color: string;
  }[]
}

export const Item = styled(Paper)(() => ({
  padding: '10px',
  textAlign: 'left',
  height: 150,
  width: 300,
}));

const Home = ({ boards }: BoardsType) => {
  const [openAddBoardModal, setAddBoardModal] = React.useState(false);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleOpenAddBoardModal = () => {
    setAddBoardModal(true);
  };
  const handleCloseAddBoardModal = () => {
    setAddBoardModal(false);
    refreshData();
  };

  return (
    <div>
      <Head>
        <title>Trello</title>
        <meta
          name="boards"
          content="Boards page description"
        />
      </Head>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} px={25} py={20}
          direction="row"
          alignItems="center"
          justifyContent="center">
          {boards?.map(board => (
            <Grid item xs={2} sm={4} md={4} key={board.boardid}>
              <Item
                sx={{
                  backgroundColor: `${board.color}`,
                  color: 'white',
                  position: 'relative'
                }}>
                <ItemContent
                  title={board.title}
                  boardId={board.boardid}
                />
              </Item>
            </Grid>
          ))}
          <Grid item xs={2} sm={4} md={4}>
            <Button onClick={handleOpenAddBoardModal}>
              <Item
                sx={{
                  color: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ecdede'
                }}
              >
                <Typography>Add new board</Typography>
              </Item>
            </Button>
            <AddBoardModal open={openAddBoardModal} handleClose={handleCloseAddBoardModal} />
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://127.0.0.1:3001");
  const boards = await res.json();
  boards.sort(function(a: any, b: any) {
    return a.boardid - b.boardid;
  });
  return { props: { boards } }
}

export default Home;