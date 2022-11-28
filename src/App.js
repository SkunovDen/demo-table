import React, { useState } from 'react';
import './App.css';
import TableWithModel from './components/tableWithModel/TableWithModel';

import loadNewTable from './data/NewTable'
// import loadOldTable from './data/OldTable'

 
function App() {
  const [selectCount, setSelectCount] = useState(0)
  
  const incSelectCount = () => {
    console.log(' INC ')
    setSelectCount( (prev) => {
      const upd = Number(prev) + 1
      console.log('PREV ', prev,    'UPD: ', upd)
      return ( upd )
    })
    console.log('INCd:', selectCount)
  }

  const getMark = () => {
    incSelectCount();

    // const d = document.createElement('div')

    // d.style.backgroundColor = 'yellow'
    // d.style.border = '1px solid black'
    // d.style.margin = '3px'

    // d.textContent = `${count}`


    const mark = document.createElement('div')

    mark.style.border = '1px solid black'
    mark.style.borderRadius = '5px';
    mark.style.backgroundColor='yellow'
    mark.style.width = '50px';
    mark.style.height = '50px';

    mark.style.position = 'absolute'
    mark.style.top = '0'
    mark.style.left = '0'

    // console.log('Mark count: ', selectCount)
    mark.textContent = `${selectCount}`

// console.log('D: ', d)
console.log('M: ', mark)

    return mark
  }
  

  return (
    <div className="App">

      <TableWithModel tableHtml={loadNewTable()} getMark={getMark} />
      
      {/* <div style={{minHeight : '2vh'}}></div>
      <TableWithModel tableHtml={loadOldTable()}/> */}

    </div>
  );
}

export default App;
