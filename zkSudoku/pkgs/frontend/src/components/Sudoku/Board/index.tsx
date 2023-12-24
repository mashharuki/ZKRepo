import Cell from "@/components/Sudoku/Cell";

/**
 * Board Component
 * @param param0 
 * @returns 
 */
export default function Board({ 
  sudoku, 
  setSelectedPosition, 
  sudokuBoolInitial, 
  selectedPosition 
}: any) {
  return (
    <>
      {sudoku.map((row: any, i: number) => {
        return (
          <div className="grid grid-cols-9" key={i}>
            {row.map((col: any, j: number) => {
              return (
                <Cell 
                  value={col} 
                  col={j} 
                  row={i} 
                  setSelectedPosition={setSelectedPosition} 
                  sudokuBoolInitial={sudokuBoolInitial} 
                  selectedPosition={selectedPosition} 
                  key={j}
                />
              )
            })}
          </div>
        );
      })}
    </>
  );
}
