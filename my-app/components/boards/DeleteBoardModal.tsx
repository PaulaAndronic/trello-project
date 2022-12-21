import { Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { style } from "../data";

type DeleteBoardModalProps = {
  open: boolean,
  handleClose(): void,
  boardId?: number,
}

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
        <Typography variant="h6">Are you sure you want to delete your board?</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={handleSubmit}>Delete</Button>
          <Button onClick={handleClose} sx={{ color: "red" }}>Close</Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
