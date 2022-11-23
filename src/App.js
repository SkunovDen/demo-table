import React from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'

 
function App() {
  


  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()}/>

    </div>
  );
}

export default App;
