import React from 'react'
import {ReactComponent as PixleLogo} from '../../assets/pixle-square.svg'
import Box from '@mui/system/Box/Box';
import useTheme from '@mui/system/useTheme';
import Typography from '@mui/material/Typography/Typography';
import border from '../../assets/logo-border-white.png'

type Props = {}

const Logo = (props: Props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            m: `0 ${theme.spacing(3)}`
        }}>
            <PixleLogo className='logo'
                height={theme.spacing(4)}
                width='auto'
                style={{
                    // fill: `${theme.palette.divider} !important`,
                    fill: theme.palette.divider,
                    stroke: theme.palette.divider,
                    boxSizing: 'content-box',
                    padding: '0 67%',
                    borderImage: `url(${border}) 2 4 / 10% 33% / 0 space`,
                }} />
            <Typography
            variant='h1'
            fontFamily="'Permanent Marker', cursive"
            fontSize={theme.spacing(3)}
            >Pixle</Typography>
        </Box>
    )
}

export default Logo