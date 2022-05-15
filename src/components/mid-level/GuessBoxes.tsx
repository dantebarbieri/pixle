import React from 'react'
import Box from '@mui/material/Box/Box'
import GuessStatus from '../../utils/interfaces/guess'
import GuessIndicator from '../low-level/GuessIndicator'

type Props = {
    guesses: GuessStatus[],
    minNumBoxes?: number
}

const GuessBoxes = (props: Props) => {
    const boxes: (GuessStatus | undefined)[] = props.guesses.slice()

    if (props.minNumBoxes) while (boxes.length < props.minNumBoxes) {
        boxes.push(undefined)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            m: 1
        }}>
            {boxes.map((box, idx) => (<GuessIndicator key={idx} status={box} />))}
        </Box>
    )
}

export default GuessBoxes