import * as React from 'react';
import { useState } from 'react';
import { Transition } from '@headlessui/react'
import './App.css';
import useTimeout from './hooks/useTimeout';

const PASSWORD = 'peach'

const Fade = ({show, duration=2000, children}) => {
  return <div className={`${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-${duration}`}>{children}</div>
}

const Login = ({onSuccess}) => {
  const [ show, setShow] = useState([])
  const [password, setPassword] = useState()

  useTimeout(() => setShow(show.concat(['text1'])), 1000)
  useTimeout(() => setShow(show.concat(['text2'])), 5000)
  useTimeout(() => setShow(show.concat(['input'])), 7000)
  
  function handleKeyPress (e) {
    if (e.key === 'Enter') {
      if (PASSWORD === password) {
        onSuccess()
        // TODO: fade out
        // setTimeout(onSuccess, 3000)
      } else {
        alert("No")
      }
    }
  }

  return <div className='flex flex-col space-y-4'>
    <Fade show={show.includes('text1')}>
    <p className='text-white'> Sometimes to find ourselves, we must first get lost.</p>
    </Fade>
  <Fade show={show.includes('text2')}><p className='text-white'>What is it you seek?</p></Fade>
  <Fade show={show.includes('input')}>
    <input type='text'  value={password} onChange={e => setPassword(e.target.value)} className='border border-white bg-black text-blue-400 px-4 py-2 focus:bg-gray-900' onKeyPress={handleKeyPress}/>
  </Fade>

  </div>
}

const Intro = () => {
  return <>Hello</>
}


function App() {
  const [page, setPage ] = useState('login')
  return (
    <div className="App bg-black h-full w-full flex items-center justify-center">
      { page === 'login' && <Login onSuccess={() => setPage('intro')}/>}
      { page === 'intro' && <Intro/>}
    </div>
  );
}

export default App;
