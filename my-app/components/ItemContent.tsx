import { Typography, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "./styled/StyledButton";
import { DeleteBoardModal } from ".//boards/DeleteBoardModal";
import React from "react";
import { useRouter } from "next/router";
import { EditBoardModal } from "./boards/EditBoardModal";

type ItemContentProps = {
  title: string,
  boardId: number
}

export const ItemContent = ({ boardId, title }: ItemContentProps) => {
  const [openDeleteBoardModal, setDeleteBoardModal] = React.useState(false);
  const [openEditBoardModal, setEditBoardModal] = React.useState(false);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const handleOpenDeleteBoardModal = () => {
    setDeleteBoardModal(true);
  };
  const handleCloseDeleteBoardModal = () => {
    setDeleteBoardModal(false);
    refreshData();
  };
  const handleOpenEditBoardModal = () => {
    setEditBoardModal(true);
  };
  const handleCloseEditBoardModal = () => {
    setEditBoardModal(false);
    refreshData();
  };

  const handleOpenButton = (boardId: number) => {
    router.push(`board/${boardId}`);
  }
  return (
    <>
      <Typography variant='body1'>{title}</Typography>
      <IconButton disableRipple disableFocusRipple sx={{ left: '68%' }}  onClick={handleOpenEditBoardModal}>
        <EditIcon sx={{ color: 'white' }} />
      </IconButton>
      <EditBoardModal open={openEditBoardModal} handleClose={handleCloseEditBoardModal} boardId={boardId} boardTitle={title} />
      <IconButton disableRipple disableFocusRipple sx={{  left: '80%' }} onClick={handleOpenDeleteBoardModal}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButton>
      <Button onClick={() => handleOpenButton(boardId)} sx={{color: 'white', left: '40%', top: '20%', fontSize: '18px'}}>Open</Button>
      <DeleteBoardModal open={openDeleteBoardModal} handleClose={handleCloseDeleteBoardModal} boardId={boardId} />
    </>
  );
}