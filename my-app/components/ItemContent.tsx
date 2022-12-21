import { Typography, Button, Stack, Box } from "@mui/material";
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
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={18} fontWeight="bold" p={1}>{title}</Typography>
        <Stack flexDirection="row" justifyContent="space-around" width={80}>
          <IconButton disableRipple disableFocusRipple onClick={handleOpenEditBoardModal}>
            <EditIcon sx={{ color: 'white' }} />
          </IconButton>
          <EditBoardModal open={openEditBoardModal} handleClose={handleCloseEditBoardModal} boardId={boardId} boardTitle={title} />
          <IconButton disableRipple disableFocusRipple onClick={handleOpenDeleteBoardModal}>
            <DeleteIcon sx={{ color: 'white' }} />
          </IconButton>
          <DeleteBoardModal open={openDeleteBoardModal} handleClose={handleCloseDeleteBoardModal} boardId={boardId} />
        </Stack>
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} height={72}>
        <Button onClick={() => handleOpenButton(boardId)} sx={{ color: 'white', fontSize: '18px' }}>Open</Button>
      </Box>
    </>
  );
}