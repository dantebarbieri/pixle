
import React from 'react'
import Content, { ContentType } from '../../utils/interfaces/content'
import GuessStatus from '../../utils/interfaces/guess'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogTitle from '@mui/material/DialogTitle/DialogTitle'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import DialogActions from '@mui/material/DialogActions/DialogActions'
import Button from '@mui/material/Button/Button'
import GuessBoxes from '../mid-level/GuessBoxes'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useTheme from '@mui/system/useTheme'
import Snackbar from '@mui/material/Snackbar/Snackbar'
import Alert from '@mui/material/Alert/Alert'
import DialogContentArt from '../low-level/DialogContentArt'
import DialogContentMeme from '../low-level/DialogContentMeme'
import DialogContentPlace from '../low-level/DialogContentPlace'

type Props = {
    open: boolean
    content: Content | undefined
    guesses: GuessStatus[]
    guessLimit: number
    day: number
    gameOver: boolean
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    children?: React.ReactNode
    closeIconColor: string
    onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, closeIconColor, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: closeIconColor
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const copyShare = (guesses: GuessStatus[], guessLimit: number, day: number, contentType: ContentType, setToastOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    const paddedGuesses: (GuessStatus | undefined)[] = guesses.slice()
    while (paddedGuesses.length < guessLimit) paddedGuesses.push(undefined)
    const shareText: string =
        `#Pixle #${day}

${contentType === 'art' ? '🖼️' : contentType === 'meme' ? '🗿' : '🏛️'}${paddedGuesses.map(guess => guessToEmoji(guess)).join('')}`
    navigator.clipboard.writeText(shareText)
    setToastOpen(true)
}

const ShareDialog = (props: Props) => {
    const { open, content, guesses, guessLimit, day, gameOver, onClose } = props

    const [toastOpen, setToastOpen] = React.useState(false)

    const handleCloseToast = React.useCallback(() => {
        setToastOpen(false)
    }, [])

    const handleClose = React.useCallback(() => {
        handleCloseToast()
        onClose()
    }, [handleCloseToast, onClose])

    const theme = useTheme()

    return (
        <BootstrapDialog open={open} onClose={handleClose}>
            {content && (<>
                <BootstrapDialogTitle onClose={handleClose} closeIconColor={theme.palette.text.secondary}>{gameOver ? `Today's ${content?.type}` : 'Your Score'} {gameOver && (<span>&ndash; <Button onClick={() => copyShare(guesses, guessLimit, day, content.type, setToastOpen)}>Share #{day}</Button></span>)}</BootstrapDialogTitle>
                {gameOver && (<DialogContent>
                    {content.type === 'art' ? (<DialogContentArt content={content} />) : content.type === 'meme' ? (<DialogContentMeme content={content} />) : (<DialogContentPlace content={content} />)}
                </DialogContent>)}
                <DialogContent dividers>
                    <GuessBoxes guesses={guesses} minNumBoxes={guessLimit} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => copyShare(guesses, guessLimit, day, content.type, setToastOpen)}>
                        Share
                    </Button>
                </DialogActions>
                <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleCloseToast}>
                    <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
                        Copied score to clipboard
                    </Alert>
                </Snackbar>
            </>)}
        </BootstrapDialog>
    )
}

export default ShareDialog
