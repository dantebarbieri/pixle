import React from 'react'
import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme';
import Art from '../../utils/interfaces/art';

type Props = {
    art: Art,
    pixelation: number
}

const PixelatedImage = (props: Props) => {
    const theme = useTheme();

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const [img, setImg] = React.useState<HTMLImageElement>()

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (canvas && ctx && img) {
            const scaling = 1.618 ** props.pixelation
            const w = canvas.width / scaling;
            const h = canvas.height / scaling;

            ctx.drawImage(img, 0, 0, w, h);

            ctx.imageSmoothingEnabled = props.pixelation === 0;

            console.log(ctx)

            // enlarge the minimized image to full size    
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
        }
    }, [props.pixelation, img])

    React.useEffect(() => {
        if (canvasRef.current) {
            const image = new Image()
            image.addEventListener("load", () => {
                const canvas = canvasRef.current as HTMLCanvasElement
                canvas.width = image.naturalWidth * canvas.clientHeight / image.naturalHeight
                setImg(image)
            })
            image.src = props.art.url
        }
    }, [props.art])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `solid ${theme.spacing(1)} currentColor`,
            borderRadius: theme.spacing(0.5),
            m: 4,
            flexGrow: 1
        }}>
            <canvas ref={canvasRef} style={{ flexGrow: 1 }} />
        </Box>
    )
}

export default PixelatedImage