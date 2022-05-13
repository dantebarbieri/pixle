import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/system/Box/Box";
import React from "react";
import GuessIndicator from "./components/low-level/GuessIndicator";
import GuessInput from "./components/low-level/GuessInput";
import PixelatedImage from "./components/low-level/PixelatedImage";
import GuessBoxes from "./components/mid-level/GuessBoxes";
import TopBar from "./components/mid-level/TopBar";

type Props = {}

const App = (props: Props) => {
  const theme = useTheme()

  const [artUrl, setArtUrl] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setArtUrl('https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg')
  }, [artUrl])

  return (
    <Box sx={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      p: `0 ${theme.spacing(2)}`,
    }}>
      <TopBar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        m: `${theme.spacing(2)} ${theme.spacing(6)}`,
        flexGrow: 1,
        width: '100%'
      }}>
        {artUrl && (<PixelatedImage url={artUrl} pixelation={6} />)}
        <Box>
          <GuessBoxes numBoxes={6} />
          <GuessInput options={['Mona Lisa', 'David', 'Sistine Chapel', 'Last Supper', 'Great Wave off Kanegawa', 'Starry Night', 'Storm on the Sea of Galilee']} limit={6} />
        </Box>
      </Box>
    </Box>
  );
}

export default App
