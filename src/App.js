import * as React from 'react';
import { useEffect, useState } from 'react';
// import { Transition } from '@headlessui/react'
import useTimeout from './hooks/useTimeout';
import { ReactComponent as Tasmania }  from './svgs/tasmania.svg';
import { ReactComponent as Flower }  from './svgs/flower.svg';
// import fractal from './gifs/fractal_1.gif'
// import ReactVivus from 'react-vivus';
import useMousePosition from './hooks/useMousePosition'
import mouse from './imgs/mouse.png'
import mouseClicked from './imgs/clicked.png'
import buddha from './imgs/buddha.png'
import buddha2 from './imgs/buddha2.png'
import deli from './imgs/deli.png'
import llama from './imgs/llama.png'
import kumquat from './imgs/kum.png'
import tree from './imgs/tree.png'
import spoon from './imgs/spoon.jpeg'
import sunglasses from './imgs/sunglasses.png'

import Typist from 'react-typist';

// buddha 
// - before I show you the way, first I need you help
// - for you see, the summer has been kind
// - and my farm has bore many fruit
// 

// trees
// shakes = nothing
// blunt instrument 
// - before you can master your mind
// - you must master your body
// kumwquay
// my child, you have done well
// you have proven your 



const COPY = {
  login: [
    "To find ourselves, we must first get lost.",
    "What is it you seek, my child?",
  ],
  buddha: [
    [
      "My young disciple",
      "Welcome.",
      "",
      "You are weary, and have come far.",
      "These times have been tough, and unfair.",
      "I can see your hurting",
      "",
      "",
      "But I am here to help.",
      "I am here to set you free.",
    ],
    [ 
      "You see, We are all seeking something",
      "",
      "However…",
      '',
      "I have met many who seek",
      "But few who have found",
      '',
      "Many who want",
      "But few who need",
      '',
      "Many who take",
      "But few who give",
      "",
      "Before I show you the path forward,",
      "You must surrender yourself to service.",
      "",
      "Are you ready?"
    ],
   [
    'In order to receive, we must first learn to give.',
    '',
    'I have a good friend, the Deli Llama, who needs your help',
    '',
    'The seasons have been kind to him',
    'And he has been met with abundance',
    'But he is old and frail',
    'He is unable to reep the benefits,',
    'of the seeds he once sowed',
    '',
    'Will you help him?'
  ]
  ],
  deli_1: [
    "Welcome child, to my Deli",
    "Your offer of help is very kind.",
    '',
    '',
    "This summer has been good to me,",
    "and my farm has bore many fruits.",
    "But I dont have the means to harvest.",
    "Can you please help me?",
  ],
  deli_2: [
    "Thank you!",
    "Come with me...."
  ],
  game_1: [
    'Welcome to my Kumquat farm',
    'I need you to help me pick my fruit',
    'But my fruit are gentle,',
    'and must be handled with care.',
    'Please select an appropriate tool…',
  ],
  game_2: [
    "Yes, that will do nicely!",
    "Please harvest my fruit for me",
  ],
  game_3: [
    "Amazing - now I can get back to work",
    "Thank you kind wanderer.",
  ],
  premap: [
      'Thank you for helping my good friend',
      "You have proven you are ready",
      "Ready to be shown the path",
  ],
  map: [
  "They speak of a place…",
  "…beyond the horizon…",
  "…where the water runs pure…",
  "…the air blows fresh…",
  "…and the only things that's missing…",
  "Is you"
  ],
  map_2: [
    "You're being called",
    "To join on an adventure",
    "On an journey with no destination",
    "A beginning with no end",
  ],
  announcement: [
    
  ]
}

const Fade = ({show, duration=2000, children}) => {
  return <div className={`${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-${duration}`}>{children}</div>
}

const timeOfDay = () => {
  var today = new Date()
  var curHr = today.getHours()

  if (curHr < 12) {
    console.log('morning')
  } else if (curHr < 18) {
    console.log('afternoon')
  } else {
    console.log('evening')
  }
}

