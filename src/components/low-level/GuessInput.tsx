import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Art from '../../utils/interfaces/art';

type Props = {
  options: Art[]
  limit?: number
  setGuessedArtwork: React.Dispatch<React.SetStateAction<Art | null>>
}

const GuessInput = (props: Props) => {
  const filterOptions = createFilterOptions({
    limit: props.limit,
    stringify: (option: Art) => option.title
  });

  return (
    <Autocomplete
      id="filter-demo"
      options={props.options}
      getOptionLabel={option => option.title}
      filterOptions={filterOptions}
      onChange={(_, option) => props.setGuessedArtwork(option)}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Artwork name" />}
    />
  )
}

export default GuessInput