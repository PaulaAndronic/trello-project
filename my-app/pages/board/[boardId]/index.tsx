import React from 'react'
import { Stack, Button, Typography, Box } from '@mui/material';
import Head from 'next/head';
import { Navbar } from '../../../components/Navbar';
import { GetServerSideProps } from 'next';
import { AddListModal } from "../../../components/lists/AddListModal";
import { useRouter } from 'next/router';
import { CardsList } from '../../../components/CardsList';
import { ChangeCardModal } from '../../../components/cards/ChangeCardModal';

export type ListsType = {
  lists: [{
    boardid: number,
    listid: number,
    title: string,
  }],
  cards: [{
    cardid: number,
    fklist: number,
    cardtitle: string,
    description: string
  }];
}

const BoardContent = ({ lists, cards }: ListsType) => {
  const [openAddListModal, setAddListModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [cardId, setCardId] = React.useState(-1);
  const [openChangeCardModal, setChangeCardModal] = React.useState(false);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleOpenAddListModal = () => {
    setAddListModal(true);
  };
  const handleCloseAddListModal = () => {
    setAddListModal(false);
    refreshData();
  };

  const handleOpenChangeCardModal = (title: string, cardId: number) => {
    setChangeCardModal(true);
    setTitle(title);
    setCardId(cardId);
  };

  const handleCloseChangeCardModal = () => {
    setChangeCardModal(false);
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
      <Stack
        sx={{
          alignItems: 'baseline',
          justifyContent: 'flex-start',
          gap: '10px',
          m: '20px',
          flexDirection: 'row'
        }}
      >
        {lists?.map(list => (
          <div key={list.listid}>
            <CardsList title={list.title} listId={list.listid}>
              {cards?.map(card => (
                list.listid === card.fklist &&
                <Box
                  key={card.cardid}
                  sx={{
                    backgroundColor: 'white',
                    minHeight: '60px',
                    my: '10px',
                    mx: '5px',
                    borderRadius: '5px',
                    p: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleOpenChangeCardModal(card.cardtitle, card.cardid)}>
                  <Typography>{card.cardtitle}</Typography>
                </Box>
              ))}
            </CardsList>
          </div>
        ))}
        <div>
          <Stack>
            <Button
              onClick={handleOpenAddListModal}
              sx={{
                backgroundColor: '#00000014',
                minHeight: '62px',
                minWidth: '320px',
              }}
            >
              <Typography>Add another list</Typography>
            </Button>
          </Stack>
        </div>
      </Stack>
      <AddListModal open={openAddListModal} handleClose={handleCloseAddListModal} />
      <ChangeCardModal
        open={openChangeCardModal}
        handleClose={handleCloseChangeCardModal}
        cardTitle={title}
        cardId={cardId}
      />
    </div >
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://127.0.0.1:3001/board/${context.params?.boardId}`);
  const cardsRes = await fetch(`http://127.0.0.1:3001/board/${context.params?.boardId}/cards-list`);
  const lists = await res.json();
  const cards = await cardsRes.json();
  console.log(cards);
  return { props: { lists, cards } }
}


export default BoardContent;