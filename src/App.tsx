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

type Props = {}

const App = (props: Props) => {
  const theme = useTheme()

  const [artworks, setArtworks] = React.useState<Art[]>([])
  const [selectedArtwork, setSelectedArtwork] = React.useState<Art>()

  React.useEffect(() => {
    setArtworks([
      {title: 'Mona Lisa', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'},
      {title: 'David', url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Michelangelo%27s_David_-_right_view_2.jpg'},
      {title: 'Sistine Chapel', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Sistine_Chapel_ceiling_02_%28brightened%29.jpg'},
      {title: 'Last Supper', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg'},
      {title: 'Great Wave off Kanegawa', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg'},
      {title: 'Starry Night', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'},
      {title: 'Storm on the Sea of Galilee', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg'},
    ])
  }, [])

  React.useEffect(() => {
    setSelectedArtwork(artworks[Math.floor(Math.random() * artworks.length)])
  }, [artworks])

  const [pixelation, setPixelation] = React.useState(6)
  const [guesses, setGuesses] = React.useState<GuessStatus[]>([])

  const [guessedArtwork, setGuessedArtwork] = React.useState<Art | null>(null)

  const makeGuess = React.useCallback(() => {
    if (guessedArtwork) {
      const guess: GuessStatus = guessedArtwork === selectedArtwork ? 'correct' : 'incorrect'

      setGuesses(guesses.concat(guess))
    }
  }, [guessedArtwork, selectedArtwork, guesses])

  const revealImage = React.useCallback(() => {
    if (pixelation > 0) {
      setPixelation(pixelation - 1)
      setGuesses(guesses.concat('revealed'))
    }
  }, [pixelation, guesses])

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
        {selectedArtwork && (<PixelatedImage art={selectedArtwork} pixelation={pixelation} />)}
        <Box>
          <GuessBoxes guesses={guesses} numBoxes={6} />
          <GuessInput options={artworks} limit={6} setGuessedArtwork={setGuessedArtwork} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}>
            <Button onClick={revealImage}>
              <Typography>
                Skip
              </Typography>
            </Button>
            <Button onClick={makeGuess} sx={{color: theme.palette.success.main}}>
              <Typography>
                Guess
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App
