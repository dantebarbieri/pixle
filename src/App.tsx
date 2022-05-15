import React from "react";
import Button from "@mui/material/Button/Button";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/system/Box/Box";
import GuessInput from "./components/low-level/GuessInput";
import PixelatedImage from "./components/low-level/PixelatedImage";
import GuessBoxes from "./components/mid-level/GuessBoxes";
import TopBar from "./components/mid-level/TopBar";
import GuessStatus from './utils/interfaces/guess';
import Art from "./utils/interfaces/art";
import Typography from "@mui/material/Typography/Typography";
import ShareDialog from "./components/top-level/ShareDialog";
import ArtworksList from './tmp/artworks.json'

type Props = {
  guessLimit: number
}

const App = (props: Props) => {
  const { guessLimit } = props

  const theme = useTheme()

  const [artworks, setArtworks] = React.useState<Art[]>([])
  const [selectedArtwork, setSelectedArtwork] = React.useState<Art>()
  const [gameOver, setGameOver] = React.useState(false)
  const [openArtworkDialog, setOpenArtworkDialog] = React.useState(gameOver)

  React.useEffect(() => {
    if (gameOver) setOpenArtworkDialog(true)
  }, [gameOver])

  React.useEffect(() => {
    setArtworks(ArtworksList.sort((a, b) => a.title.localeCompare(b.title)))
  }, [])

  React.useEffect(() => {
    setSelectedArtwork(artworks[Math.floor(Math.random() * artworks.length)])
  }, [artworks])

  const [pixelation, setPixelation] = React.useState(guessLimit)
  const [guesses, setGuesses] = React.useState<GuessStatus[]>([])

  const [guessedArtwork, setGuessedArtwork] = React.useState<Art | null>(null)

  const makeGuess = React.useCallback(() => {
    if (guessedArtwork) {
      const guess: GuessStatus = guessedArtwork === selectedArtwork ? 'correct' : 'incorrect'
      if (guess === 'correct' || guesses.length + 1 >= guessLimit) {
        setPixelation(0)
        setGameOver(true)
      }
      setGuesses(guesses.concat(guess))
    }
  }, [guessedArtwork, selectedArtwork, guesses, guessLimit])

  const revealImage = React.useCallback(() => {
    if (pixelation > 0) {
      setPixelation(pixelation - 1)
      if (guesses.length + 1 >= guessLimit) {
        setGameOver(true)
      }
      setGuesses(guesses.concat('revealed'))
    }
  }, [pixelation, guesses, guessLimit])

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
      <TopBar setArtworkDialogOpen={setOpenArtworkDialog} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        m: `${theme.spacing(2)} ${theme.spacing(6)}`,
        flexGrow: 1,
        width: '100%'
      }}>
        {selectedArtwork && (<PixelatedImage art={selectedArtwork} pixelation={pixelation} />)}
        <Box>
          <GuessBoxes guesses={guesses} minNumBoxes={guessLimit} />
          <GuessInput disabled={gameOver} options={artworks} setGuessedArtwork={setGuessedArtwork} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}>
            <Button onClick={revealImage} disabled={gameOver}>
              <Typography>
                Skip
              </Typography>
            </Button>
            <Button onClick={makeGuess} sx={{color: theme.palette.success.main}} disabled={gameOver}>
              <Typography>
                Guess
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <ShareDialog open={openArtworkDialog} art={selectedArtwork} onClose={() => setOpenArtworkDialog(false)} guesses={guesses} guessLimit={guessLimit} day={0} />
    </Box>
  );
}

export default App