const Login = ({onSuccess}) => {
  const [ show, setShow] = useState([])
  const [password, setPassword] = useState()

  useTimeout(() => setShow(show.concat(['text1'])), 1000)
  useTimeout(() => setShow(show.concat(['text2'])), 5000)
  useTimeout(() => setShow(show.concat(['input'])), 7000)
  
  function handleKeyPress (e) {
    if (e.key === 'Enter') {
    onSuccess({password})
    }
  }

  return <div className='flex flex-col space-y-4'>
    <Fade show={show.includes('text1')}>
    <p className='text-white'>{COPY.login[0]}</p>
    </Fade>
  <Fade show={show.includes('text2')}><p className='text-white'>{COPY.login[1]}</p></Fade>
  <Fade show={show.includes('input')}>
    <input type='text'  value={password} onChange={e => setPassword(e.target.value)} className='border-b border-dashed border-white bg-black text-black px-4 py-2 focus:bg-monk' onKeyPress={handleKeyPress}/>
  </Fade>

  </div>
}

const BG_CLASSES = ['bg-black','bg-white', 'bg-green-200','bg-green-400','bg-green-600','bg-green-900','bg-black', 'fractal']
const Map = ({onSuccess}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(0);
  const [ bg, setBg] = useState(0)
  
  const copy = COPY.map
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
          <Fade show={show}>{copy[text]}</Fade>
          </div>
          <Tasmania className={'draw-svg stroke-current  ' + (bgClass === 'bg-black' && bg > 0 ? 'text-black' : 'text-white') }/>
      </div>
    </div>
}


const ToeMouse = () => {
const { x, y, down } = useMousePosition();
return (
  <>
          {/* 2. */}
    <div
      style={{ left: `${x}px`, top: `${y}px` }}
      className="toe"
    >
      <img src={down ? mouseClicked : mouse  } className={`pointer-none transition-all h-24 relative -top-4 ${down ? '-left-6' : '-left-6'} cursor-none`} alt='toe'/>
    </div>
  </>
);
};

const Story = ({onDone, onTypingDone, startDelay=2000, copy, cta}) => {
  return <div>
     <Typist cursor={{show: false}} onTypingDone={() => onTypingDone && onTypingDone()} startDelay={startDelay} avgTypingDelay={40}>
    {copy.map(c => c === '' ? <br/> : <span><p>{c}</p><Typist.Delay ms={600} /></span>)}
    <Typist.Delay ms={1000} />
    {cta ? <button className='inline-block mt-10 cursor-pointer border border-monk px-4 py-2 hover:bg-monk hover:text-white' onClick={onDone}>{cta}</button> : <p></p>}
    </Typist>
  </div>
}
const Buddha = ({onSuccess}) => {
  const [ show, setShow ] = useState(false)
  const [ step, setStep ] = useState(1)
  const copy = COPY.buddha
  useEffect(() => {
    setShow(true)
  }, [])
  return (
    <>
    {step === 1 &&  <BlackFade onDone={() => setStep(2)} from/>}
    <Fade show={step > 1} className='w-1/2'>
      <img src={buddha2} alt="buddha" className='animate-float' width="400"/>
    </Fade>
    <div className='w-1/2'>
    { step === 2 &&  <Story copy={copy[0]} cta="Yes…" onDone={() => setStep(3)}/>}
    { step === 3 &&  <Story copy={copy[1]} cta="Yes, I'm ready" onDone={() => setStep(4)}/>}
    { step === 4 &&  <Story copy={copy[2]} cta="Sure" onDone={() => setStep(5)}/>}
    { step === 5 &&  <BlackFade onDone={onSuccess}/>}
    </div>
    </>)
}

