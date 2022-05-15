
import React from 'react'
import Art from '../../utils/interfaces/art'
import GuessStatus from '../../utils/interfaces/guess'
import useTheme from '@mui/system/useTheme'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogTitle from '@mui/material/DialogTitle/DialogTitle'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import DialogContentText from '@mui/material/DialogContentText/DialogContentText'
import DialogActions from '@mui/material/DialogActions/DialogActions'
import Button from '@mui/material/Button/Button'
import GuessBoxes from '../mid-level/GuessBoxes'

type Props = {
    open: boolean,
    art: Art | undefined
    guesses: GuessStatus[]
    guessLimit: number
    day: number
    onClose: () => void
}

const guessToEmoji = (guess: GuessStatus | undefined): string => {
    switch (guess) {
        case 'correct':
            return '🟩'
        case 'incorrect':
            return '🟥'
        case 'revealed':
            return '🟦'
        default:
            return '⬜'
    }
}

const ArtworkDialog = (props: Props) => {
    const { open, art, guesses, guessLimit, day, onClose } = props

    const theme = useTheme()

    return (
        <Dialog open={open} onClose={onClose}>
            {art && (<>
                <DialogTitle>{art.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <strong>Artist:</strong> {art.artist}
                    </DialogContentText>
                    <DialogContentText sx={{
                        '& > span a': {
                            color: theme.palette.primary.main
                        },
                        '& > span a:visited': {
                            color: theme.palette.secondary.main
                        }
                    }}>
                        <i>Attribution:</i> <span id='attribution' dangerouslySetInnerHTML={{ __html: art.attribution }} />
                    </DialogContentText>
                    <img src={art.url} alt={art.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    <GuessBoxes guesses={guesses} minNumBoxes={guessLimit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        const paddedGuesses: (GuessStatus | undefined)[] = guesses.slice()
                        while (paddedGuesses.length < guessLimit) paddedGuesses.push(undefined)
                        const shareText: string =
                            `#Pixle #${day}

🖼️${paddedGuesses.map(guess => guessToEmoji(guess)).join('')}`
                        navigator.clipboard.writeText(shareText)
                    }}>
                        Share
                    </Button>
                </DialogActions>
            </>)}
        </Dialog>
    )
}

export default ArtworkDialog