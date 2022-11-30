import React, { useState } from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'
// import loadOldTable from './data/OldTable'

 
function App() {
  const [counter, updateCounter] = useState(1)

  const getCounter = () => {
    return counter
  }

  const incCounter = () => {
    console.log('Before INC : ', counter)
    
    updateCounter( function(state, props) {
      return Number(state) + 1 
    })
    
    console.log('After INC : ', counter)
  }

  const resetCounter = () => {
    updateCounter( (prev) => {
      return ( 1 )
    })
    console.log('After RESET : ', counter)
  }


  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()} 

                      incMarkCount={incCounter}
                      resetMarkCount={resetCounter}
                      getMarkCount={getCounter} />
      
      {/* <div style={{minHeight : '2vh'}}></div>
      <TableWithModel tableHtml={loadOldTable()}/> */}

    </div>
  );
}

export default App;
