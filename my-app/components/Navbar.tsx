import { AppBar, Stack, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <div>
      <AppBar
        sx={{
          height: '60px',
          backgroundColor: '#6495ED'
        }}
        position="static"
      >
        <Stack
          height="60px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h5">Trello</Typography>
        </Stack>
      </AppBar>
    </div>
  )
}