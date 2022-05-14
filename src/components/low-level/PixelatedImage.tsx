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

    const resizeCanvas = React.useCallback(() => {
        const canvas = canvasRef.current
        if (canvas && img) {
            canvas.width = img.naturalWidth * canvas.clientHeight / img.naturalHeight
        }
    }, [img])

    const redrawCanvas = React.useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (canvas && ctx && img) {
            const scaling = 1.618 ** props.pixelation
            const w = canvas.width / scaling;
            const h = canvas.height / scaling;

            ctx.drawImage(img, 0, 0, w, h);

            ctx.imageSmoothingEnabled = props.pixelation === 0;

            // enlarge the minimized image to full size    
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
        }
    }, [props.pixelation, img])

    const repaintCanvas = React.useCallback(() => {resizeCanvas(); redrawCanvas()}, [resizeCanvas, redrawCanvas])

    React.useEffect(() => {
        const image = new Image()
        image.addEventListener("load", () => setImg(image))
        image.src = props.art.url
    }, [props.art])

    React.useEffect(() => {
        repaintCanvas()

        window.addEventListener("resize", repaintCanvas)

        return () => window.removeEventListener("resize", repaintCanvas)
    }, [repaintCanvas])

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