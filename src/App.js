import React, { useState } from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'


 
function App() {
 
  const [ selectedCellsList, updateSelectedCellsList ] = useState([])

  const clearSelectedCellsList = (cell) => {
    updateSelectedCellsList( prev => [])
  }

  const addSelection = (cell) => {
    console.log('ADD selection : ', cell)

    const newData = {
      cell : 'cell'
    }

    updateSelectedCellsList( prev => {
      let updated = Array.from(prev)
      updated.push ( newData )
      return updated
    })
  }

  const getMarkerNumber = () => {
    return selectedCellsList.length + 1
  }


  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()} 

                      getMarkerNumber={getMarkerNumber}
                      addSelection={addSelection}
                      clearSelection={clearSelectedCellsList}
                      />
      
      {/* <div style={{minHeight : '2vh'}}></div>
      <TableWithModel tableHtml={loadOldTable()}/> */}

    </div>
  );
}

export default App;
