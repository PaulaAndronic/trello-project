import { Typography, Stack, Box } from "@mui/material";
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
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={18} fontWeight="bold" p={1}>{title}</Typography>
        <Stack flexDirection="row" justifyContent="space-around" width={120}>
          <IconButton disableRipple disableFocusRipple onClick={handleOpenAddCardModal}>
            <AddIcon sx={{ color: "black" }} style={{ fontSize: '27px' }} />
          </IconButton>
          <AddCardModal open={openAddCardModal} handleClose={handleCloseAddCardModal} listId={listId} />
          <IconButton disableRipple disableFocusRipple onClick={handleOpenEditListModal}>
            <EditIcon sx={{ color: "black" }} />
          </IconButton>
          <EditListModal open={openEditListModal} handleClose={handleCloseEditListModal} listId={listId} listTitle={title} />
          <IconButton disableRipple disableFocusRipple onClick={handleOpenDeleteListModal}>
            <DeleteIcon sx={{ color: "black" }} />
          </IconButton>
          <DeleteListModal open={openDeleteListModal} handleClose={handleCloseDeleteListModal} listId={listId} />
        </Stack>
      </Stack>
      {children}
    </Box>
  );
}