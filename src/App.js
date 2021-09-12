import * as React from 'react';
import { useEffect, useState } from 'react';
// import { Transition } from '@headlessui/react'
import './App.css';
import useTimeout from './hooks/useTimeout';
import { ReactComponent as Tasmania }  from './svgs/tasmania.svg';
import fractal from './gifs/fractal_1.gif'
// import ReactVivus from 'react-vivus';

const PASSWORD = 'peach'

const COPY = {
  login: [
    "Sometimes to find ourselves, we must first get lost.",
    "What is it you seek?",
  ],
  intro: [
  "Beyond the horizon…",
  "There is a place",
  "Where the water runs pure",
  "The air blows fresh",
  "And the only things that's missing",
  "Is you"
  ]
}

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
    <p className='text-white'>{COPY.login[0]}</p>
    </Fade>
  <Fade show={show.includes('text2')}><p className='text-white'>{COPY.login[1]}</p></Fade>
  <Fade show={show.includes('input')}>
    <input type='text'  value={password} onChange={e => setPassword(e.target.value)} className='border border-white bg-black text-blue-400 px-4 py-2 focus:bg-gray-900' onKeyPress={handleKeyPress}/>
  </Fade>

  </div>
}

const BG_CLASSES = ['bg-black','bg-white', 'bg-green-200','bg-green-400','bg-green-600','bg-green-900','bg-black', 'fractal']
const Intro = ({onSuccess}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(0);
  const [ bg, setBg] = useState(0)
  
  const copy = COPY.intro
  // useTimeout(() => {setText(COPY.intro[0])}, 1000)

  function handleClick () {
    if (text < copy.length - 1) {
      return
    }
    if (bg <  BG_CLASSES.length - 1) {
      setBg(bg + 1)
    } else {
      onSuccess()
    }
    
  }

  function queueNext(i) {
    setTimeout(() => {
      setShow(false)
    }, 2000)

    if (i >= copy.length) {
      return
    }

    setTimeout(() => {
      setText(i)
      setShow(true)
      queueNext(i + 1)
    }, 4000)
  }
  useEffect(() => {
    setShow(true)
    queueNext(1)
  }, [])
  const bgClass = BG_CLASSES[bg]

  return <div className={"duration-500 transition-colors h-full w-full flex items-center justify-center p-20 text-white " + bgClass}>
      <div className='w-full max-w-2xl relative z-20' onClick={handleClick}>
        <div className='absolute inset-0  flex flex-row items-center justify-center'>
          <Fade show={show}>{COPY.intro[text]}</Fade>
          </div>
          <Tasmania className={'draw-svg stroke-current  ' + (bgClass === 'bg-black' && bg > 0 ? 'text-black' : 'text-white') }/>
      </div>
    </div>
}

const Info = ({onSuccess}) => {
  return (<div className={"h-full w-full flex items-center justify-center p-20 bg-white text-black"}>
    </div>)
}

function App() {
  const [page, setPage ] = useState('login')
  return (
    <div className="App bg-black h-full w-full flex items-center justify-center text-white">
      { page === 'login' && <Login onSuccess={() => setPage('intro')}/>}
      { page === 'intro' && <Intro onSuccess={() => setPage('info')}/>}
      { page === 'info' && <Info/>}
    </div>
  );
}

export default App;
