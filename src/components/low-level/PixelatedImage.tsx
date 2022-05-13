import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme';
import React from 'react'

type Props = {}

const PixelatedImage = (props: Props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `solid ${theme.spacing(1)} currentColor`,
            m: 4,
            width: 'fit-content',
            height: 'fit-content',
        }}>
            <canvas />
        </Box>
    )
}

export default PixelatedImage