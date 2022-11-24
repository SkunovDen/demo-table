import React, { useEffect, useState, useRef } from "react";
import { getModelFromHtml, isMergedSelected } from "./tableModelUtils";


const TableWithModel = (props) => {
    const [tableModel, setTableModel] = useState( [] )
    const [isCtrlDown, setIsCtrlDown] = useState(false)

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

    const ref = useRef(null);

    useEffect(() => {
      ref.current.focus();
    }, []);




    const clearSelection = () => {
        setTableModel( (prev) => {
            const clearedModel = Array.from( prev )

            clearedModel.forEach( (row, rowIndex) => {
                row.forEach( (cell, cellIndex) => {
                    clearedModel[rowIndex][cellIndex].selected = false
                })
            } )

            return clearedModel
        })
    }

    const selectColumn = (colNum) => {
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel.forEach( (row, rowIndex) => {   
                row.forEach( (cell, cellIndex) => {
                    if (cellIndex === colNum) {
                        cell.selected = true
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
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel[rowNum].forEach( (element, index) => {
                updatedModel[rowNum][index].selected = true
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

    const pureSelectionListener = ({ target }) => {
        if( (target.dataset.col === '0') && (target.dataset.row === '0')){
            clearSelection()
            return
        }
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
const headerRowsCount = 4
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
        
        if ( !isCtrlDown ){ clearSelection()}
        const rowNum = target.dataset.row
        // const rowSpan = target.rowSpan
    
        if (rowNum > headerRowsCount - 1){
            selectRows(rowNum, target.rowSpan)
        } else {
            const colNum = Number(target.dataset.col)
            selectColumns(colNum, target.colSpan)
        }
    }




    // const toggleColumn = (colNum) => {
    //     setTableModel( (prevModel) => {
    //         let updatedModel = Array.from( prevModel )

    //         updatedModel.forEach( (row, rowIndex) => {
                
    //             row.forEach( (cell, cellIndex) => {
    //                 // console.log(cellIndex, ' :: ', rowIndex, ' :: ', cell)
    //                 if (cellIndex === colNum) {
    //                     cell.selected = !cell.selected
    //                 }
    //             })
    //         });

    //         return updatedModel
    //     })
    // }

    // const toggleColumns = (startColumn, columnsCount ) => {
    //     const endColumn = Number(startColumn) + Number(columnsCount)

    //     for (let toglledColNum = startColumn; toglledColNum < endColumn; toglledColNum ++){
    //         toggleColumn( toglledColNum )
    //     }   
    // }

    // const toggleRow = (rowNum) => {
    //     setTableModel( (prevModel) => {
    //         let updatedModel = Array.from( prevModel )

    //         updatedModel[rowNum].forEach( (element, index) => {
    //             updatedModel[rowNum][index].selected = !prevModel[rowNum][index].selected
    //         });

    //         return updatedModel
    //     })
    // }

    // const toggleRows = (startRow, rowsCount ) => {
    //     const endRow = Number(startRow) + Number(rowsCount)

    //     for (let toglledRowNum = startRow; toglledRowNum < endRow; toglledRowNum ++){
    //         toggleRow( toglledRowNum )
    //     }   
    // }
  
//     const cellClickHandler = ({ target }) => {
//         console.log(' CLICK : ', target)
// ///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
// ///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
// ///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
//         const headerRowsCount = 4
// ///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
// ///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
// ///REMOVE HARDCODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!        
        
//         const rowNum = target.dataset.row
//         // const rowSpan = target.rowSpan
    
//         if (rowNum > headerRowsCount - 1){
//             toggleRows(rowNum, target.rowSpan)
//         } else {
//             console.log(' HEADER ')
//             const colNum = Number(target.dataset.col)
//             toggleColumns(colNum, target.colSpan)
//         }
    
//     }




   


    const test = () => {
        clearSelection()

        // selectRow(6)

    }

    
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
                        onClick = {(e) => pureSelectionListener(e) }
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

    const keyDownHandler = (e) => {
        if ( e.key === 'Control'){
            setIsCtrlDown( (prev) => { return true})
        }
    }


    const keyReleaseHandler = (e) => {
        if ( e.key === 'Control'){
            setIsCtrlDown( (prev) => { return false})
        }
    }


    return(
        <div ref={ref} tabIndex={-1}  onKeyDown={(e)=>keyDownHandler(e)} onKeyUp={(e)=>keyReleaseHandler(e)}>                 
            <div id="table-container" className="table-container">

                <table border={1}>
                    { tableModel.map( (_r, rowIndex) => {
                        return (
                            <Row key={rowIndex} row={rowIndex} />
                        )
                    })}
                </table>
                <button onClick={()=>test()} style={{marginRight: '27px'}}>TEST</button>
                
                <button onClick={()=>tableContentHide()}>ON | OFF CONTENT</button>
            </div>
        </div>
    )

}

export default TableWithModel