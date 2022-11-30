import React, { useEffect, useState, useRef } from "react";
import './TableWithModel.css'
import { getModelFromHtml, 
    // isMergedSelected 
} from "./tableModelUtils";


const TableWithModel = (props) => {
    const [tableModel, setTableModel] = useState( [] )
    const [isCtrlDown, setIsCtrlDown] = useState(false)


///  REMOVE HARD_CODE MAGIC NUMBER   !!!!!!!!!!!!!!!!!!
/// REMOVE HARD___CODE MAGIC NUMBER  !!!!!!!!!!!!!!!!!!
///REMOVE HARD_____CODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
const headerRowsCount = 4
///REMOVE HARD_____CODE MAGIC NUMBER !!!!!!!!!!!!!!!!!!
/// REMOVE HARD___CODE MAGIC NUMBER  !!!!!!!!!!!!!!!!!!   
///  REMOVE HARD_CODE MAGIC NUMBER   !!!!!!!!!!!!!!!!!! 



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
        console.log('CLEAR SELECTION')
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

    const setColumnSelectedState = (columnNum, selectedState) => {

        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel.forEach( (row, rowIndex) => {   
                row.forEach( (cell, cellIndex) => {
                    if (cellIndex === columnNum) {
                        cell.selected = selectedState
                    }
                })
            });

            return updatedModel
        })
    }

    const setColumnsSelectedState = (clickedTarget, selectedState) => {

        const startColumn = Number(clickedTarget.dataset.col)
        const columnsCount = Number(clickedTarget.colSpan)

        const endColumn = startColumn + columnsCount

        for (let columnNum = startColumn; columnNum < endColumn; columnNum ++){
            setColumnSelectedState( columnNum, selectedState )
        }   
    }

    const setRowSelectedState = (rowNum, selectedState) => {
        
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel[rowNum].forEach( (element, index) => {
                updatedModel[rowNum][index].selected = selectedState
            });

            return updatedModel
        })
    }

    const setRowsSelectedState = (clickedTarget, selectedState) => {
        const startRow = Number( clickedTarget.dataset.row)
        const rowsCount = Number(clickedTarget.rowSpan)

        const endRow = Number(startRow) + Number(rowsCount)

        for (let rowNum = startRow; rowNum < endRow; rowNum ++){
            setRowSelectedState( rowNum, selectedState )
        }   
    }


    
    const select = (target) => {
        console.log('SELECT')
        const isHeader = (target.dataset.row > headerRowsCount - 1)
 
        clearSelection();
        
        if ( isHeader ){
            setRowsSelectedState(target, true)
        } else {
            setColumnsSelectedState(target, true)
        }
        props.incMarkCount()
    }

    const addToSelected = (target) => {
        console.log('ADD TO SELECT')

        const isHeader = (target.dataset.row > headerRowsCount - 1)

        const targetCol = target.dataset.col
        const targetRow = target.dataset.row
        const currentSelectionState =  tableModel[targetRow][targetCol].selected

        if ( isHeader ){
            setRowsSelectedState(target, !currentSelectionState)
        } else {
            setColumnsSelectedState(target, !currentSelectionState)
        }
    }

    const pureSelectionListener = ({ target }) => {
        console.log('Click')
        ///temporary clear selection / will be ignore click  
        if( (target.dataset.col === '0') && (target.dataset.row === '0')){
            clearSelection()

            return
        }

        if ( !isCtrlDown ){ 
            console.log('Ctrl NOT DOWN')
            select(target)
        } else {
            console.log('Ctrl DOWN')
            addToSelected(target)
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
                
                        {/* {marker} */}
                
                        
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
            <table border={1} cellpadding="0" cellspacing="0">
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

    // const test1 = () => {
    //     console.log('Test: ==============================')
    //     props.resetMarkCount();
    //     let c = props.getMarkCount()
    //     console.log('Count : ', c)
        
        
    //     console.log('Test: ==============================')
    // }

    // const test2 = () => {
    //     console.log('Test: ==============================')
    //     props.incMarkCount()
        
    //     let c = props.getMarkCount()
    //     console.log('Count : ', c)
        
    //     console.log('Test: ==============================')
    // }

//** temporary utils section  END*/
//** *********************************************** */




    return(
        <div id="table-container" className="table-container" 
             ref={ref} tabIndex={-1}  
             onKeyDown={(e)=>keyDownHandler(e)} 
             onKeyUp={(e)=>keyReleaseHandler(e)}
            > 

            <TableElement tableModel={tableModel} />
        
            {/* <button onClick={()=>test1()} style={{marginRight: '27px'}}>GET ONE</button>
            <button onClick={()=>test2()} style={{marginRight: '27px'}}>GET NEXT</button>             */}
            <button onClick={()=>tableContentHide()}>ON | OFF CONTENT</button>
        
        </div>
    )
}

export default TableWithModel