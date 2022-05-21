import React from 'react'
import { ReactComponent as PixleLogo } from '../../assets/pixle-square.svg'
import Box from '@mui/system/Box/Box';
import useTheme from '@mui/system/useTheme';
import Typography from '@mui/material/Typography/Typography';
import border_white from '../../assets/logo-border-white.png'
import border_black from '../../assets/logo-border.png'
import { Theme } from '@mui/system/createTheme/createTheme';
import { ContentType } from '../../utils/interfaces/content';
import { nord } from '../../utils/nord';

type Props = {
    contentType: ContentType | undefined
}

const aurora = {
    red: nord[11],
    orange: nord[12],
    yellow: nord[13],
    green: nord[14],
    purple: nord[15],
}

const getSubtitle = (theme: Theme, contentType?: ContentType) => {
    switch (contentType) {
        case 'art':
            return (
                <Typography
                    variant='h3'
                    fontFamily="'Permanent Marker', cursive"
                    fontSize={theme.spacing(2)}
                    color={aurora.purple}
                >
                    Art
                </Typography>
            )
        case 'meme':
            return (
                <Typography
                    variant='h3'
                    fontFamily="'Permanent Marker', cursive"
                    fontSize={theme.spacing(2)}
                    color={aurora.yellow}
                >
                    Meme
                </Typography>
            )
        case 'place':
            return (
                <Typography
                    variant='h3'
                    fontFamily="'Permanent Marker', cursive"
                    fontSize={theme.spacing(2)}
                    color={aurora.red}
                >
                    Place
                </Typography>
            )
        default: return (<></>)
    }
}

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
                    fill: theme.palette.divider,
                    stroke: theme.palette.divider,
                    boxSizing: 'content-box',
                    padding: '0 67%',
                    borderImage: `url(${theme.palette.mode === 'dark' ? border_white : border_black}) 2 4 / 10% 33% / 0 space`,
                }} />
            <Typography
                variant='h1'
                fontFamily="'Permanent Marker', cursive"
                fontSize={theme.spacing(3)}
            >Pixle</Typography>
            {getSubtitle(theme, props.contentType)}
        </Box>
    )
}

export default Logo