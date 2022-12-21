import { Typography, Button, Stack, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "./styled/StyledButton";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { DeleteListModal } from "./lists/DeleteListModal";
import { EditListModal } from "./lists/EditListModal";
import { AddCardModal } from "./cards/AddCardModal";
import AddIcon from '@mui/icons-material/Add';

type CardsListProps = {
  title: string,
  listId: number,
  children: ReactNode,
}

export const CardsList = ({ listId, title, children }: CardsListProps) => {
  const [openDeleteListModal, setDeleteListModal] = React.useState(false);
  const [openEditListModal, setEditListModal] = React.useState(false);
  const [openAddCardModal, setAddCardModal] = React.useState(false);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const handleOpenDeleteListModal = () => {
    setDeleteListModal(true);
  };
  const handleCloseDeleteListModal = () => {
    setDeleteListModal(false);
    refreshData();
  };
  const handleOpenEditListModal = () => {
    setEditListModal(true);
  };
  const handleCloseEditListModal = () => {
    setEditListModal(false);
    refreshData();
  };

  const handleOpenAddCardModal = () => {
    setAddCardModal(true);
  };
  const handleCloseAddCardModal = () => {
    setAddCardModal(false);
    refreshData();
  };
  return (
    <Box
      sx={{
        borderRadius: '3px',
        minHeight: '62px',
        minWidth: '320px',
        p: '10px',
        backgroundColor: '#00000014',
        position: 'relative'
      }}
    >
      <Typography variant='body1' paddingTop='8px' paddingBottom='10px' paddingX='7px'>{title}</Typography>
      <IconButton disableRipple disableFocusRipple onClick={handleOpenAddCardModal} sx={{ left: '56%', top: '12px' }}>
        <AddIcon sx={{ color: "black" }} style={{ fontSize: '27px' }} />
      </IconButton>
      <AddCardModal open={openAddCardModal} handleClose={handleCloseAddCardModal} listId={listId} />
      <IconButton disableRipple disableFocusRipple sx={{ left: '68%', top: '12px' }} onClick={handleOpenEditListModal}>
        <EditIcon sx={{ color: "black" }} />
      </IconButton>
      <EditListModal open={openEditListModal} handleClose={handleCloseEditListModal} listId={listId} listTitle={title} />
      <IconButton disableRipple disableFocusRipple sx={{ left: '80%', top: '12px' }} onClick={handleOpenDeleteListModal}>
        <DeleteIcon sx={{ color: "black" }} />
      </IconButton>
      <DeleteListModal open={openDeleteListModal} handleClose={handleCloseDeleteListModal} listId={listId} />
      {children}
    </Box>
  );
}