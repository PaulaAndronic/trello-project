import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { style } from "../data";

type EditListModalProps = {
  open: boolean,
  handleClose(): void,
  listId: number,
  listTitle: string,
}

export const EditListModal = ({ open, handleClose, listId, listTitle }: EditListModalProps) => {
  const [title, setTitle] = React.useState(listTitle);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    handleClose();
    event.preventDefault()
    const data = {
      title: title,
      listId: listId,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `http://127.0.0.1:3001/board/${router.query.boardId}`

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
      <Typography variant="h6">Change the title of your list</Typography>
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
