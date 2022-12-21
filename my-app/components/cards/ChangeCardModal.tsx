import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { style } from "../data";

type ChangeCardModalProps = {
  open: boolean,
  handleClose(): void,
  cardId: number,
  cardTitle: string
}

export const ChangeCardModal = ({ open, handleClose, cardId, cardTitle }: ChangeCardModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = React.useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setTitle(cardTitle);
  }, [cardTitle])

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()

    const data = {
      title: title,
      description: description,
      cardId: cardId
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = `http://127.0.0.1:3001/board/${router.query.boardId}/cards-list`

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'cors',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
  }

  const handleDeleteCard = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()
    const data = {
      cardId: cardId,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `http://127.0.0.1:3001/board/${router.query.boardId}/cards-list`

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
        <Stack flexDirection="row" justifyContent="space-between" width={350}>
          <Typography variant="h6">Edit card</Typography>
          <Button disableRipple disableFocusRipple onClick={handleDeleteCard}>
            <DeleteIcon sx={{ color: "black" }} />
          </Button>
        </Stack>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={title}
          onChange={handleChange} />
        <textarea
          value={description}
          onChange={handleChangeDescription}
          style={{ height: '100px', padding: '10px' }}
          placeholder="Description"
        />
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={handleSubmit} disabled={title === ''}>Submit</Button>
          <Button onClick={handleClose} sx={{ color: 'red' }}>Close</Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

