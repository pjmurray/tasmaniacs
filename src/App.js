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
import kumquat from './imgs/kum.png'
import tree from './imgs/tree.png'

const PASSWORD = 'peach'

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
  budda: [

  ],
  story: [
    "My young disciple",
    "I have met many who seek",
    "But few who have found",
    "Plenty have gone mad in the persuit of {{seeking}}",
    "For they lack the patience and",

  ],
  map: [
  "They speak of a place…",
  "…beyond the horizon…",
  "…where the water runs pure…",
  "…the air blows fresh…",
  "…and the only things that's missing…",
  "Is you"
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

const Buddha = ({onSuccess}) => {
  const [ show, setShow ] = useState(false)
  const copy = COPY.buddha
  useEffect(() => {
    setShow(true)
  }, [])
  return (<div className={"h-full w-full flex flex-col items-center justify-center p-20 bg-white text-black cursor-none"}>
    <Fade show={show}>
    <img src={buddha2} alt="buddha" className='animate-float' width="400"/>
    </Fade>
    <div class='pt-10'>
    <p>We are all seeking something</p>
    </div>
    </div>)
}

const Kumquat = ({x=0, y=0}) => {
  const [clicked, setClicked] = useState()
  return <img className={`${clicked ? 'animate-spin' : ''} absolute z-40 transition-all duration-4000 w-6`} style={{top: clicked ? 999 : y, left: x}} src={kumquat} alt='kumquat' onClick={() => setClicked(true)}/>
} 

const KumquatTree = ({style}) => {
  return <div className='absolute w-48' style={style}>
    <Kumquat x={30} y={40}/>
    <Kumquat x={145} y={45}/>
    <Kumquat x={30} y={100}/>
    <Kumquat x={85} y={25}/>
    <Kumquat x={130} y={95}/>
    <img src={tree} alt='tree' className='w-full absolute'/>
    </div>

}

const Game = () => {
  return <div className='overflow-hidden max-h-full'>
  <ToeMouse/>
  <KumquatTree style={{top: 150, left: 50 }}/>
  <KumquatTree style={{top: 50, left: 300 }}/>
  <KumquatTree style={{top: 100, right: 200 }}/>
  <KumquatTree style={{bottom: 300, right: 300 }}/>
  <KumquatTree style={{bottom: 300, left: 300 }}/>
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

const Announcement = ({showAll}) => {
  const [width, setWidth] = useState(200)
  const [show, setShow] = useState(showAll ? [true, true, true, true,true] : [])
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

const Details = () => {
  return <Screen className='flex-row'>
    <div className='flex flex-row'>
      <div>
        What
      </div>
      <div>
        When
      </div>
      <div>
        Where
      </div>
      <div>
        Who
      </div>
    </div>
    <div>Interested?</div>
  </Screen>
}

const Screen = ({className="bg-black", children}) => {
return (<div className={`${className} h-full w-full font-buda text-xl flex items-center justify-center text-white text-center`}>
  {children}
</div>)

}
function App() {
  const [store, setStore] = useState()
  const [page, setPage ] = useState('annoucement')
  return (
    <>
      { page === 'login' && <Screen><Login setStore={setStore} onSuccess={({password}) => {
        setStore({password, ...store})
        setPage('buddha')
        }}/></Screen>}
      { page === 'buddha' && <Screen className='bg-white'><Buddha/></Screen>}
      { page === 'game' && <Screen className='bg-white'><Game onSuccess={() => setPage('info')}/></Screen>}
      { page === 'map' && <Map onSuccess={() => setPage('info')}/>}
      { page === 'annoucement' && <Announcement showAll/>}
      { page === 'details' && <Details/>}
    </>
  );
}

export default App;
