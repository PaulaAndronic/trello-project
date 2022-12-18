import React from 'react'
import { Stack, Button, Typography } from '@mui/material';
import Head from 'next/head';
import { Navbar } from '../../../components/Navbar';
import { GetServerSideProps } from 'next';
import AddIcon from '@mui/icons-material/Add';
import { AddListModal } from "../../../components/lists/AddListModal";
import { useRouter } from 'next/router';
import { ListHeader } from '../../../components/ListHeader';

type ListsType = {
  tasksLists: {
    boardid: number,
    listid: number,
    title: string;
  }[]
}


const BoardContent = ({ tasksLists }: ListsType) => {
  const [openAddListModal, setAddListModal] = React.useState(false);

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
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '10px',
          margin: '10px',
          flexDirection: 'row'
        }}
      >
        {tasksLists?.map(taskList => (
          <div key={taskList.listid}>
            <ListHeader title={taskList.title} listId={taskList.listid}></ListHeader>
          </div>
        ))}
        <Button onClick={handleOpenAddListModal}>
          <Stack
            sx={{
              borderRadius: '3px',
              minHeight: '62px',
              minWidth: '220px',
              padding: '4px',
              backgroundColor: '#00000014',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px',
              flexDirection: 'row'
            }}
          >
            <AddIcon />
            <Typography>Add another list</Typography>
          </Stack>
        </Button>
      </Stack>
      <AddListModal open={openAddListModal} handleClose={handleCloseAddListModal} />
    </div >
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://127.0.0.1:3001/board/${context.params?.boardId}`);
  const tasksLists = await res.json();
  tasksLists.sort(function (a: any, b: any) {
    return a.listid - b.listid;
  });
  return { props: { tasksLists } }
}


export default BoardContent;