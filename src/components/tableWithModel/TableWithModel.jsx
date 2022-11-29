import React, { useEffect, useState, useRef } from "react";
import './TableWithModel.css'
import { getModelFromHtml, 
    // isMergedSelected 
} from "./tableModelUtils";


const TableWithModel = (props) => {
    const [tableModel, setTableModel] = useState( [] )
    const [isCtrlDown, setIsCtrlDown] = useState(false)

//** Startup: create TABLE MODEL and add it to DOM */
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




//** *********************************************** */
//** Ctrl key press handling section */

    const ref = useRef(null);

    useEffect(() => {
      ref.current.focus();
    }, []);

    const keyDownHandler = (e) => {
        if ( e.key === 'Control'){
            setIsCtrlDown( (prev) => { return true })
        }
    }

    const keyReleaseHandler = (e) => {
        if ( e.key === 'Control'){
            setIsCtrlDown( (prev) => { return false })
        }
    }

//** Ctrl key press handling section END */
//** *********************************************** */




//** *********************************************** */
//** Click on TABLE handling section */

    const clearSelection = () => {

        setTableModel( (prev) => {
            const clearedModel = Array.from( prev )

            clearedModel.forEach( (row, rowIndex) => {
                row.forEach( (cell, cellIndex) => {
                    clearedModel[rowIndex][cellIndex].selected = false
                    clearedModel[rowIndex][cellIndex].selectCount = ''
                })
            } )

            return clearedModel
        })

    }

    const selectColumn = (colNum) => {
        const count = props.getMarkCount()

        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel.forEach( (row, rowIndex) => {   
                row.forEach( (cell, cellIndex) => {
                    if (cellIndex === colNum) {
                        cell.selected = true
                        updatedModel[rowIndex][cellIndex].selectCount = count
                    }
                })
            });

            return updatedModel
        })
    }

    const selectColumns = (startColumn, columnsCount ) => {
        const endColumn = Number(startColumn) + Number(columnsCount)

        for (let toglledColNum = startColumn; toglledColNum < endColumn; toglledColNum ++){
            selectColumn( toglledColNum )
        }   
    }

    const selectRow = (rowNum) => {
        const count = props.getMarkCount()
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel[rowNum].forEach( (element, index) => {
                updatedModel[rowNum][index].selected = true
                updatedModel[rowNum][index].selectCount = count
            });

            return updatedModel
        })
    }

    const selectRows = (startRow, rowsCount ) => {
        const endRow = Number(startRow) + Number(rowsCount)

        for (let toglledRowNum = startRow; toglledRowNum < endRow; toglledRowNum ++){
            selectRow( toglledRowNum )
        }   
    }






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

    const pureSelectionListener = ({ target }) => {
        if( (target.dataset.col === '0') && (target.dataset.row === '0')){
            clearSelection()
            props.resetCount()
            return
        }
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
const headerRowsCount = 4
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
        
        const rowNum = target.dataset.row
        const isHeader= (row) => {
            return (row > headerRowsCount - 1)
        }

        if ( !isCtrlDown ){ 
            clearSelection()
        
            if ( isHeader(rowNum) ){
                selectRows(rowNum, target.rowSpan)
            } else {
                const colNum = Number(target.dataset.col)
                selectColumns(colNum, target.colSpan)
            }
        } else {
            if ( isHeader(rowNum) ){
                toggleRows(rowNum, target.rowSpan)
            } else {
                const colNum = Number(target.dataset.col)
                toggleColumns(colNum, target.colSpan)
            }
        }
    }
//** Click on TABLE handling section END*/
//** *********************************************** */





//** *********************************************** */
//** Generate TABLE ELEMENT HTML section  */


    const isOneOfMergedSelected = (tableModel, colNum, rowNum, colSpan, rowSpan) => {

        const startCol = colNum
        const endCol = Number(colNum) + colSpan
        const startRow = rowNum
        const endRow = Number(rowNum) + rowSpan

        let result = false
        
        for (let col = startCol; col < endCol; col++) {
            for (let row = startRow; row < endRow; row++) { 
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

// Check if selected one of 'merged' cells 
// show cell as selected (add higlight style class)
        const cellClass = ( (cellRowSpan > 1) || (cellColSpan > 1) ) ? 
                `cell ${isOneOfMergedSelected(tableModel, cellCol, cellRow, cellColSpan, cellRowSpan) ? 'selected' : ''}`  
              : `cell ${tableModel[cellRow][cellCol].selected ? 'selected' : ''}`        
            
        const cellText = tableModel[cellRow][cellCol].textContent
        
        const marker = 
            tableModel[cellRow][cellCol].selectCount ? 
            (
                <div className="marker">
                    {tableModel[cellRow][cellCol].selectCount}
                </div>
            ) : null

        const cellElement = 
             (tableModel[cellRow][cellCol].visible) ? 
                (   <td className={cellClass}
                         
                        onClick = {(e) => pureSelectionListener(e) }

                        data-col={cellCol}
                        data-row={cellRow}
                        colSpan= {cellColSpan}
                        rowSpan= {cellRowSpan}
                    >
                        {cellText}  
                        {marker}
                        
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

    const TableElement = (props) => {
        const tableModel = props.tableModel
        
        return(
            <table border={1}>
                { tableModel.map( (_r, rowIndex) => {
                    return (
                        <Row key={rowIndex} row={rowIndex} />
                    )
                })}
            </table>
        )
    }

//** Generate TABLE ELEMENT HTML section  END*/
//** *********************************************** */





//** *********************************************** */
//** temporary utils section */

    const tableContentHide = () => {
        const t_container = document.getElementById('table-container')
        t_container.style.color = t_container.style.color === 'white' ? 'black' : 'white' 
    }

    const test  = (e) => {
        console.log('Test: ', e)
    }

//** temporary utils section  END*/
//** *********************************************** */




    return(
        <div id="table-container" className="table-container" 
             ref={ref} tabIndex={-1}  
             onKeyDown={(e)=>keyDownHandler(e)} 
             onKeyUp={(e)=>keyReleaseHandler(e)}
            > 

            <TableElement tableModel={tableModel} />
        
            <button onClick={()=>test()} style={{marginRight: '27px'}}>TEST</button>            
            <button onClick={()=>tableContentHide()}>ON | OFF CONTENT</button>
        
        </div>
    )
}

export default TableWithModel