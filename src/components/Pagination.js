import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

 function PaginationControlled({handleChange, page }) {
  

  return (
    <Stack spacing={2}>
      <Pagination sx = {{display: "flex", justifyContent: "center"}} count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default PaginationControlled;
