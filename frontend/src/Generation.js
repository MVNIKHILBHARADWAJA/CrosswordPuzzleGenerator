import data from "./data";
  import { segmentation } from "./customSegmentation";
export const regeneration=(Language)=>{
        let qa=data(Language);
  const shuffledQA=[...qa];
    for(let i=qa.length-1;i>0;i--)
    {
       let j=Math.floor(Math.random()*(i+1));
       let temp=shuffledQA[i];
       shuffledQA[i]=shuffledQA[j];
        shuffledQA[j]=temp;
    }

 const shuffledQA20=shuffledQA.slice(0,25);
 const randomQA=[];
  for(let i=0;i<shuffledQA20.length;i++)
  {  const question=shuffledQA20[i].question;
    let answer;
    if(Language!=="english")
    {
     answer=segmentation(Language,shuffledQA20[i].answer);
    }
    else
    {
       answer=shuffledQA20[i].answer;
    }

    
      randomQA.push({question,answer});
  }

  
 

randomQA.sort((a, b) => b.answer.length - a.answer.length);

return randomQA;

}
