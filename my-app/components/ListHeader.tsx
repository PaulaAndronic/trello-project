import { Typography, Button, Stack, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "./styled/StyledButton";
import React from "react";
import { useRouter } from "next/router";
import { DeleteListModal } from "./lists/DeleteListModal";
import { EditListModal } from "./lists/EditListModal";

type ListHeaderProps = {
  title: string,
  listId: number
}

export const ListHeader = ({ listId, title }: ListHeaderProps) => {
  const [openDeleteListModal, setDeleteListModal] = React.useState(false);
  const [openEditListModal, setEditListModal] = React.useState(false);

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
  return (
    <Box
      sx={{
        borderRadius: '3px',
        minHeight: '62px',
        minWidth: '320px',
        padding: '4px',
        backgroundColor: '#00000014',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
        flexDirection: 'column'
      }}
    >
      <Typography variant='body1'>{title}</Typography>
      <IconButton disableRipple disableFocusRipple sx={{ left: '68%' }} onClick={handleOpenEditListModal}>
        <EditIcon sx={{ color: "black" }} />
      </IconButton>
      <EditListModal open={openEditListModal} handleClose={handleCloseEditListModal} listId={listId} listTitle={title} />
      <IconButton disableRipple disableFocusRipple sx={{ left: '80%' }} onClick={handleOpenDeleteListModal}>
        <DeleteIcon sx={{ color: "black" }} />
      </IconButton>
      <DeleteListModal open={openDeleteListModal} handleClose={handleCloseDeleteListModal} listId={listId} />
    </Box>
  );
}