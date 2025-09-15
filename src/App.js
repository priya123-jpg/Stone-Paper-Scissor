import {useState,useEffect} from "react";
import './App.css';

const choices = ["✊","✋","✌️"];

function App() {
  const[playerChoice,setPlayerChoice] =useState("");
  const[compChoice,setCompChoice] = useState("");
  const[result,setResult] = useState("");
  const [score, setScore] = useState(() => {
    // Load saved score from localStorage (default 0 if not found)
    const savedScore = localStorage.getItem("playerScore");
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  // Save score to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("playerScore", score);
  }, [score]);
//handleChoice
  const handleChoice = (choice) =>{
    const randomChoice = Math.floor(Math.random()*3);
    const compChoice = choices[randomChoice];
    setCompChoice(compChoice);
    setPlayerChoice(choice);

    if(choice === compChoice){
      setResult("It's TIE");
    }else if(
            (choice === "✊" && compChoice === "✌️" )||
            (choice === "✋" && compChoice === "✊")||
            (choice === "✌️" && compChoice === "✋")
    ){
      setResult("You Win!");
      setScore((prev) => prev + 1);
      }else{
        setResult("Computer Win!");
      }
  }

  return (
    <div className="App">
    <div className="option-container">
      <h1>Stone Paper Scissor</h1>
      <ul>{
        choices.map((choice)=>(
          <button key={choice} className="choice" onClick = {()=>handleChoice(choice)}>{choice}</button>
        ))
        }</ul>
    </div>
    {result && (
        <div className="result">
          <div className="result-grid">
            <div className="result-left">
              <p>PlayerChoice : {playerChoice}</p>
              <p>ComputerChoice : {compChoice}</p>
              <p className="main-result">Result : {result}</p>
            </div>
            <div className="result-right">
              <h3>Score: {score}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
