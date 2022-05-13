import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme'
import React from 'react'
import GuessIndicator from '../low-level/GuessIndicator'

type Props = {
    numBoxes: number
}

const GuessBoxes = (props: Props) => {
    const theme = useTheme()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <GuessIndicator status='incorrect' />
            <GuessIndicator status='revealed' />
            <GuessIndicator status='incorrect' />
            <GuessIndicator status='correct' />
            <GuessIndicator />
            <GuessIndicator />
        </Box>
    )
}

export default GuessBoxes