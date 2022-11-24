import React, { useEffect, useState } from "react";

import { getModelFromHtml, isMergedSelected } from "./tableModelUtils";


const TableWithModel = (props) => {
    const [tableModel, setTableModel] = useState( [] )

    useEffect( () => {
        const createModel = () => {

            const template = document.createElement('div');
            const html = props.tableHtml.trim();
            template.innerHTML = html;
            const table = template.firstChild
            
            setTableModel( prev => { return  getModelFromHtml(table) } )
        }
        createModel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        for (let toglledRowNum = startRow; toglledRowNum < endRow; toglledRowNum ++){
            toggleRow( toglledRowNum )
        }   
    }
  
    const cellClickHandler = ({ target }) => {
        console.log(' CLICK : ', target)
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
        const headerRowsCount = 4
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
        
        const rowNum = target.dataset.row
        // const rowSpan = target.rowSpan
    
        if (rowNum > headerRowsCount - 1){
            const rowSpan = target.rowSpan
            toggleRows(rowNum, target.rowSpan)
        } else {
            console.log(' HEADER ')
            const colNum = Number(target.dataset.col)
            toggleColumns(colNum, target.colSpan)
        }
    
    }


    ///////////////////////

    const toggleColumn = (colNum) => {
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel.forEach( (row, rowIndex) => {
                
                row.forEach( (cell, cellIndex) => {
                    // console.log(cellIndex, ' :: ', rowIndex, ' :: ', cell)
                    if (cellIndex === colNum) {
                        cell.selected = !cell.selected
                    }
                })
            });

            return updatedModel
        })
    }

    const toggleColumns = (startColumn, columnsCount ) => {
        const endColumn = Number(startColumn) + Number(columnsCount)

        for (let toglledColNum = startColumn; toglledColNum < endColumn; toglledColNum ++){
            toggleColumn( toglledColNum )
        }   
    }


    const test = () => {toggleColumn(12)}

    
    /////////////////////



    const Cell = (props) => {
        const cellCol = props.col
        const cellRow = props.row
        const cellColSpan = tableModel[props.row][props.col].colSpan
        const cellRowSpan = tableModel[props.row][props.col].rowSpan

// selected one of 'back' cells
        let selectedClass
        if ( (cellRowSpan > 1) || (cellColSpan > 1) ){
            selectedClass = `cell ${isMergedSelected(tableModel, cellCol, cellRow, cellColSpan, cellRowSpan) ? 'selected' : ''}`  
        } else {
            selectedClass = `cell ${tableModel[cellRow][cellCol].selected ? 'selected' : ''}`        
        }

        
        const cellElement = 
             (tableModel[cellRow][cellCol].visible) ? 
                (   <td className={selectedClass}
                        style={{ padding: '5px 10px'}}


/// add separated Listeners for header and data areas ???                         
                        // onClick = { (props.row > 3) ? (e) => cellClickHandler(e) : null }
                        onClick = {(e) => cellClickHandler(e) }
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



    const tableContentHide = () => {
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
                <button onClick={()=>test()} style={{marginRight: '27px'}}>TEST</button>
                
                <button onClick={()=>tableContentHide()}>ON | OFF CONTENT</button>
            </div>
        </>
    )

}

export default TableWithModel