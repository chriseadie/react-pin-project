import React, { useState } from 'react';
import './App.css';

type AppState = {
  isDisabled:boolean;
  inputs:number;
  [key:string]:any
}

function App() {
  const [state,setState] = useState<AppState>({
    isDisabled:false,
    inputs:6
  })


  function handleOtp(e:any){
    const input = e.currentTarget;
    let value = input.value;
    input.value = '';
    input.value = value ? value[0]:'';

    let fieldIndex = input.dataset.index;
    if(value.length > 0 && Number(fieldIndex) < state.inputs){
        input.nextElementSibling?.focus();
    }

    if(e.key == "Backspace" && Number(fieldIndex) > 0){
        input.previousElementSibling?.focus()
    }

    if(Number(fieldIndex) == state.inputs){
        submit()
    }
  }

  function submit(){
    console.log('submitted')
    setState({
      ...state,
      isDisabled:true
    })
  }

  function handleOnPasteOtp(e:any){
    const data = e.clipboardData.getData('text');
    const value = data.split('');

    if(value.length == state.inputs){
      var pastedState:any = {};
      for(var i =0;i < state.inputs;i++){
        pastedState[`input-${i+1}`] = value[i];
      }

    setState({
        ...state,
        ...pastedState,
        isDisabled:true
      })
    }

  }

  function handleChange(e:React.FormEvent<HTMLInputElement>){
    setState({
      ...state,
      [e.currentTarget.name]:e.currentTarget.value
    })
    
  }

  function inputMapper(){
    const inputArr = [];
    for(var i =0;i < state.inputs;i++){
      if(i == 2){
        inputArr.push(<input type='text' key={i} 
          onChange={handleChange}
          onKeyUp={handleOtp}
          onPaste={handleOnPasteOtp}
          maxLength={1} name={`input-${i+1}`} 
          value={state[`input-${i+1}`] ?? ""} 
          data-index={i+1} 
          className={`space ${state.isDisabled ? 'disabled':''}`}
          disabled={state.isDisabled}/>)
      }else {
        inputArr.push(<input type='text' key={i} 
          onChange={handleChange}
          onKeyUp={handleOtp}
          onPaste={handleOnPasteOtp}
          maxLength={1} 
          name={`input-${i+1}`} 
          value={state[`input-${i+1}`] ?? ""} 
          data-index={i+1} 
          className={state.isDisabled ? 'disabled':''}
          disabled={state.isDisabled}/>)
      }
      
    }
    return (<>{inputArr}</>)
  }


  return (
    <div className="App">
      <h1>Pin Project</h1>
      <div className="otp-field">
        {inputMapper()}
      </div>
    </div>
  );
}

export default App;