const Premap = ({onSuccess}) => {
  const [ step, setStep ] = useState(1)
  const copy = COPY.premap
  return (
    <>
    { step === 1 && <BlackFade onDone={() => setStep(2)} from/>}
    { step === 3 && <BlackFade onDone={onSuccess}/>}
    <Fade show={step > 1} className='w-1/2'>
    <img src={buddha2} alt="buddha" className='animate-float' width="400"/>
    </Fade>
    <div className='w-1/2'>
    { step === 2 &&  <Story copy={copy} cta='Please get on with it' onDone={() => setStep(3)}/>}
    </div>
    </>)
}

const Deli = ({onSuccess}) => {
  const [ show, setShow ] = useState(false)
  const [step, setStep] = useState(1)
  useTimeout(() => {
    setShow(true)
  }, 1000)
  return (
    <>
    { step === 1 && <BlackFade onDone={() => setStep(2)} from/>}
    { step === 4 && <BlackFade onDone={onSuccess}/>}
    <div className='w-1/4'></div>
    <div className='w-1/4'>
      {step === 2 && <Story copy={COPY.deli_1} startDelay={10000} onDone={() => setStep(3)} cta="Yes"/>}
      { step === 3 && <Story copy={COPY.deli_2} onTypingDone={() => setStep(4)}/> }
    </div>
    <div className='w-1/2 relative flex flex-row items-center justify-center'>
    <img src={llama} alt="deli" className='animate-llama transition-all relative duration-10000' width={300} style={{left: step > 1 ? 0: 600}}/> 
    <img src={deli} alt="deli" className='absolute top-60'/>
    </div>
    </>)
}

const Kumquat = ({x=0, y=0, enabled=false, onClick, clicked}) => {
  return <div className='-mt-2 -ml-2 p-1' onClick={() => enabled &&  onClick()}><img className={`${clicked ? 'animate-spin' : ''} absolute z-40 transition-all duration-4000 w-6`} style={{top: clicked ? 2999 : y, left: x}} src={kumquat} alt='kumquat' /></div>
} 

const KumquatTree = ({onPicked, enabled,style}) => {
  const [clicked, setClicked] = useState({})

  useEffect(() => {
    const vals = Object.values(clicked)
    if (vals.length === 5 && vals.every(v => v)){
      onPicked()
    }
  },[onPicked, clicked])

  function handleClicked (i) {
    setClicked({[i]: true, ...clicked})
  }
  return <div className='absolute w-48' style={style}>
    <Kumquat clicked={clicked[0]} onClick={() => handleClicked(0)} enabled={enabled} x={30} y={40}/>
    <Kumquat clicked={clicked[1]} onClick={() => handleClicked(1)} enabled={enabled} x={145} y={45}/>
    <Kumquat clicked={clicked[2]} onClick={() => handleClicked(2)} enabled={enabled} x={30} y={100}/>
    <Kumquat clicked={clicked[3]} onClick={() => handleClicked(3)} enabled={enabled} x={85} y={25}/>
    <Kumquat clicked={clicked[4]} onClick={() => handleClicked(4)} enabled={enabled} x={130} y={95}/>
    <img src={tree} alt='tree' className='w-full absolute'/>
    </div>

}

const KumquatTrees = ({enabled, onPicked}) => {
  const [picked, setPicked] = useState({})

  useEffect(() => {
    const vals = Object.values(picked)
    if (vals.length === 5 && vals.every(v => v)){
      onPicked()
    }
  },[onPicked, picked])

  function handlePicked (i) {
    setPicked({[i]: true, ...picked})
  }
  return <>
    <KumquatTree onPicked={() => handlePicked(0)} enabled={enabled} style={{top: 150, left: 50 }}/>
  <KumquatTree  onPicked={() => handlePicked(1)} enabled={enabled} style={{top: 50, left: 300 }}/>
  <KumquatTree  onPicked={() => handlePicked(2)} enabled={enabled} style={{top: 100, right: 200 }}/>
  <KumquatTree  onPicked={() => handlePicked(3)} enabled={enabled} style={{bottom: 300, right: 300 }}/>
  <KumquatTree  onPicked={() => handlePicked(4)} enabled={enabled} style={{bottom: 300, left: 300 }}/>
  </>
}

