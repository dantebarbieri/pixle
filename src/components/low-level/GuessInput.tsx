import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React from 'react'

type Props = {
  options: string[]
  limit?: number
}

const GuessInput = (props: Props) => {
  const filterOptions = createFilterOptions({
    limit: props.limit
  });

  return (
    <Autocomplete
      id="filter-demo"
      options={props.options}
      filterOptions={filterOptions}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Artwork name" />}
    />
  )
}

export default GuessInput