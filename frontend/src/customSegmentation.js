const consonants = "కఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహళ";
const vowels = "అఆఇఈఉఊఋౠఎఏఐఒఓఔ";
const vowelSigns = "ాిీుూృౄెేైొోౌౢౣ";
const modifiers = "ంః";
const virama = "్"; 

export const segmentation= (answer)=>{
    let answerLetters=[];
 let str="";
 for(let i=0;i<answer.length;i++)
 { let ch=answer[i];
  
    

    if(vowels.includes(ch))
    { if(str!=""){
      answerLetters.push(str);}
        str="";
        str+=ch;
        continue;
        }
        
if(consonants.includes(ch))
       {
            if(i==0||answer[i-1]==virama)
            { 
                str+=ch;
                continue;
            }
            else{
             
                if(str!=""){
      answerLetters.push(str);}
                str="";
                str+=ch;
                continue;
            }
        }
       
        str+=ch;
     
 }
 if(str!=="")
 {
    answerLetters.push(str);

 }
 

return answerLetters;
 }


