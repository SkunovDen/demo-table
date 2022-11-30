export const getModelFromHtml = (htmlTable) => {

    const tableRows = htmlTable.rows
    

//find first DATA row (for get number of columns)
    let rowCounter = 0
    while (tableRows[ rowCounter ].cells[0].tagName === 'TH') {
        rowCounter++
    }
    const tableColsCount = tableRows[ rowCounter ].cells.length
    const tableRowsCount = tableRows.length

// create empty initial model array
    let initialModel = []
    for (let rowIndex = 0; rowIndex < tableRowsCount; rowIndex++) {
        let tempRow = []
        for (let colIndex = 0; colIndex < tableColsCount;  colIndex++) {
            tempRow.push ( {
                visible : false
                })
        }
        initialModel.push( tempRow )
    }


// fillup model array from input table html
    const rowsArray = Array.from( htmlTable.rows )
    
    rowsArray.forEach ( (row, rowIndex)  => {

        const  cellsArray = Array.from( row.cells )
        // console.log('ROW ARRAY: ', cellsArray )

        cellsArray.forEach( 
            (cell, cellIndex) => {
                const cellCoords = checkCellIndex ( cell )
                const cellX = cellCoords.x[0] - 1
                const cellY = cellCoords.y - 1
                const textContent = cell.textContent
                
                const content =  {
                    X: cellX, 
                    Y: cellY,
                    textContent : textContent,
                    colSpan  : cell.colSpan,
                    rowSpan  : cell.rowSpan,
                    colSelected : false,
                    rowSelected : false,
                    visible  : true,
                    selectCount : ''
                }

                initialModel[cellY][cellX] = content
            }
        )

    })
    
    return initialModel
}


export const checkCellIndex = (cell) => {
    let table = cell.parentElement.closest("table");
    
    let grid = [];
    for(let i = 0; i < table.rows.length; i++) {
    
        let currentRow = table.rows[i];
        let currentGridRow = grid[i] || (grid[i] = []);
    
        for(let j = 0; j < currentRow.cells.length; j++) {
    
        let currentCell = currentRow.cells[j];
        let c = 0; while(currentGridRow[c]) { c++; }
    
        for(let cx = 0; cx < Math.max(1,currentCell.colSpan|0); cx++) {
            for(let rx = 0; rx < Math.max(1,currentCell.rowSpan|0); rx++) {
                let gridRowToUpdate = grid[i+rx] || (grid[i+rx] = []);
                gridRowToUpdate[c+cx] = gridRowToUpdate[c+cx] || currentCell;
                }
            }
        }
    }
    
    for(let rx = 0; rx < grid.length; rx++) {
        for(let cx = 0; cx < grid[rx].length; cx++) {
            if(grid[rx][cx] === cell) {
                let x = [];
                for (let i = 1; i <= cell.colSpan; i++) x.push(cx + i);
                return {x: x, y: (1 + rx)};
            }
        }
    }
}
