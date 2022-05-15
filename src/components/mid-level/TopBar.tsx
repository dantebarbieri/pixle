import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup'
import Logo from '../low-level/Logo'
import IconButton from '@mui/material/IconButton/IconButton'
import Box from '@mui/material/Box/Box'
import ColorModeContext from '../../utils/contexts/ColorModeContext'
import useTheme from '@mui/material/styles/useTheme'
import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { AppBar } from '@mui/material'

type Props = {
    setArtworkDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TopBar = (props: Props) => {
    const { setArtworkDialogOpen } = props

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <AppBar
            sx={{
                position: 'static',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                backgroundImage: 'none',
                boxShadow: 'none',
                p: `${theme.spacing(1)} ${theme.spacing(3)}`,
                borderBottom: `solid ${theme.spacing(0.5)} ${theme.palette.divider}`
            }}
        >
            <IconButton sx={{visibility: 'hidden'}} color="inherit">
                {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& > *': {
                        m: 1,
                    }
                }}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <IconButton color="inherit">
                        <InfoOutlinedIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <FavoriteBorderIcon />
                    </IconButton>
                </ButtonGroup>
                <Logo />
                <ButtonGroup variant="text" aria-label="text button group">
                    <IconButton color="inherit" onClick={() => setArtworkDialogOpen(true)}>
                        <LeaderboardIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <HelpOutlineIcon />
                    </IconButton>
                </ButtonGroup>
            </Box>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
        </AppBar>
    )
}

export default TopBar