import { Typography, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "./styled/StyledButton";
import { DeleteBoardModal } from "./DeleteBoardModal";
import React from "react";
import { useRouter } from "next/router";

type ItemContentProps = {
  title: string,
  boardId: number
}

export const ItemContent = ({ boardId, title }: ItemContentProps) => {
  const [openDeleteBoardModal, setDeleteBoardModal] = React.useState(false);
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
  return (
    <>
      <Typography variant='h6'>{title}</Typography>
      <IconButton disableRipple disableFocusRipple sx={{ left: '70%' }} >
        <EditIcon sx={{ color: 'white' }} />
      </IconButton>
      <DeleteBoardModal open={openDeleteBoardModal} handleClose={handleCloseDeleteBoardModal} boardId={boardId} />
      <IconButton disableRipple disableFocusRipple sx={{  left: '80%' }} onClick={handleOpenDeleteBoardModal}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButton>
    </>
  );
}