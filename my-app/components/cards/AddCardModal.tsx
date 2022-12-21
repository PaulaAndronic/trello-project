import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { style } from "../data";

type AddCardModalProps = {
  open: boolean,
  handleClose(): void,
  listId: number
}

export const AddCardModal = ({ open, handleClose, listId }: AddCardModalProps) => {
  const [title, setTitle] = React.useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()

    const data = {
      title: title,
      fklist: listId
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = `http://127.0.0.1:3001/board/${router.query.boardId}/cards-list`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'cors',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    setTitle('');
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
        <Typography variant="h6">Create new card</Typography>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleChange} />
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={handleSubmit} disabled={title === ''}>Submit</Button>
          <Button onClick={handleClose} sx={{ color: 'red' }}>Close</Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

