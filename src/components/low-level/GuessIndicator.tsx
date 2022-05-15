import React from 'react'
import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme';
import GuessStatus from '../../utils/interfaces/guess';

type Props = {
  status?: GuessStatus
}

const GuessIndicator = (props: Props) => {
  const theme = useTheme();

  let bgcolor = theme.palette.background.default

  switch(props.status) {
    case 'correct':
      bgcolor = theme.palette.success.main
      break
    case 'incorrect':
      bgcolor = theme.palette.error.main
      break
    case 'revealed':
      bgcolor = theme.palette.info.main
      break
  }
  
  return (
    <Box sx={{
      bgcolor: bgcolor,
      color: theme.palette.text.primary,
      border: `solid ${theme.spacing(0.33)} currentColor`,
      borderRadius: theme.spacing(0.3),
      m: 1,
      width: theme.spacing(5),
      height: theme.spacing(5),
    }} />
  )
}

export default GuessIndicator