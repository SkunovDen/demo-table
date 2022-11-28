import React, { useState } from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'
// import loadOldTable from './data/OldTable'

 
function App() {

  const [selectCount, setSelectCount] = useState(1)

    const incCount = () => {
      console.log(' INC ')
      setSelectCount( (prev) => {
        const upd = (Number(prev)+1)
        console.log('PREV ', prev,    'UPD: ', upd)
        return (upd )
      })

    }

    const resetCount = () => {
      console.log('reset')
      setSelectCount( (prev) => {
        return (1)
      })

    }

    const getMarkCount = () => {
      incCount();

      return selectCount
    }



  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()} 
                      getMarkCount={getMarkCount}
                      resetCount={resetCount} />
      
      {/* <div style={{minHeight : '2vh'}}></div>
      <TableWithModel tableHtml={loadOldTable()}/> */}

    </div>
  );
}

export default App;
