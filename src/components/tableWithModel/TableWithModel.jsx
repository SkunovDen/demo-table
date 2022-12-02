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

    // get header rows count here ???
                const colsCount = tableModel[0].length
                const rowsCount = tableModel.length
                // console.log('EFFECT:  COLS', colsCount, '  ROWS: ', rowsCount)

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
        console.log(' ')
        // console.log('KEY PRESS: ', e.key, '  is ctrlKey? ', e.ctrlKey)
        if (( e.key==='Control' ) || (window.navigator.platform.startsWith("Mac") && e.metaKey))  {
            // console.log('CTRL DOWN')
            setIsCtrlDown( (prev) => { return true })
        }
    }

    const keyReleaseHandler = (e) => {
        // console.log('KEY RELEASE: ',e.key, '  is ctrlKey? ', e.ctrlKey)
        // !!! e.ctrlKey NOT WORKED ON RELEASE KEY 
        if (( e.key==='Control' ) || (window.navigator.platform.startsWith("Mac") && e.metaKey)){
            // console.log('CTRL RELEASE')
            setIsCtrlDown( (prev) => { return false })
        }
    }

//** Ctrl key press handling section END */
//** *********************************************** */




//** *********************************************** */
//** Click on TABLE handling section */

    const clearMarkers = () => {
        const colsCount = tableModel[0].length
        const rowsCount = tableModel.length

        // clear markers:  colsCount , rowsCount

        for(let r = 0; r < rowsCount; r++) {
            for(let c = 0; c < colsCount; c++) {
                // clear cell (c, r) marker
                tableModel[r][c].selectMarker = ''
            }
        }
    }

    const clearSelection = () => {
        clearMarkers()

        let tempSelectionState = []

        for(let i = 0; i < colsSelectionState.length; i++) {
            tempSelectionState.push(false)
        }
        updateColsSelectionState(tempSelectionState)


        tempSelectionState = []
        for(let i = 0; i < rowsSelectionState.length; i++) {
            tempSelectionState.push(false)
        }
        updateRowsSelectionState(tempSelectionState)



    }

    const setColumnSelectedState = (columnNum, state) => {
        updateColsSelectionState( prev => {
            let updated = Array.from(prev)
            updated[columnNum] = state
            return updated
        })
    }

    const setRowSelectedState = (rowNum, state) => {
        updateRowsSelectionState( prev => {
            let updated = Array.from(prev)
            updated[rowNum] = state
            return updated
        })
    }

    const setSelectLevelUp2Columns = (clickedTarget) => {
        const startColumn = Number(clickedTarget.dataset.col)
        const columnsCount = Number(clickedTarget.colSpan)

        const endColumn = startColumn + columnsCount

        for (let columnNum = startColumn; columnNum < endColumn; columnNum ++){
            setColumnSelectedState(columnNum, true)
        }   

        const markerNumber = props.getNext(clickedTarget)
        addMarker(clickedTarget, markerNumber)
    }

    const setSelectLevelDown2Columns = (clickedTarget) => {
        const startColumn = Number(clickedTarget.dataset.col)
        const columnsCount = Number(clickedTarget.colSpan)

        const endColumn = startColumn + columnsCount

        for (let columnNum = startColumn; columnNum < endColumn; columnNum ++){
            setColumnSelectedState(columnNum, false)
        }
    }


    const setSelectLevelUp2Rows = (clickedTarget) => {
        const startRow = Number( clickedTarget.dataset.row)
        const rowsCount = Number(clickedTarget.rowSpan)

        const endRow = Number(startRow) + Number(rowsCount)

        for (let rowNum = startRow; rowNum < endRow; rowNum ++){
            setRowSelectedState(rowNum, true)
        } 

        const markerNumber = props.getNext(clickedTarget)
        addMarker(clickedTarget, markerNumber)
    }

    const setSelectLevelDown2Rows = (clickedTarget) => {
        const startRow = Number( clickedTarget.dataset.row)
        const rowsCount = Number(clickedTarget.rowSpan)

        const endRow = Number(startRow) + Number(rowsCount)

        for (let rowNum = startRow; rowNum < endRow; rowNum ++){
            setRowSelectedState(rowNum, false)
        } 
    }

    ////////////////////////////

    const addMarker = (target, marker) => {
        const targetCol = target.dataset.col
        const targetRow = target.dataset.row 

        tableModel[targetRow][targetCol].selectMarker = `${marker}`
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

    const tableClickListener = ({ target }) => {
        
        if ( !isCtrlDown ){ 
            // console.log('Ctrl NOT DOWN')
            select(target)
        } else {
            // console.log('Ctrl DOWN')
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
        const cellLevel = checkCellSelectLevel(cell)

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
        const cellData = tableModel[cellRow][cellCol]

        if (!cellData.visible){
            return null
        }

        const cellClass = getCellClass( cellData )

        const cellColSpan = cellData.colSpan
        const cellRowSpan = cellData.rowSpan
        
        const cellText = cellData.textContent
        

        const marker = (cellData.selectMarker && (cellClass !=='cell')) ? 
            (<div className="marker">
                {cellData.selectMarker}
            </div>) :
            null

        const cellElement = 
            <td className={cellClass}
                    
                onClick = {(e) => tableClickListener(e) }

                data-col={cellCol}
                data-row={cellRow}
                colSpan= {cellColSpan}
                rowSpan= {cellRowSpan}
            >
                {cellText}  
        
                {marker}
        
                
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

    // const test1 = () => {
    //     const getMarkerNumber = props.getMarkerNumber()

    //     console.log('getMarkerNumber ',  getMarkerNumber)
    // }

    // const test2 = () => {
    //     props.addSelection('temp')


    // }

    // const test3 = () => {
    //     const getMarkerNumber = props.clearSelection()
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
            <button onClick={()=>test2()} style={{marginRight: '27px'}}>GET NEXT</button> */}
            <button onClick={()=>props.print()} style={{marginRight: '27px'}}>PRINT</button>             
            
            <button onClick={()=>tableContentHide()}>ON | OFF CONTENT</button>
            <button onClick={()=>clearSelection()}>CLEAR SELECTION</button>
        </div>
    )
}

export default TableWithModel
