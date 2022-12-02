import React, { useState } from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'


 
function App() {
 
//** markers state
  const [selected, setSelected] = useState([])

  const getFirst = (cell) => {

    console.log('GET FIRST')
    setSelected ( prev => {
      return [cell]
    })
    
    return 1
  }

  const getNext = (cell) => {
    console.log('GET NEXT')

    const l = selected.length + 1

    setSelected( (prev) => {    
      let updated = Array.from (prev)
      updated.push ( cell )
      
      return updated
    })

    return l
  }

  const print = () => {
    console.log(' ')
    console.log(selected.join('-'))
  }

  const clear = () => {
    console.log('CLEAR')
    setSelected ( prev => {
      return []
    })
  }
//** markers state END


  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()} 
                getFirst={getFirst}
                getNext={getNext}
                print={print}
                clear={clear}

      />
      
      {/* <div style={{minHeight : '2vh'}}></div>
      <TableWithModel tableHtml={loadOldTable()}/> */}

    </div>
  );
}

export default App;
