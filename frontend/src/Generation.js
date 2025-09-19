import qa from "./data"
export const regeneration=()=>{
  const shuffledQA=[...qa];
    for(let i=qa.length-1;i>0;i--)
    {
       let j=Math.floor(Math.random()*(i+1));
       let temp=shuffledQA[i];
       shuffledQA[i]=shuffledQA[j];
        shuffledQA[j]=temp;
    }

 const randomQA=shuffledQA.slice(0,20);

randomQA.sort((a, b) => b.answer.length - a.answer.length);


return randomQA;

}
