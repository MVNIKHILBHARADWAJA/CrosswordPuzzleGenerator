#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <random>
#include <ctime>

using namespace std;

class storedansinfo
{
public:
    string answer;
    string question;
    int x;
    int y;
    char direction;
    

    storedansinfo(string answer, string question, int x, int y, char direction)
    {
        this->answer = answer;
        this->question = question;
        this->x = x;
        this->y = y;
        this->direction = direction;
    }

    void print()
    {
        cout << "Answer: " << answer << "\n";
        cout << "Question: " << question << "\n";
        cout << "Position: (" << x << ", " << y << ")\n";
        cout << "Direction: " << direction << "\n";
    }
};

bool comparatar(pair<string,string> p1,pair<string,string> p2)
{
    return p1.first.length()>p2.first.length();
}
bool checkintialchecks(int currentanswerStartx,int currentanswerStarty,char currentanswerDirection,int currentanswerlength,vector<vector<char>> &crossword)
{ if(currentanswerDirection=='a')
    {
      if(currentanswerStarty<0||currentanswerStarty+currentanswerlength-1>=10)
      {
        return false;
      }
      if(currentanswerStarty-1>=0){
      if(crossword[currentanswerStartx][currentanswerStarty-1]!=' ')
      {
        return false;
      }
    }
    if(currentanswerStarty+currentanswerlength<10){
    if(crossword[currentanswerStartx][currentanswerStarty+currentanswerlength]!=' ')
    {
        return false;
    }
    }}
    else{
     if(currentanswerStartx<0||currentanswerStartx+currentanswerlength-1>=10)
      {
        return false;
      }

      if(currentanswerStartx-1>=0){
      if(crossword[currentanswerStartx-1][currentanswerStarty]!=' ')
      {
        return false;
      }
    }
    if(currentanswerStartx+currentanswerlength<10)
    {
    if(crossword[currentanswerStartx+currentanswerlength][currentanswerStarty]!=' ')
    {
    return false;
    }
}
    }
    
   return true; 
}
 bool checkFeasibility(int start,int end,int common,char currentanswerDirection,string currentanswer,vector<vector<char>> &crossword)
 {
   if(start>end)
   {
     return true;
   }
    
   if(currentanswerDirection=='a')
   { int wordIndex = start - (end - (currentanswer.length()-1)); 
      if (crossword[common][start] != ' ' && crossword[common][start] != currentanswer[wordIndex])
      { return false;}
    if (crossword[common][start] == ' ') {
    if (common - 1 >= 0 && crossword[common - 1][start] != ' ') return false;
    if (common + 1 < 10 && crossword[common + 1][start] != ' ') return false;
}
   char  prev=crossword[common][start];
crossword[common][start]=currentanswer[wordIndex];

bool flag=checkFeasibility(start+1,end,common,currentanswerDirection,currentanswer,crossword);
if(flag==false)
    {
        crossword[common][start]=prev;
        return false;
    }

    
   }
  
   if(currentanswerDirection=='d')
   {  int wordIndex = start - (end - (currentanswer.length()-1)); 
     
       if (crossword[start][common] != ' ' && crossword[start][common] != currentanswer[wordIndex])
      { return false;
      }
   if(crossword[start][common]==' ')
   {
   if (common - 1 >= 0 && crossword[start][common - 1] != ' ') 
   {return false;
   }
        if (common + 1 < 10 && crossword[start][common + 1] != ' ') 
        {return false;
        }
      }

char  prev=crossword[start][common];
crossword[start][common]=currentanswer[wordIndex];

bool flag=checkFeasibility(start+1,end,common,currentanswerDirection,currentanswer,crossword);
if(flag==false)
{
   crossword[start][common]=prev;
   return false;
}

   }
   
return true;
 }

