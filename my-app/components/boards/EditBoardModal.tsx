import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React from "react";

type EditBoardModalProps = {
  open: boolean,
  handleClose(): void,
  boardId: number,
  boardTitle: string,
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

export const EditBoardModal = ({ open, handleClose, boardId, boardTitle }: EditBoardModalProps) => {
  const [title, setTitle] = React.useState(boardTitle);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()
    const data = {
      title: title,
      boardId: boardId,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'http://127.0.0.1:3001'

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

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Stack sx={{ ...style, width: 400, gap: '20px' }}>
      <Typography>Change the title of your board</Typography>
        <TextField
          id="outlined-basic"
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
