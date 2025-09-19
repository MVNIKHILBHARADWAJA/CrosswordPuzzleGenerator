import React, { useState } from 'react'
import { crosswordregeneration } from '../logic';
import "./crossword.css";
const Crossword = () => {
   const [puzzledata,setPuzzledata]=useState(crosswordregeneration());
   let {crosswordGrid,storedQA,questionNumbersMap}=puzzledata;
   const [Score, setScore] = useState(null);
   const [userGrid, setUserGrid] = useState(() => {
  return Array(10).fill(null).map(() => Array(10).fill(''));
});

const handleSubmit=async ()=>{
   let score=0;
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
          if(flag==true)
      {
          score++;
      }
  })

  setScore(score);

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
          <div className='cell-container'>
          {number && <span>{number}</span>}
          <input
            key={`${rowIndex}-${cellIndex}`}
            type='text'
            maxLength='1'
            value={userGrid[rowIndex][cellIndex]}
            className={isEmpty ? "emptyCell" : "filledCell"}
            disabled={isEmpty}
            onChange={(e) => {
  const newUserGrid = [...userGrid.map(row => [...row])];
  newUserGrid[rowIndex][cellIndex] = e.target.value.toUpperCase();
  setUserGrid(newUserGrid);
}}
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

<button onClick={handleSubmit}> Submit </button>
{Score && <p className="score"> Score:{Score}</p>}
  </div>    
</>
  )
}

export default Crossword;