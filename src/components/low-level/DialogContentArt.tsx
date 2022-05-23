import { DialogContentText } from '@mui/material'
import Content from '../../utils/interfaces/content'
import nord from '../../utils/nord'

type Props = {
    content: Content
}

const DialogContentArt = (props: Props) => {
    const { content } = props

    return (
        <>
            <DialogContentText>
                <strong>Title</strong> &ndash; {content.title}
            </DialogContentText>
            <DialogContentText>
                <strong>Artist</strong> &ndash; {content.artist}
            </DialogContentText>
            <DialogContentText sx={{
                textAlign: 'center',
                '& > span a': {
                    color: nord[9]
                },
                '& > span a:visited': {
                    color: nord[15]
                }
            }}>
                <span id='attribution' dangerouslySetInnerHTML={{ __html: content.attribution }} />
            </DialogContentText>
        </>
    )
}

export default DialogContentArt