const Game = ({onSuccess}) => {
  const [step, setStep] = useState(0)
  const [ error, setError] = useState()
  const canPlay = step > 2
  return <div className='overflow-hidden max-h-full'>
  {canPlay && <ToeMouse/>}
  { step === 0 && <BlackFade onDone={() =>  setStep(1)} from/>}
  <div className='flex flex-row space-y-4'>
  { step === 0 &&  <div class='w-96 mt-10'/>}
  { step === 1 &&  <div class='w-96 mt-10'>
    <Story copy={COPY.game_1} cta="Okay" onDone={() => setStep(2)}/>
  </div>}
  { step === 2 &&  <div className='w-96 mt-10 '> <div className='grid grid-cols-2 text-center'>
    <img src={mouse} alt='toe' className='h-24' onClick={() => setStep(3)}/>
    <img src={spoon} alt='spoon' className='h-24' onClick={() => setError('That spoon is far to small to pick a kumquat with!')}/>
    <img src={sunglasses} alt='glasses' className='h-24' onClick={() => setError('Sunglasses my look good on a wig, but they are no way to pick a kumquat!')}/>
    <img src={sunglasses} alt='glasses' className='h-24' onClick={() => setError('Sunglasses my look good on a wig, but they are no way to pick a kumquat!')}/>

    </div>
    {error && <p className='mx-10 mt-10'>{error}</p>}
  </div>}
  { step === 3 &&  <div className='w-96 mt-10'>
    <Story startDelay={0} copy={COPY.game_2}/>
  </div>}
  { step === 4 &&  <div className='w-96 mt-10'>
    <Story startDelay={0} copy={COPY.game_3} onTypingDone={() => setStep(5)}/>
  </div>}
  { step === 5 && <BlackFade onDone={onSuccess}/>}
    <img src={llama} alt='llama' width={200} /> 
  </div>
    <KumquatTrees enabled={canPlay} onPicked={() => setStep(4)}/>
  </div>
}

const Hover  = ({className='', setHover, value, children}) => {
  return (
    <div className={className + ' cursor-pointer'}
    onMouseEnter={() => setHover(value)}
    onMouseLeave={() => setHover(null)}>
      {children}
    </div>)
}

const BlackFade = ({duration= 2000, onDone, from=false}) => {
  const [black, setBlack] = useState(from)
  useEffect(() => {
    setBlack(!from)
  }, [])

  useTimeout(() => {onDone()}, 2000)
  return <div className={`absolute z-50 inset-0 transition-colors duration-${duration} ${(black ? 'bg-black' : 'bg-transparent')}`}/>
}

