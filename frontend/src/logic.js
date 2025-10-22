import { regeneration } from "./Generation"

class StoredAnsInfo {
  constructor(answer, question, x, y, direction) {
    this.answer = answer;
    this.question = question;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  print() {
    console.log("Answer: " + this.answer);
    console.log("Question: " + this.question);
    console.log("Position: (" + this.x + ", " + this.y + ")");
    console.log("Direction: " + this.direction);
  }
}


const checkInitialChecks = (currentAnswerStartx, currentAnswerStarty, currentAnswerDirection, currentAnswerLength, crossword) => {
    if (currentAnswerDirection === 'a') {
        if (currentAnswerStarty < 0 || currentAnswerStarty + currentAnswerLength - 1 >= 10) {
            return false;
        }
        if (currentAnswerStarty - 1 >= 0) {
            if (crossword[currentAnswerStartx][currentAnswerStarty - 1] !== ' ') {
                return false;
            }
        }
        if (currentAnswerStarty + currentAnswerLength < 10) {
            if (crossword[currentAnswerStartx][currentAnswerStarty + currentAnswerLength] !== ' ') {
                return false;
            }
        }
    }
    else {
        if (currentAnswerStartx < 0 || currentAnswerStartx + currentAnswerLength - 1 >= 10) {
            return false;
        }
        if (currentAnswerStartx - 1 >= 0) {
            if (crossword[currentAnswerStartx - 1][currentAnswerStarty] !== ' ') {
                return false;
            }
        }
        if (currentAnswerStartx + currentAnswerLength < 10) {
            if (crossword[currentAnswerStartx + currentAnswerLength][currentAnswerStarty] !== ' ') {
                return false;
            }
        }
    }
    return true;
};

const checkFeasibility = (start, end, common, currentAnswerDirection, currentAnswer, crossword) => {
    
    if (start > end) {
        return true;
    }

    if (currentAnswerDirection === 'a') {
        const wordIndex = start - (end - (currentAnswer.length - 1));

        if (crossword[common][start] !== ' ' && crossword[common][start] !== currentAnswer[wordIndex]) {
            return false;
        }

        if (crossword[common][start] === ' ') {
            if (common - 1 >= 0 && crossword[common - 1][start] !== ' ') {
                return false;
            }
            if (common + 1 < crossword.length && crossword[common + 1][start] !== ' ') {
                return false;
            }
        }
        
        const prev = crossword[common][start];
        crossword[common][start] = currentAnswer[wordIndex];

        const flag = checkFeasibility(start + 1, end, common, currentAnswerDirection, currentAnswer, crossword);
        
        if (flag === false) {
            crossword[common][start] = prev;
            return false;
        }
    }

    else if (currentAnswerDirection === 'd') {
        const wordIndex = start - (end - (currentAnswer.length - 1));

        if (crossword[start][common] !== ' ' && crossword[start][common] !== currentAnswer[wordIndex]) {
            return false;
        }
        
        if (crossword[start][common] === ' ') {
            if (common - 1 >= 0 && crossword[start][common - 1] !== ' ') {
                return false;
            }
            if (common + 1 < 10 && crossword[start][common + 1] !== ' ') {
                return false;
            }
        }

        const prev = crossword[start][common];
        crossword[start][common] = currentAnswer[wordIndex];

        const flag = checkFeasibility(start + 1, end, common, currentAnswerDirection, currentAnswer, crossword);
        
        if (flag === false) {
            crossword[start][common] = prev;
            return false;
        }
    }

    
    return true;
};


const checkPositions = (currentAnswer, currentIdx, matchedQA, matchedIdx, crossword, storedQA, currentQuestion,placedCounters) => {
    const matchedAnswerStartx = matchedQA.x;
    const matchedAnswerStarty = matchedQA.y;
    let matchedAnswerMatchedx, matchedAnswerMatchedy, currentAnswerStartx, currentAnswerStarty;
    const matchedAnswerDirection = matchedQA.direction;
    let currentAnswerDirection;

    if (matchedAnswerDirection === 'a') {
        matchedAnswerMatchedy = matchedAnswerStarty + matchedIdx;
        matchedAnswerMatchedx = matchedAnswerStartx;
        currentAnswerDirection = 'd';
        currentAnswerStartx = matchedAnswerMatchedx - currentIdx;
        currentAnswerStarty = matchedAnswerMatchedy;
    } else {
        matchedAnswerMatchedx = matchedAnswerStartx + matchedIdx;
        matchedAnswerMatchedy = matchedAnswerStarty;
        currentAnswerDirection = 'a';
        currentAnswerStarty = matchedAnswerMatchedy - currentIdx;
        currentAnswerStartx = matchedAnswerMatchedx;
    }

    if (!checkInitialChecks(currentAnswerStartx, currentAnswerStarty, currentAnswerDirection, currentAnswer.length, crossword)) {
        return false;
    }

    let flag;
    if (currentAnswerDirection === 'a') {
        flag = checkFeasibility(currentAnswerStarty, currentAnswerStarty + currentAnswer.length - 1, currentAnswerStartx, currentAnswerDirection, currentAnswer, crossword);
    } else {
        flag = checkFeasibility(currentAnswerStartx, currentAnswerStartx + currentAnswer.length - 1, currentAnswerStarty, currentAnswerDirection, currentAnswer, crossword);
    }

    if (!flag) {
        return false;
    }
    
    if (currentAnswerDirection === 'a') {
        placedCounters.horizontally++;
    } else {
        placedCounters.vertically++;
    }
    
    storedQA.push(new StoredAnsInfo(currentAnswer, currentQuestion, currentAnswerStartx, currentAnswerStarty, currentAnswerDirection));
    return true;
};

const checkForMatches = (currentQA, crossword, storedQA,placedCounters) => {
    
    const currentAnswer = currentQA.answer;
    const currentQuestion = currentQA.question;

    for (const qa of storedQA) {
        const storedAnswer = qa.answer;

        for (let i = 0; i < currentAnswer.length; i++) {
            for (let j = 0; j < storedAnswer.length; j++) {
                
                if (currentAnswer[i] === storedAnswer[j]) {
                    
                    const isFeasible = checkPositions(currentAnswer, i, qa, j, crossword, storedQA, currentQuestion,placedCounters);

                    if (isFeasible) {
                        return true;
                    }
                }
            }
        }
    }
   
    return false;
};

const fitting = (randomQA, storedQA, crossword,placedCounters) => {
  for (let i = 1; i < randomQA.length; i++) {
    const currentQA = randomQA[i];
    const currentAnswer = currentQA.answer;
    const currentQuestion = currentQA.question;

    
    const matchFound = checkForMatches(currentQA, crossword, storedQA,placedCounters);

    if (!matchFound) {
      let flag = false;
      for (let x = 0; x < crossword.length; x++) {
        for (let y = 0; y < crossword[x].length; y++) {
          if (crossword[x][y] !== ' ') {
            continue;
          }

          let currentAnswerDirection;
          if (placedCounters.vertically >= placedCounters.horizontally) {
            currentAnswerDirection = 'a'; 
          } else {
            currentAnswerDirection = 'd'; 
          }

          const currentAnswerLength = currentAnswer.length;

          flag = checkInitialChecks(x, y, currentAnswerDirection, currentAnswerLength, crossword);
          if (flag) {
            if (currentAnswerDirection === 'a') {
              flag = checkFeasibility(y, y + currentAnswerLength - 1, x, currentAnswerDirection, currentAnswer, crossword);
            } else {
              flag = checkFeasibility(x, x + currentAnswerLength - 1, y, currentAnswerDirection, currentAnswer, crossword);
            }
          }

          if (flag) {
            if (currentAnswerDirection === 'a') {
              placedCounters.horizontally++;
            } else {
              placedCounters.vertically++;
            }
            storedQA.push(new StoredAnsInfo(currentAnswer, currentQuestion, x, y, currentAnswerDirection));
            break; 
          }
        }
        if (flag) {
          break; 
        }
      }
    }
  }
};
  
export const crosswordregeneration=(Language)=>{
    let storedQA=[];
  let crossword = [];
let rows = 10;
let cols = 10;

for (let i = 0; i < rows; i++) {
  crossword[i] = []; 
  for (let j = 0; j < cols; j++) {
    crossword[i][j] = " "; 
  }
}

let placedCounters = {
  vertically: 0,
  horizontally: 0
};


const randomQA=regeneration(Language);

let firstAns=randomQA[0].answer;
if(Math.random()>=0.5)
{
     for (let i = 0; i < firstAns.length; i++)
    {
        crossword[5][i] = firstAns[i];
    }
 storedQA.push(new StoredAnsInfo(firstAns,randomQA[0].question,5,0,'a'));
placedCounters.horizontally++;
}
else{
    for (let i = 0; i < firstAns.length; i++)
    {
        crossword[i][5] = firstAns[i];

    }
    storedQA.push(new StoredAnsInfo(firstAns,randomQA[0].question,0,5,'d'));
   placedCounters.vertically++;
}
fitting(randomQA, storedQA, crossword,placedCounters);

const questionNumbersMap = {};
    storedQA.forEach((qa, index) => {
      questionNumbersMap[`${qa.x}-${qa.y}`] = index + 1;
    });


 
return {
  crosswordGrid:crossword,
  storedQA:storedQA,
  questionNumbersMap:questionNumbersMap
}

}