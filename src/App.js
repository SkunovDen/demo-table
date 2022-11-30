import React from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'
// import loadOldTable from './data/OldTable'

 
function App() {
 
  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()} 
      
                      />
      
      {/* <div style={{minHeight : '2vh'}}></div>
      <TableWithModel tableHtml={loadOldTable()}/> */}

    </div>
  );
}

export default App;