const Announcement = () => {
  const [width, setWidth] = useState(200)
  const [show, setShow] = useState([])
  const [hover, setHover] = useState()
  useEffect(() => {
    setWidth(800)
  }, [])
  useTimeout(() => {
    const showDupe = [...show] 
    showDupe[0] = true
    setShow(showDupe)
  }, 18000)
  useTimeout(() => {
    const showDupe = [...show] 
    showDupe[1] = true
    setShow(showDupe)
  }, 21000)
  useTimeout(() => {
    const showDupe = [...show] 
    showDupe[2] = true
    setShow(showDupe)
  }, 24000)
  useTimeout(() => {
    const showDupe = [...show] 
    showDupe[3] = true
    setShow(showDupe)
  }, 27000)
  useTimeout(() => {
    const showDupe = [...show] 
    showDupe[4] = true
    setShow(showDupe)
  }, 30000)

  const inner = <>
    <Fade show={show[1]} duration="1500"><p>PJ Murray presents</p></Fade>
    <Fade show={show[2]} duration="1500"><h1 className='text-7xl mb-2 -mt-2 font-dancing'>tasmaniacs</h1></Fade>
    <Fade show={show[3]} duration="1500"><p className='text-3xl'>the path to enlightment</p></Fade>
  </>

  return <Screen> 
    {show[4] && <>
      <ToeMouse/>
      <div onClick={() => setHover('what')} className='absolute z-50 top-0 left-0 p-20 text-2l'>What</div>
      <div onClick={() => setHover('when')} className='absolute z-50 top-0 right-0 p-20 text-2l'>When</div>
      <div onClick={() => setHover('theme')} className='absolute z-50 bottom-0 left-0 p-20 text-2l'>Theme</div>
      <div onClick={() => setHover('sign_up')} className='absolute bottom-0 right-0 p-20 text-2l'>Interested?</div>
      </>
}
    <div className='relative z-50'>
      {!hover && inner}
      {hover === 'when' &&  <div className='flex flex-col w-96'>
      <p className='text-2xl font-dancing mb-4'>When</p>
        <p className='text-3xl'>Friday Dec 17th</p>
        <p>to</p>
        <p className='text-3xl'>Wednesday Dec 22nd</p>
        <p className='mt-4'>Very much COVID dependant</p>
        <p>Currently limited on huts (10 max)</p><p>and flights (none)</p><p>may push it out to 2022</p>
      </div>}
      {hover === 'what' && <div className='flex flex-col w-96'>
      <p className='text-2xl font-dancing mb-4'>What</p>
      <p className='text-3xl'>2 nights in the wilderness</p>
        <p>Connect with nature, each other, and oneself </p>
        <p>Hiking, camping, day tripping</p>
      <p className='text-3xl mt-6'>2 nights in Hobart</p>
        <p>Decompression and debachuery</p>
        <p>Mona day trip</p>
      </div>}
      {hover === 'theme' && <div className='flex flex-col w-96'>
      <p className='text-2xl font-dancing mb-4'>Theme</p>
      <p className='text-3xl mb-2'>The Path to Enlightenment</p>
        <p>Humble monks in orange robes</p>
        <p>The practice of mystical rituals</p>
        <p>Sacred symbols and ancient wisdom</p>
        <p>Connection with the divine</p>
      </div>}
      {hover === 'sign_up' && <div className='flex flex-col w-96'>
      <p className='text-2xl font-dancing mb-4'>Interested?</p>
        <p>Currently feeling out interest.</p>
        <p>Everything is very much tentative at this stage.</p>
        <p>More information to follow as we get clairty.</p>
        <p>If you're keen, please fill out this form.</p>
        <p className='text-3xl mt-6'>I am ready</p>
      </div>}
    </div>
    <div className='z-20 absolute flex items-center justify-center'>
    <Fade show={show[0]} duration="4000">
        <div className='rounded-full w-96 h-96 bg-black'/>
    </Fade>
    </div>
    <div className='absolute duration-20000 transition-all' onClick={() => setHover(null)} style={{width: width}}><div className='animate-spin-slow w-full'>
      { 
      show[2] ? 
      <div className='fractal-flower'/>
      : <Flower className='w-full complete-svg stroke-current text-white' />
      }
      
      </div></div>
  </Screen>
}

const Screen = ({className="bg-black text-white", children}) => {
return (<div className={`${className} h-full w-full font-buda text-xl flex items-center justify-center text-center`}>
  {children}
</div>)

}
function App() {
  const [store, setStore] = useState()
  const [page, setPage ] = useState('login')
  return (
    <>
      { page === 'login' && <Screen><Login setStore={setStore} onSuccess={({password}) => {
        setStore({password, ...store})
        setPage('buddha')
        }}/></Screen>}
      { page === 'buddha' && <Screen className='bg-white text-black'><Buddha onSuccess={() => setPage('deli')}/></Screen>}
      { page === 'deli' && <Screen className='bg-white text-black'><Deli onSuccess={() => setPage('game')}/></Screen>}
      { page === 'game' && <Screen className='bg-white text-black'><Game onSuccess={() => setPage('premap')}/></Screen>}
      { page === 'premap' && <Screen className='bg-white text-black'><Premap onSuccess={() => setPage('map')}/></Screen>}
      { page === 'map' && <Map onSuccess={() => setPage('info')}/>}
      { page === 'info' && <Announcement/>}
    </>
  );
}

export default App;
