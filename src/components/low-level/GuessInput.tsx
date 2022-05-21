import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import Content from '../../utils/interfaces/content';

type Props = {
  options: string[]
  limit?: number
  disabled?: boolean
  setGuessedArtwork: React.Dispatch<React.SetStateAction<string | null>>
}

const GuessInput = (props: Props) => {
  const filterOptions = createFilterOptions({
    limit: props.limit
  });

  return (
    <Autocomplete
      id="filter-demo"
      options={props.options}
      getOptionLabel={option => option as string}
      filterOptions={filterOptions}
      onChange={(_, option) => props.setGuessedArtwork(option as string)}
      fullWidth
      disabled={props.disabled}
      renderInput={(params) => <TextField {...params} label="Artwork name" />}
    />
  )
}

export default GuessInput