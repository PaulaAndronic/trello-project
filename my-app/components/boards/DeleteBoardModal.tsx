import { Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

type DeleteBoardModalProps = {
  open: boolean,
  handleClose(): void,
  boardId?: number,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const DeleteBoardModal = ({ open, handleClose, boardId }: DeleteBoardModalProps) => {
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()
    const data = {
      boardId: boardId,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'http://127.0.0.1:3001'

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'cors',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
  }

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Stack sx={{ ...style, width: 400, gap: '20px' }}>
        <Typography>Are you sure you want to delete your board?</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={handleSubmit}>Delete</Button>
          <Button onClick={handleClose} sx={{ color: "red" }}>Close</Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
