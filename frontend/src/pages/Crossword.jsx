import React, { useEffect, useRef, useState } from 'react'
import { crosswordregeneration } from '../logic';
import "./crossword.css";
const Crossword = () => {
  const inputRefs = useRef([]);
   const [puzzledata,setPuzzledata]=useState(crosswordregeneration());
   let {crosswordGrid,storedQA,questionNumbersMap}=puzzledata;
   const [Score, setScore] = useState(null);
   const [cellStatus, setCellStatus] = useState(
  Array(10).fill(null).map(() => Array(10).fill(null))
);
   const [userGrid, setUserGrid] = useState(() => {
  return Array(10).fill(null).map(() => Array(10).fill(''));
});




const handleSubmit=async ()=>{

   let score=0;
   
   const newCellStatus = [...cellStatus.map(row => [...row])];
  storedQA.forEach((QA)=>{
    let flag=true;
    for(let i=0;i<QA.answer.length;i++)
    {  
       if(QA.direction=='a')
    {
      if(userGrid[QA.x][QA.y+i]!=QA.answer[i])
      {
         flag=false;  
         break;
      }
      }
      if(QA.direction=='d')
    {
      if(userGrid[QA.x+i][QA.y]!=QA.answer[i])
      {
         flag=false;  
         break;
      }
      }
          }
         
       for(let i=0;i<QA.answer.length;i++)
    {   
        if(QA.direction=='a')
    {
       if(newCellStatus[QA.x][QA.y+i]!=true){
  newCellStatus[QA.x][QA.y+i] = flag;
       }
  



    }
    if(QA.direction=='d')
    {
      if(newCellStatus[QA.x+i][QA.y]!=true){
  newCellStatus[QA.x+i][QA.y] = flag;
  }

      }     
  }
  
if(flag==true)
  {
    score++;
  }
  


});
  setScore(score);
  setCellStatus(newCellStatus);

}
const arrowKeysHandler= async (e, rowIndex, cellIndex)=>{
   if (e.key.startsWith('Arrow')) {
        e.preventDefault(); 
    }

   const maxRows = crosswordGrid.length - 1;
        const maxCols = crosswordGrid[0].length - 1;
        let nextRow = rowIndex;
        let nextCol = cellIndex;

  switch(e.key)
  {
    case "ArrowUp":
     nextRow = rowIndex > 0 ? rowIndex - 1 : rowIndex;
     
     break;
     case "ArrowDown":
      nextRow = rowIndex < maxRows ? rowIndex + 1 : rowIndex;
      
      break;
      case "ArrowRight":
       nextCol = cellIndex < maxCols ? cellIndex + 1 : cellIndex;
        break;
        case "ArrowLeft":
      nextCol = cellIndex > 0 ? cellIndex - 1 : cellIndex;
      break;
      default:
        
        break;
  }

if (inputRefs.current[nextRow] && inputRefs.current[nextRow][nextCol]) {
            inputRefs.current[nextRow][nextCol].focus();
        }

}


const regenerate=()=>{
    const newPuzzle=crosswordregeneration();
  setPuzzledata(newPuzzle);
  setScore(null);
  setUserGrid(Array(10).fill(null).map(() => Array(10).fill('')));
  setCellStatus(Array(10).fill(null).map(() => Array(10).fill(null)));
  inputRefs.current = newPuzzle.crosswordGrid.map(
    () => Array(newPuzzle.crosswordGrid[0].length).fill(null));
}

  return (
<>
<div className='crossword-container'>
  <div className='crossword-title'>Crossword Puzzle Generator</div>
  <div className='grid-and-questions'>
<div className='grid'>
  {crosswordGrid.map((row, rowIndex) => (
    <div key={rowIndex} className='row'>
      {row.map((cell, cellIndex) => {
       
        const isEmpty = cell === ' ';
      const number=questionNumbersMap[`${rowIndex}-${cellIndex}`]
        return (
          <div  key={`${rowIndex}-${cellIndex}`} className='cell-container'>
          {number && <span>{number}</span>}
          <input
           
            type='text'
            maxLength='1'
            value={userGrid[rowIndex][cellIndex]}
            className={`${isEmpty ? "emptyCell" : "filledCell"} ${
  cellStatus[rowIndex][cellIndex] === true ? "true" : 
  cellStatus[rowIndex][cellIndex] === false ? "false" : ""
}`}

            disabled={isEmpty}
            onChange={(e) => {
  const newUserGrid = [...userGrid.map(row => [...row])];
  newUserGrid[rowIndex][cellIndex] = e.target.value.toUpperCase();
  setUserGrid(newUserGrid);
}}
ref={(el) => {
 if (!inputRefs.current[rowIndex]) {
    inputRefs.current[rowIndex] = [];
  }
    inputRefs.current[rowIndex][cellIndex] = el;
}}


onKeyDown={(e)=>arrowKeysHandler(e,rowIndex,cellIndex)}
          />
          </div>
          
        );
      })}
    </div>
  ))}
</div>


<div className='questions'>
  <h2>Across</h2>
  <ul className='across'>
    {storedQA.map((qa, index) =>
      qa.direction === 'a' && (
        <li key={index}>
          {index + 1}. {qa.question}
        </li>
      )
    )}
  </ul>

  <h2>Down</h2>
  <ul className='down'>
    {storedQA.map((qa, index) =>
      qa.direction === 'd' && (
        <li key={index}>
          {index + 1}. {qa.question}
        </li>
      )
    )}
  </ul>
  </div>
</div>
<div className="cta-buttons">
<button onClick={handleSubmit} className='Submit'> Submit </button>
<button onClick={regenerate} className='regenerate'> Regenerate </button>
</div>
{Score!==null && <p className="score"> Score:{Score}</p>}
  </div>    
</>
  )
}

export default Crossword;