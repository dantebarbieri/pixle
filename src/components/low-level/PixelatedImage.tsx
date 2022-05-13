import React from 'react'
import Box from '@mui/material/Box/Box'
import useTheme from '@mui/material/styles/useTheme';

type Props = {
    url: string,
    pixelation: number
}

const PixelatedImage = (props: Props) => {
    const theme = useTheme();

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const img = new Image();

    const resizeCanvasDraw = React.useCallback(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        canvas.width = img.naturalWidth * canvas.height / img.naturalHeight

        const ctx = canvas.getContext('2d')
        if (ctx) {
            const scaling = 5**props.pixelation
            const w = img.naturalWidth / scaling;
            const h = img.naturalHeight / scaling;

            ctx.drawImage(img, 0, 0, w, h);

            ctx.imageSmoothingEnabled = false;

            // enlarge the minimized image to full size    
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

            setLoaded(true)
        }
    }, [canvasRef, img])
    
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        if (canvasRef.current) {
            img.addEventListener("load", resizeCanvasDraw);
            img.src = props.url;
        }
    }, [loaded])

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