//finds starting position,dirction of current answer and pass them to intialchecks and feasibility
bool checkPositions(string currentanswer,int currentidx,storedansinfo matchedqa,int matchedidx,vector<vector<char>> &crossword,vector<storedansinfo> &storedqa,string currentquestion)
{
int matchedanswerStartx=matchedqa.x;
int matchedanswerStarty=matchedqa.y;
int matchedanswerMatchedx,matchedanswerMatchedy,currentanswerStartx,currentanswerStarty;
char matchedanswerDirection=matchedqa.direction;
char currentanswerDirection;
if(matchedanswerDirection=='a')
{
    matchedanswerMatchedy=matchedanswerStarty+matchedidx;
    matchedanswerMatchedx=matchedanswerStartx;
    currentanswerDirection='d';
    currentanswerStartx=matchedanswerMatchedx-currentidx;
    currentanswerStarty=matchedanswerMatchedy;
}
else
{
     
     matchedanswerMatchedx=matchedanswerStartx+matchedidx;
    matchedanswerMatchedy=matchedanswerStarty;
    currentanswerDirection='a';
    currentanswerStarty=matchedanswerMatchedy-currentidx;
    currentanswerStartx=matchedanswerMatchedx;

}

//now you have got start index of currentanswer 
  if(checkintialchecks(currentanswerStartx,currentanswerStarty,currentanswerDirection,currentanswer.length(),crossword)==false)
  {
    return false;
  }
  bool flag;
  if(currentanswerDirection=='a')
  { 
     flag=checkFeasibility(currentanswerStarty,currentanswerStarty+currentanswer.length()-1,currentanswerStartx,currentanswerDirection,currentanswer,crossword);
  }
  else{
         flag=checkFeasibility(currentanswerStartx,currentanswerStartx+currentanswer.length()-1,currentanswerStarty,currentanswerDirection,currentanswer,crossword);

  }

  if(flag==false)
  {
    return false;
  }
  
  storedqa.emplace_back(currentanswer,currentquestion,currentanswerStartx,currentanswerStarty,currentanswerDirection);
return true;
}

//takes evry stored answer and compare each match char with current answer
bool checkForMatches(pair<string,string> currentqa,vector<vector<char>> &crossword,vector<storedansinfo> &storedqa)
{
    string currentanswer=currentqa.first;
    string currentquestion=currentqa.second;

    for(auto qa:storedqa)
    {
        string storedanswer=qa.answer;
        for(int i=0;i<currentanswer.length();i++)
        {
            for(int j=0;j<storedanswer.length();j++)
            {
                 if(currentanswer[i]==storedanswer[j])
                 {  
                  bool flag=checkPositions(currentanswer,i,qa,j,crossword,storedqa,currentquestion);
                       if(flag==true)
                       { 
                          return true;
                       }
                 }
            }
        }
    }
return false;
}




//fitting the word passing to check for matches if not putinng randomly
void fitting(vector<pair<string,string>> &randomqa,vector<storedansinfo> &storedqa,vector<vector<char>> &crossword)
{
    for(int i=1;i<randomqa.size();i++)
    {
     if(checkForMatches(randomqa[i],crossword,storedqa)==false)
     { 
        
        //put randomly
     }
     
    }
}



