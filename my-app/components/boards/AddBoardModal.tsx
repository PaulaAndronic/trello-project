import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React from "react";

type AddBoardModalProps = {
  open: boolean,
  handleClose(): void,
}

const COLORS = ['#002D62', '#4B6F44', '#29AB87', '#4c4688', '#E2725B', '#D8BFD8', '#d4cc81'];

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

function randomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AddBoardModal = ({ open, handleClose }: AddBoardModalProps) => {
  const [title, setTitle] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()

    const data = {
      title: title,
      color: COLORS[randomNumberInRange(0, 6)]
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'http://127.0.0.1:3001'

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
        <Typography>Create new board</Typography>
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

