import React from 'react'
import Box from '@mui/material/Box/Box'
import GuessStatus from '../../utils/interfaces/guess'
import GuessIndicator from '../low-level/GuessIndicator'

type Props = {
    guesses: GuessStatus[],
    numBoxes?: number
}

const GuessBoxes = (props: Props) => {
    const boxes: (GuessStatus | undefined)[] = props.guesses.slice()

    if (props.numBoxes) while (boxes.length < props.numBoxes) {
        boxes.push(undefined)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            {boxes.map((box, idx) => (<GuessIndicator key={idx} status={box} />))}
        </Box>
    )
}

export default GuessBoxes