import React from 'react'
import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme';
import Content from '../../utils/interfaces/content';

type Props = {
    art: Content,
    pixelation: number,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const PixelatedImage = (props: Props) => {
    const theme = useTheme();

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const imgRef = React.useRef<HTMLImageElement>(null)
    const boxRef = React.useRef<HTMLDivElement>(null);

    const resizeCanvas = React.useCallback(() => {
        const canvas = canvasRef.current
        const img = imgRef.current
        if (canvas && img?.naturalWidth) {
            canvas.width = img.naturalWidth * canvas.clientHeight / img.naturalHeight
        }
    }, [])

    const resizeImage = React.useCallback(() => {
        imgRef.current?.setAttribute('max-height', `${boxRef.current?.clientHeight}px`)
    }, [boxRef])

    const redrawCanvas = React.useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        const img = imgRef.current
        const box = boxRef.current
        if (canvas && ctx && img && box && canvas.width) {
            const scaling = Math.max(1, (img.naturalWidth < img.naturalHeight ? box.clientWidth : box.clientHeight) / 50 * props.pixelation)
            const w = Math.max(1, Math.ceil(canvas.width / scaling));
            const h = Math.max(1, Math.ceil(canvas.clientHeight / scaling));

            ctx.drawImage(img, 0, 0, w, h);

            ctx.imageSmoothingEnabled = false;

            // enlarge the minimized image to full size
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
        }
    }, [props.pixelation])

    const repaintCanvas = React.useCallback(() => { resizeCanvas(); resizeImage(); redrawCanvas() }, [resizeCanvas, resizeImage, redrawCanvas])

    const setupCallback = React.useCallback(() => { props.setLoading(false) }, [props])

    React.useEffect(repaintCanvas, [props.loading, repaintCanvas])

    React.useEffect(() => {
        imgRef.current?.addEventListener("load", setupCallback)
    }, [imgRef, setupCallback])

    React.useEffect(() => {
        repaintCanvas()

        window.addEventListener("resize", repaintCanvas)

        return () => window.removeEventListener("resize", repaintCanvas)
    }, [repaintCanvas])

    return (
        <Box ref={boxRef} sx={{
            display: props.loading ? 'none' : 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderStyle: 'solid',
            m: 4,
            boxSizing: 'content-box',
            flexGrow: props.pixelation
        }}>
            <img ref={imgRef} src={props.art.url} alt={props.art.title} style={{
                maxWidth: '100%',
                maxHeight: `${boxRef.current?.clientHeight}px`,
                display: props.loading ? 'none' : props.pixelation !== 0 ? 'none' : 'initial'
            }} />
            <canvas ref={canvasRef} style={{ flexGrow: 1, display: props.loading ? 'none' : props.pixelation === 0 ? 'none' : 'initial' }} />
        </Box>
    )
}

export default PixelatedImage