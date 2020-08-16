import React from 'react';
import { CssBaseline, Container } from '@material-ui/core'
//import Table from '../Table'
import LoadXLS from '../LoadXLS'
//import TableOrigin from '../TableOrigin'
import PureTable from '../PureTable'

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <LoadXLS />
        <PureTable />
      </Container>
    </>
  );
}

export default App;
