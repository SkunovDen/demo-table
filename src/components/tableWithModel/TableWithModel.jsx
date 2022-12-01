import React, { useEffect, useState, useRef } from "react";
import './TableWithModel.css'
import { getModelFromHtml } from "./tableModelUtils";




const TableWithModel = (props) => {
    const [tableModel, setTableModel] = useState( [] )
    

    const [colsSelectionState, updateColsSelectionState] = useState([])
    const [rowsSelectionState, updateRowsSelectionState] = useState([])
    


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
            
            setTableModel( prev => {
                const tableModel = getModelFromHtml(table) 

    // get header rows coun here ?
                const colsCount = tableModel[0].length
                const rowsCount = tableModel.length
                console.log('EFFECT:  COLS', colsCount, '  ROWS: ', rowsCount)

                let tempSelectionState = []
                for(let i = 0; i < colsCount; i++) {
                    tempSelectionState.push(false)
                }
                updateColsSelectionState(tempSelectionState)

                tempSelectionState = []
                for(let i = 0; i < rowsCount; i++) {
                    tempSelectionState.push(false)
                }
                updateRowsSelectionState(tempSelectionState)

                return  tableModel 
            })
        }
        createModel()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




//** *********************************************** */
//** Ctrl key press handling section */
    const [isCtrlDown, setIsCtrlDown] = useState(false)

    const ref = useRef(null);

    useEffect(() => {
      ref.current.focus();
    }, []);

    const keyDownHandler = (e) => {
        if (( e.key === 'Control') || (window.navigator.platform.startsWith("Mac") && e.metaKey))  {
            setIsCtrlDown( (prev) => { return true })
        }
    }

    const keyReleaseHandler = (e) => {
        if (( e.key === 'Control') || (window.navigator.platform.startsWith("Mac") && e.metaKey)){
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
                    clearedModel[rowIndex][cellIndex].selectLevel = 0
                })
            } )

            return clearedModel
        })
        const colsCount = colsSelectionState.length
        let tempSelectionState = []
        for(let i = 0; i < colsCount; i++) {
            tempSelectionState.push(false)
        }
        updateColsSelectionState(tempSelectionState)

        const rowsCount = rowsSelectionState.length
        tempSelectionState = []
        for(let i = 0; i < rowsCount; i++) {
            tempSelectionState.push(false)
        }
        updateRowsSelectionState(tempSelectionState)

    }

    const columnSelectLevelUp = (columnNum) => {
       setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel.forEach( (row, rowIndex) => {   
                row.forEach( (cell, cellIndex) => {
                    if (cellIndex === columnNum) {
                        let updatedLevel = cell.selectLevel + 1
                        if (updatedLevel > 2) { updatedLevel = 2 }
                        
                        cell.selectLevel = updatedLevel
                    }
                })
            });

            return updatedModel
        }) 

        setColumnSelectedState(columnNum, true)
    }

    const columnSelectLevelDown = (columnNum) => {
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel.forEach( (row, rowIndex) => {   
                row.forEach( (cell, cellIndex) => {
                    if (cellIndex === columnNum) {
                        let updatedLevel = cell.selectLevel - 1
                        if (updatedLevel < 0) { updatedLevel = 0 }
                        
                        cell.selectLevel = updatedLevel
                    }
                })
            });

            return updatedModel
        })

        setColumnSelectedState(columnNum, false)
    }

    const rowSelectLevelUp = (rowNum) => {
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel[rowNum].forEach( (element, index) => {
                let updatedLevel = updatedModel[rowNum][index].selectLevel + 1
                if (updatedLevel > 2) { updatedLevel = 2 }
                
                updatedModel[rowNum][index].selectLevel = updatedLevel
            });

            return updatedModel
        })

        setRowSelectedState(rowNum, true)
    }
    
    const rowSelectLevelDown = (rowNum) => {
        setTableModel( (prevModel) => {
            let updatedModel = Array.from( prevModel )

            updatedModel[rowNum].forEach( (element, index) => {
                let updatedLevel = updatedModel[rowNum][index].selectLevel - 1
                if (updatedLevel < 0) { updatedLevel = 0 }
                
                updatedModel[rowNum][index].selectLevel = updatedLevel
            });

            return updatedModel
        })

        setRowSelectedState(rowNum, false)
    }


    const setSelectLevelUp2Columns = (clickedTarget) => {
        const startColumn = Number(clickedTarget.dataset.col)
        const columnsCount = Number(clickedTarget.colSpan)

        const endColumn = startColumn + columnsCount

        for (let columnNum = startColumn; columnNum < endColumn; columnNum ++){
            columnSelectLevelUp( columnNum )
        }   
    }

    const setSelectLevelDown2Columns = (clickedTarget) => {
        const startColumn = Number(clickedTarget.dataset.col)
        const columnsCount = Number(clickedTarget.colSpan)

        const endColumn = startColumn + columnsCount

        for (let columnNum = startColumn; columnNum < endColumn; columnNum ++){
            columnSelectLevelDown( columnNum )
        }
    }



    const setSelectLevelUp2Rows = (clickedTarget) => {
        const startRow = Number( clickedTarget.dataset.row)
        const rowsCount = Number(clickedTarget.rowSpan)

        const endRow = Number(startRow) + Number(rowsCount)

        for (let rowNum = startRow; rowNum < endRow; rowNum ++){
            rowSelectLevelUp( rowNum )
        } 
    }

    const setSelectLevelDown2Rows = (clickedTarget) => {
        const startRow = Number( clickedTarget.dataset.row)
        const rowsCount = Number(clickedTarget.rowSpan)

        const endRow = Number(startRow) + Number(rowsCount)

        for (let rowNum = startRow; rowNum < endRow; rowNum ++){
            rowSelectLevelDown( rowNum )
        } 
    }

    ////////////////////////////


    const setColumnSelectedState = (columnNum, state) => {
        // const columnNum = target.dataset.col

        console.log('SELECT: ', columnNum)
        updateColsSelectionState( prev => {
            let updated = prev
            updated[columnNum] = state
            return updated
        })
    }

    const setRowSelectedState = (columnNum, state) => {
        // const columnNum = target.dataset.col

        console.log('SELECT: ', columnNum)
        updateRowsSelectionState( prev => {
            let updated = prev
            updated[columnNum] = state
            return updated
        })
    }

    
    const select = (target) => {
        clearSelection();
        
        const isHeader = (target.dataset.row < headerRowsCount )
        if ( isHeader ){
            setSelectLevelUp2Columns(target)
            
        } else {
            setSelectLevelUp2Rows(target)
        }
    }



    const addToSelected = (target) => {
        const targetCol = target.dataset.col
        const targetRow = target.dataset.row

        // const currentSelectLevel =  tableModel[targetRow][targetCol].selectLevel

        const isTargetColSelect = colsSelectionState[targetCol]
        const isTargetRowSelect = rowsSelectionState[targetRow]

        const isHeader = (target.dataset.row < headerRowsCount )

        if ( isHeader ){
            if (isTargetColSelect) {
                setSelectLevelDown2Columns(target)
            } else {
                setSelectLevelUp2Columns(target)
            }
        } else {
            if (isTargetRowSelect) {
                setSelectLevelDown2Rows(target)
            } else {
                setSelectLevelUp2Rows(target)
            }
        }
    }

    const pureSelectionListener = ({ target }) => {
        // console.log('Click')
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

    const checkCellSelectLevel = (cell) => {
        const startCol = cell.X
        const endCol =  startCol + cell.colSpan
        const startRow = cell.Y
        const endRow = startRow + cell.rowSpan

        // is one of cols selected?
        let isColSelected = false
        for (let col = startCol; col < endCol; col++) {             
            isColSelected ||=  colsSelectionState[col]
        }

        // is one of rows selected?
        let isRowSelected = false
        for (let row = startRow; row < endRow; row++) {             
            isRowSelected ||=  rowsSelectionState[row]
        }

        let result = isColSelected ? 1 : 0
        result    += isRowSelected ? 1 : 0

        return result 
    }

    const getCellClass = (cell) => {
        const cellLevel = checkCellSelectLevel(cell) //cell.selectLevel

        if ((cellLevel > 0) && (cell.Y < headerRowsCount)){
            return 'cell selected2'
        }

        let className;
        switch (cellLevel) {

            case 1: {
                className = 'cell selected' 
                break;
            }
            case 2: {
                className = 'cell selected2';
                break;
            }
            default: {
                className = 'cell'
            }
        }

        return className
    }

    const Cell = (props) => {
        const cellCol = props.col
        const cellRow = props.row

        if (!tableModel[cellRow][cellCol].visible){
            return null
        }

        const cellClass = getCellClass( tableModel[cellRow][cellCol] )


        const cellColSpan = tableModel[props.row][props.col].colSpan
        const cellRowSpan = tableModel[props.row][props.col].rowSpan
        
        const cellText = tableModel[cellRow][cellCol].textContent
        
        const cellElement = 
            <td className={cellClass}
                    
                onClick = {(e) => pureSelectionListener(e) }

                data-col={cellCol}
                data-row={cellRow}
                colSpan= {cellColSpan}
                rowSpan= {cellRowSpan}
            >
                {cellText}  
        
                {/* {marker} */}
        
                
            </td> 

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
            <table border={1} cellPadding="0" cellSpacing="0">
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

    const test1 = () => {
        console.log('Test: ==============================')
        console.log('=== AFTER CLICK ===')
        console.log('COLS STATE: ', colsSelectionState)
        console.log('ROWS STATE: ', rowsSelectionState)
        console.log(' ')
        
        
        console.log('Test: ==============================')
    }

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

            <TableElement tableModel={tableModel} clickListener={pureSelectionListener} />
        
            <button onClick={()=>test1()} style={{marginRight: '27px'}}>GET ONE</button>
            {/* <button onClick={()=>test2()} style={{marginRight: '27px'}}>GET NEXT</button>             */}
            <button onClick={()=>tableContentHide()}>ON | OFF CONTENT</button>
        
        </div>
    )
}

export default TableWithModel