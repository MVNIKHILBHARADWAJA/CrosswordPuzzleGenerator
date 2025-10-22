const teluguConsonants = "కఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహళ";
const teluguVowels = "అఆఇఈఉఊఋౠఎఏఐఒఓఔ";
const teluguVowelSigns = "ాిీుూృౄెేైొోౌౢౣ";
const teluguModifiers = "ంః";
const teluguVirama = "్";

const hindiConsonants = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";
const hindiVowels = "अआइईउऊऋॠएऐओऔ";
const hindiVowelSigns = "ािीुूृॄेैोौॢॣ";
const hindiModifiers = "ंःँ";
const hindiVirama = "्";


export const segmentation= (language,answer)=>{
    let consonants,vowels,vowelSigns,modifiers,virama;
    if(language=="hindi")
    {
       consonants=hindiConsonants;
      vowels=hindiVowels;
        vowelSigns=hindiVowelSigns;
       modifiers=hindiModifiers;
       virama=hindiVirama;
    }
    if(language=="telugu")
    {       
       consonants=teluguConsonants;
      vowels=teluguVowels;
        vowelSigns=teluguVowelSigns;
       modifiers=teluguModifiers;
       virama=teluguVirama;
    }
    
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


