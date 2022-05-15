
import React from 'react'
import Dialog from '@mui/material/Dialog/Dialog'
import Art from '../../utils/interfaces/art'
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import useTheme from '@mui/system/useTheme'

type Props = {
    open: boolean,
    art: Art | undefined
    onClose: () => void
}

const ArtworkDialog = (props: Props) => {
    const {open, art, onClose} = props

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
                        <i>Attribution:</i> <span id='attribution' dangerouslySetInnerHTML={{__html: art.attribution}} />
                    </DialogContentText>
                    <img src={art.url} alt={art.title} style={{maxWidth: '100%', maxHeight: '100%'}} />
                </DialogContent>
            </>)}
        </Dialog>
    )
}

export default ArtworkDialog