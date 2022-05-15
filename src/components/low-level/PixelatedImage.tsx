import React from 'react'
import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme';
import Art from '../../utils/interfaces/art';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

type Props = {
    art: Art,
    pixelation: number
}

const PixelatedImage = (props: Props) => {
    const theme = useTheme();

    const [loading, setLoading] = React.useState(true)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const imgRef = React.useRef<HTMLImageElement>(null)

    const resizeCanvas = React.useCallback(() => {
        const canvas = canvasRef.current
        const img = imgRef.current
        if (canvas && img?.naturalWidth) {
            canvas.width = img.naturalWidth * canvas.clientHeight / img.naturalHeight
        }
    }, [])

    const redrawCanvas = React.useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        const img = imgRef.current
        if (canvas && ctx && img && canvas.width) {
            const scaling = Math.max(1, Math.max(1, 10 * props.pixelation))
            const w = Math.max(1, Math.ceil(canvas.width / scaling));
            const h = Math.max(1, Math.ceil(canvas.clientHeight / scaling));

            ctx.drawImage(img, 0, 0, w, h);

            ctx.imageSmoothingEnabled = false;

            // enlarge the minimized image to full size
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
        }
    }, [props.pixelation])

    const repaintCanvas = React.useCallback(() => { resizeCanvas(); redrawCanvas() }, [resizeCanvas, redrawCanvas])

    const setupCallback = React.useCallback(() => { setLoading(false) }, [])

    React.useEffect(repaintCanvas, [loading, repaintCanvas])

    React.useEffect(() => {
        imgRef.current?.addEventListener("load", setupCallback)
    }, [imgRef, setupCallback])

    React.useEffect(() => {
        repaintCanvas()

        window.addEventListener("resize", repaintCanvas)

        return () => window.removeEventListener("resize", repaintCanvas)
    }, [repaintCanvas])

    return (
        <>
            {loading && (<Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flexGrow: 1
            }}>
                <CircularProgress size={theme.spacing(10)} />
            </Box>)}
            <Box sx={{
                display: loading ? 'none' : 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                border: `solid ${theme.spacing(1)} currentColor`,
                borderRadius: theme.spacing(0.5),
                m: 4,
                flexGrow: 1
            }}>
                <img ref={imgRef} src={props.art.url} alt={props.art.title} height={canvasRef.current?.clientHeight} style={{ display: loading ? 'none' : props.pixelation !== 0 ? 'none' : 'initial' }} />
                <canvas ref={canvasRef} style={{ flexGrow: 1, display: loading ? 'none' : props.pixelation === 0 ? 'none' : 'initial' }} />
            </Box>
        </>
    )
}

export default PixelatedImage