int main()
{
    vector<pair<string, string>> qa; // make sure the questions  greater than 100
    // insert question
qa.emplace_back("Kernel", "What is the core component of an OS?");
    qa.emplace_back("Process", "What is a running instance of a program?");
    qa.emplace_back("Thread", "What is the smallest unit of execution?");
    qa.emplace_back("Deadlock", "What is when processes wait forever for resources?");
    qa.emplace_back("Paging", "Which memory scheme avoids external fragmentation?");
    qa.emplace_back("Mutex", "Which lock allows only one thread at a time?");
    qa.emplace_back("Semaphore", "Which mechanism controls access by multiple processes?");
    qa.emplace_back("Thrash", "What is when CPU spends more time swapping?");
    qa.emplace_back("Swap", "What is moving processes in and out of memory?");
    qa.emplace_back("Zombie", "Which process finished but still in table?");
    qa.emplace_back("Fork", "Which system call creates a new process?");
    qa.emplace_back("Exec", "Which call replaces the current process image?");
    qa.emplace_back("Shell", "What is the OS command-line interface?");
    qa.emplace_back("Cache", "Which small fast memory lies between CPU and RAM?");
    qa.emplace_back("Loader", "Which component loads programs into memory?");
    qa.emplace_back("Virtual", "Which memory allows execution beyond RAM?");
    qa.emplace_back("User", "In which mode do applications run?");
    qa.emplace_back("Boot", "What is the OS startup process called?");
    qa.emplace_back("Time", "Round Robin scheduling is best for what?");
    qa.emplace_back("FIFO", "Which algorithm removes the oldest page?");
    qa.emplace_back("Class", "Which OOP unit groups fields and methods?");
    qa.emplace_back("GET", "Which HTTP method fetches data?");
    qa.emplace_back("POST", "Which HTTP method sends data to server?");
    qa.emplace_back("PUT", "Which HTTP method updates a resource?");
    qa.emplace_back("Heap", "Which structure implements priority queues?");
    qa.emplace_back("Stack", "Which structure follows LIFO?");
    qa.emplace_back("Queue", "Which structure follows FIFO?");
    qa.emplace_back("Tree", "Which structure is hierarchical?");
    qa.emplace_back("Graph", "Which structure has nodes and edges?");
    qa.emplace_back("NaN", "What is 0 divided by 0 in JavaScript?");
    qa.emplace_back("CSS", "Which tech styles HTML?");
    qa.emplace_back("HTML", "Which markup structures web pages?");
    qa.emplace_back("JS", "Which language powers interactivity in browsers?");
    qa.emplace_back("AJAX", "Which tech updates pages asynchronously?");
    qa.emplace_back("REST", "Which style uses stateless APIs?");
    qa.emplace_back("JSON", "Which format stores lightweight structured data?");
    qa.emplace_back("XML", "Which markup is both human and machine readable?");
    qa.emplace_back("OOP", "Which paradigm uses objects and classes?");
    qa.emplace_back("Encap", "Which OOP concept hides details?");
    qa.emplace_back("Inherit", "Which OOP concept reuses parent class?");
    qa.emplace_back("Poly", "Which OOP concept allows many forms?");
    qa.emplace_back("Abstr", "Which OOP concept shows only essentials?");
    qa.emplace_back("npm", "Which manager handles Node.js packages?");
    qa.emplace_back("Yarn", "Which alternative to npm exists?");
    qa.emplace_back("TCP", "Which protocol ensures reliable delivery?");
    qa.emplace_back("UDP", "Which protocol is faster but unreliable?");
    qa.emplace_back("IP", "Which protocol addresses packets on network?");
    qa.emplace_back("DNS", "Which service resolves names to IP?");
    qa.emplace_back("SMTP", "Which protocol sends emails?");
    qa.emplace_back("IMAP", "Which protocol reads emails from server?");
    qa.emplace_back("FTP", "Which protocol transfers files?");
    qa.emplace_back("SSH", "Which protocol securely logs into remote?");
    qa.emplace_back("HTTP", "Which protocol serves the web?");
    qa.emplace_back("HTTPS", "Which protocol is secure HTTP?");
    qa.emplace_back("div", "Which HTML tag is a container?");
    qa.emplace_back("span", "Which HTML tag is inline container?");
    qa.emplace_back("h1", "Which HTML tag defines main heading?");
    qa.emplace_back("p", "Which HTML tag defines paragraph?");
    qa.emplace_back("ul", "Which tag defines unordered list?");
    qa.emplace_back("ol", "Which tag defines ordered list?");
    qa.emplace_back("li", "Which tag defines list item?");
    qa.emplace_back("a", "Which tag creates hyperlink?");
    qa.emplace_back("img", "Which tag displays image?");
    qa.emplace_back("form", "Which tag defines form?");
    qa.emplace_back("SQL", "Which language queries databases?");
    qa.emplace_back("JOIN", "Which SQL clause combines tables?");
    qa.emplace_back("CRUD", "Which acronym means Create Read Update Delete?");
    qa.emplace_back("PK", "Which key uniquely identifies a record?");
    qa.emplace_back("FK", "Which key links to another table?");
    qa.emplace_back("View", "Which SQL object is a saved query?");
    qa.emplace_back("NULL", "Which value means no data?");
    qa.emplace_back("C++", "Which language supports OOP and low-level?");
    qa.emplace_back("Java", "Which language runs on JVM?");
    qa.emplace_back("C", "Which language is procedural and low-level?");
    qa.emplace_back("Go", "Which language by Google supports concurrency?");
    qa.emplace_back("Rust", "Which language ensures memory safety?");
    qa.emplace_back("PHP", "Which language powers WordPress?");
    qa.emplace_back("Perl", "Which scripting language is known for regex?");
    qa.emplace_back("Ruby", "Which language powers Rails?");
    qa.emplace_back("Swift", "Which language builds iOS apps?");
    qa.emplace_back("Kotlin", "Which language is official for Android?");
    qa.emplace_back("Scala", "Which JVM language mixes OOP and FP?");
    qa.emplace_back("R", "Which language is used for statistics?");
    qa.emplace_back("Matlab", "Which language is for math modeling?");
    qa.emplace_back("MongoDB", "Which NoSQL database stores JSON docs?");
    qa.emplace_back("MySQL", "Which RDBMS is most common?");
    qa.emplace_back("Redis", "Which store is key-value in memory?");
    qa.emplace_back("Neo4j", "Which DB specializes in graphs?");
    qa.emplace_back("Kafka", "Which tool is used for event streaming?");
    qa.emplace_back("Docker", "Which tool containers applications?");
    qa.emplace_back("Git", "Which VCS tracks code changes?");
    qa.emplace_back("Hub", "Which service hosts Git repos?");
    qa.emplace_back("CI", "Which practice means continuous integration?");
    qa.emplace_back("CD", "Which practice means continuous delivery?");
    qa.emplace_back("API", "Which interface lets apps talk?");
    qa.emplace_back("SDK", "Which kit provides tools for devs?");
    qa.emplace_back("IDE", "Which tool combines editor, build, debug?");
    qa.emplace_back("JVM", "Which machine runs Java bytecode?");
    qa.emplace_back("RAM", "Which memory is volatile?");
    qa.emplace_back("ROM", "Which memory is non-volatile?");
    qa.emplace_back("SSD", "Which storage is faster than HDD?");
    qa.emplace_back("BIOS", "Which firmware starts PC?");
    qa.emplace_back("Bus", "Which connects components inside computer?");

    
    vector<vector<char>> crossword(10, vector <char>(10, ' '));
    vector<storedansinfo> storedqa;

    mt19937 g(time(0));          //learn this once

    shuffle(qa.begin(), qa.end(), g);

    // Create a new vector with first 20 shuffled questions
    vector<pair<string, string>> randomqa(qa.begin(), qa.begin() + 20);   


    sort(randomqa.begin(), randomqa.end(),comparatar);                                                             //learn this once


    cout << "Randomly selected Q&A pairs:\n";
    for (auto &p : randomqa)
    {
        cout << "A: " << p.first << "\nQ: " << p.second << "\n\n";
    }
    

    // fit the first word
    string firstAns = randomqa[0].first;
    for (int i = 0; i < firstAns.length(); i++)
    {
        crossword[5][i] = firstAns[i];
    }

    storedqa.emplace_back(firstAns, randomqa[0].second, 5, 0, 'a');
    // now pass to fittng qa

    fitting(randomqa, storedqa, crossword);
   for(int i=0;i<storedqa.size();i++)
   {
     storedqa[i].print();
     cout<<"\n";

   }
    
    for(int i=0;i<10;i++)
    {
      for(int j=0;j<10;j++)
      {
        cout<<crossword[i][j]<<" ";
      }
      cout<<"\n";
    }


    return 0;
}