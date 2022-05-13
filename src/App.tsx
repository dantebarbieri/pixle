import Box from "@mui/system/Box/Box";
import GuessIndicator from "./components/low-level/GuessIndicator";
import GuessInput from "./components/low-level/GuessInput";
import PixelatedImage from "./components/low-level/PixelatedImage";
import TopBar from "./components/mid-level/TopBar";

type Props = {}

const App = (props: Props) => {
  return (
    <>
      <TopBar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <PixelatedImage />
        <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <GuessIndicator />
        <GuessIndicator />
        <GuessIndicator />
        <GuessIndicator />
        <GuessIndicator />
        <GuessIndicator />
      </Box>
      <GuessInput />
      </Box>
    </>
  );
}

export default App
