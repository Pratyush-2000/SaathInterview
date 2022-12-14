import './App.css';
import { useState,useEffect } from 'react';


function App() {

  const [query,setQuery] = useState("");
  const [boxCount,setBoxCount] = useState(0);
  const [boxes,setBoxes] = useState([]);


  const  updateBoxes = () => {


    let temp = []
    
    for(let i=0 ; i<boxCount ;i++){
      temp.push(i);
    }

    setBoxes(temp);


  }

  const debounce = (func,delay) => {

    let timeout

    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(...args)
      }, delay)
    }

  }

  const throttle = (func,limit) =>{
    let shouldWait = false
  
    return (...args) => {
      if (shouldWait) return ;
  
      func(...args)
      shouldWait = true
      setTimeout(() => {
        shouldWait = false
      }, limit)
    }
  }

  


  const incrementCount = () => {
    setBoxCount((old) => old+1);
  }


  useEffect(() =>{

    const debounceUpdateBoxes = debounce(incrementCount,3000);

    const throttleUpdateBoxes = throttle(incrementCount,3000);

    const combinationUpdate = () =>{
      debounceUpdateBoxes();
      throttleUpdateBoxes();
    }


    window.addEventListener('resize',combinationUpdate);

    return () => {
      window.removeEventListener('resize',combinationUpdate);
    }; 

  },[])

  useEffect(() =>{

    updateBoxes();

  },[boxCount])



  return (
    <div className="App">
        <input type="number" 
        onChange={(e) => {
          setQuery(Number(e.target.value));
        }}>
        </input>
        <button onClick={(e) => setBoxCount((old) => old+query)}>
          Submit
        </button>
      

      <div className="box-container">

        {boxes.map((box,index)=>{
            return <div key={index} className="box"></div>
        })}

      </div>
    </div>
  );
}

export default App;


// 1. Create a textbox and a submit button.,
//  the textbox specifies the number of boxes to be added on screen. The boxes should appear besides each other, 100px x 100px, grey in color, margin 5px, and should wrap to the next line when more are added.
// 2. Now boxes should be added whenever screen is resized.
// 3. addition of elements such that every 3 seconds only one element is added
// 4. addition of elements such that element is only added when resize stops for 3s

/**
 * 100px x 100px, grey in color, margin 5px, and should wrap to the next line when more are added
 */