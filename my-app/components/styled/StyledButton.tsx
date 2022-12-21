import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  min-width: 30px;
  &:active {
    border-style: outset;
    box-shadow: 0 0 0px #3388cc;
  }
`;

export default function IconButton(props: any) {
  return <StyledButton {...props} />;
}