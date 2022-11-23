import React, { useEffect, useState } from "react";

import loadOldTable from '../../data/OldTable'
import loadNewTable from '../../data/NewTable'

import { getModelFromHtml } from "./tableModelUtils";


const TableWithModel = (props) => {
    const [tableModel, setTableModel] = useState( [] )

    useEffect( () => {
        const createModel = () => {

            const template = document.createElement('div');
            const html = props.tableHtml.trim();
            template.innerHTML = html;
            const table = template.firstChild
            
            setTableModel( prev => { return  getModelFromHtml(table) } )

            // console.log('INPUT TABLE ELEMENT : ', table)
            // console.log('MODEL ', tableModel)
        }
        createModel()
    }, [])



    const toggleRow = (rowNum) => {
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel[rowNum].forEach( (element, index) => {
                updatedModel[rowNum][index].selected = !prevModel[rowNum][index].selected
            });

            return updatedModel
        })
    }

    const toggleRows = (startRow, rowsCount ) => {
        const endRow = Number(startRow) + Number(rowsCount)
        // console.log('Toggle start: ', startRow, '   END : ', endRow)
        
        for (let toglledRowNum = startRow; toglledRowNum < endRow; toglledRowNum ++){
            toggleRow ( toglledRowNum )
        }   
    }
  
    const cellClickHandler = ({ target }) => {

        const colNum = target.dataset.col
        const rowNum = target.dataset.row

        const rowSpan = target.rowSpan
        
        // console.log('COL: ', colNum, '  ROW: ', rowNum, '   RowSpan: ', rowSpan)

        toggleRows(rowNum, rowSpan)
    }



    const isMergedSelected = (colNum, rowNum, colSpan, rowSpan) => {
        console.log('IS SELECTED CHECK : ', colNum, ' ', rowNum, '   ROWSPAN : ', rowSpan)
         
        const startCol = colNum
        const endCol = Number(colNum) + colSpan
        const startRow = rowNum
        const endRow = Number(rowNum) + rowSpan

        let result = false
        
        for (let col = startCol; col < endCol; col++) {
            for (let row = startRow; row < endRow; row++) {
                console.log('CHECK : X=', col, '   Y=', row) 
                result = result || tableModel[row][col].selected            
            }
        }

        return result
    }


    const Cell = (props) => {
        const cellCol = props.col
        const cellRow = props.row
        const cellColSpan = tableModel[props.row][props.col].colSpan
        const cellRowSpan = tableModel[props.row][props.col].rowSpan

// selected one of 'back' cells
        let selectedClass
        if (cellRowSpan > 1){
            selectedClass = `cell ${isMergedSelected(cellCol, cellRow, cellColSpan, cellRowSpan) ? 'selected' : ''}`  
        } else {
            selectedClass = `cell ${tableModel[cellRow][cellCol].selected ? 'selected' : ''}`        
        }

        
        const cellElement = 
             (tableModel[cellRow][cellCol].visible) ? 
                (   <td className={selectedClass}
                        style={{ padding: '5px 10px'}}
/// add separated Listeners for header and data areas ???                         
                        onClick = { (props.row > 3) ? (e) => cellClickHandler(e) : null }
/// add separated Listeners for header and data areas ???  
                        data-col={cellCol}
                        data-row={cellRow}
                        colSpan= {cellColSpan}
                        rowSpan= {cellRowSpan}
                    >
                        {tableModel[cellRow][cellCol].textContent}    
                    </td> )
                    : null 

        return cellElement
    }

    const Row = (props) => {
        return (
            <tr>
                { tableModel[props.row].map( (c, index) => {
                        return <Cell key={index} col={index} row={props.row}/>
                  })
                }
            </tr>
        )
    }

    const tHide = () => {
        const t_container = document.getElementById('table-container')
        t_container.style.color = t_container.style.color === 'white' ? 'black' : 'white' 
    }

    return(
        <>                 
            <div id="table-container" className="table-container">

                <table border={1}>
                    { tableModel.map( (row, rowIndex) => {
                        return (
                            <Row key={rowIndex} row={rowIndex} />
                        )
                    })}
                </table>

                <button onClick={()=>tHide()}>ON | OFF CONTENT</button>
            </div>
        </>
    )

}

export default TableWithModel