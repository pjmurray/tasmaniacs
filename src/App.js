import * as React from 'react';
import { useEffect, useState } from 'react';
import Mustache from 'mustache';
import useTimeout from './hooks/useTimeout';
import { ReactComponent as Tasmania }  from './svgs/tasmania.svg';
import { ReactComponent as Flower }  from './svgs/flower.svg';
import useMousePosition from './hooks/useMousePosition'
import mouse from './imgs/mouse.png'
import mouseClicked from './imgs/clicked.png'
import buddha2 from './imgs/buddha2.png'
import deli from './imgs/deli.png'
import llama from './imgs/llama2.png'
import kumquat from './imgs/kum.png'
import tree from './imgs/tree.png'
import spoon from './imgs/spoon.jpeg'
import hand from './imgs/hand.jpeg'
import sunglasses from './imgs/sunglasses.png'
import { isMobile } from "react-device-detect";
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
  name: [
    "Our journey has just begun.",
    "Let us wander these lands together.",
    "By what name do you go by?"
  ],
  login: [
    "Welcome {{name}},",
    "I am here to guide you.",
    "To show you a path to set yourself free.",
    "Unfortunately to find ourselves,",
    "Sometimes we must first get lost.",
    "What is it that you seek, my child?",
  ],
  buddha: [
    [
      "My young disciple.",
      "Welcome.",
      "I've been waiting many years for you.",
      "",
      "You are weary, and have come far.",
      "These times have been tough and unfair.",
      "I can see that your hurting.",
      "",
      "",
      "But it's okay.",
      "But I am here to help.",
      "I am here to set you free.",
    ],
    [ 
      "You see, we are all seeking. Seeking something.",
      "Whether it is inner peace.",
      "Connection with the divine.",
      "Or {{seeking}}.",
      "We are all seeking, together.",
      "",
      "However…",
      '',
      "I have met many who seek,",
      "but few who have found.",
      '',
      "Many who have wanted,",
      "but few who have needed.",
      '',
      "Many who have taken,",
      "but few who have given.",
      "",
      "Before I show you the path forward,",
      "You must surrender yourself to service.",
    ],
   [
    'In order to receive, we must first learn to give.',
    '',
    'I have a good friend, the Deli Llama.',
    'He needs your help.',
    '',
    'The seasons have been kind to him.',
    'He has been met with abundance.',
    'But he is old and frail.',
    'He is unable to reep the benefits,',
    'of the seeds he once sowed.',
    '',
    'Will you help him?'
  ]
  ],
  deli_1: [
    "Welcome child, to my Deli!",
    "Your offer of help is very kind.",
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
    'Welcome to my Kumquat farm!',
    'I need you to help me pick my fruit.',
    '',
    'But my fruit are gentle,',
    'and must be handled with care.',
    '',
    'Please select an appropriate tool…',
  ],
  game_2: [
    "Good luck!",
    "Please harvest my fruit carefully for me.",
  ],
  game_3: [
    "Amazing - now I can get back to work",
    "Thank you kind wanderer.",
  ],
  premap: [
      'Thank you for helping my good friend!',
      "You have proven you are ready.",
      "Ready to be shown the path of truth.",
  ],
  map: [
  [
  "They speak of a place…",
  "…beyond the horizon…",
  "…where the water runs pure…",
  "…the air blows fresh…",
  "…and the only thing that's missing…",
  "Is you."
  ], 
   [
    "You're being called…",
    "…to join in on an adventure…",
    "…a journey with no destination…",
    "…a beginning with no end…",
    "…a moment in time…",
    "…that will last forver."
  ]
  ],
  announcement: [
    
  ]
}

const Fade = ({show, duration=2000, children}) => {
  return <div className={`${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-${duration}`}>{children}</div>
}

// const timeOfDay = () => {
//   var today = new Date()
//   var curHr = today.getHours()

//   if (curHr < 12) {
//     console.log('morning')
//   } else if (curHr < 18) {
//     console.log('afternoon')
//   } else {
//     console.log('evening')
//   }
// }

const TimedFade = ({showAt, duratin=2000, children}) => {
  const [ show, setShow] = useState(false)
  useTimeout(() => setShow(true), showAt)

  return <Fade show={show}>{children}</Fade>
}

const Name = ({onSuccess, store, setStore}) => {
  const copy = COPY.name
  
  function handleKeyPress (e) {
    if (e.key === 'Enter') {
    onSuccess()
    }
  }

  return <div className='flex flex-col space-y-4'>
    {copy.map((c, i) => <TimedFade showAt={1000 + i * 2500}><p className='text-white'>{Mustache.render(copy[i], store)}</p></TimedFade>)}
    <TimedFade showAt={1000 + copy.length * 2500}><input type='text'  value={store.name} onChange={e => setStore({...store, name: e.target.value})} className='text-center border-b border-dashed border-white bg-black text-white px-4 py-2' onKeyPress={handleKeyPress}/></TimedFade>

  </div>
}
const Login = ({onSuccess, store, setStore}) => {
  const copy = COPY.login
  
  function handleKeyPress (e) {
    if (e.key === 'Enter') {
    onSuccess()
    }
  }

  return <div className='flex flex-col space-y-4'>
    {copy.map((c, i) => <TimedFade showAt={1000 + i * 2500}><p className='text-white'>{Mustache.render(copy[i], store)}</p></TimedFade>)}
    <TimedFade showAt={1000 + copy.length * 2500}>
      <input type='text'  value={store.seeking} onChange={e => setStore({...store, seeking: e.target.value})} className='text-center border-b border-dashed border-white bg-black text-white px-4 py-2' onKeyPress={handleKeyPress}/>
      </TimedFade>

  </div>
}



const BG_CLASSES = ['bg-black','fractal']
// const BG_CLASSES = ['bg-black','bg-white', 'bg-black', 'fractal']
const Map = ({onSuccess}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(0);
  const [ bg, setBg] = useState(0)

  const copy = COPY.map[0]
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

  const queueNext = React.useCallback((i) => {

    if (i >= copy.length) {
      setBg(1)
      setTimeout(onSuccess, 3000)
      return
    } 

    setTimeout(() => {
      setShow(false)
    }, 2000)

    

    setTimeout(() => {
      setText(i)
      setShow(true)
      queueNext(i + 1)
    }, 4000)
  }, [copy.length, onSuccess]);
  useEffect(() => {
    setShow(true)
    queueNext(1)
  }, [queueNext])
  const bgClass = BG_CLASSES[bg]

  return <div className={`duration-2000 font-buda transition-colors h-full w-full flex items-center justify-center p-20 text-white ${bgClass}`}>
      <div className='w-full max-w-2xl relative z-20' onClick={handleClick}>
        <div className={`absolute inset-0  flex flex-row items-center justify-center ${text === copy.length - 1 ? 'text-3xl' : 'text-2xl'}`}>
          <Fade show={show}>{copy[text]}</Fade>
          </div>
          <Tasmania className={'draw-svg stroke-current ' + (bgClass === 'bg-black' && bg > 0 ? 'text-black' : 'text-white') }/>
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

const Button = ({children, onClick}) => (
  <button className='inline-block mt-10 cursor-pointer border border-monk text-white px-4 py-2 bg-monk hover:bg-white hover:bg-monk' onClick={onClick}>{children}</button>
)

const Story = ({onDone, store={}, onTypingDone, startDelay=2000, copy, cta}) => {
  return <div>
     <Typist cursor={{show: false}} onTypingDone={() => onTypingDone && onTypingDone()} startDelay={startDelay} avgTypingDelay={40}>
    {copy.map(c => c === '' ? <br/> : <span><p>{Mustache.render(c, store)}</p><Typist.Delay ms={600} /></span>)}
    <Typist.Delay ms={1000} />
    {cta ? <Button onClick={onDone}>{cta}</Button> : <p></p>}
    </Typist>
  </div>
}
const Buddha = ({store, onSuccess}) => {
  const [ step, setStep ] = useState(1)
  const copy = COPY.buddha
  return (
    <>
    {step === 1 &&  <BlackFade onDone={() => setStep(2)} from/>}
    <Fade show={step > 1} className='w-1/2'>
      <img src={buddha2} alt="buddha" className='animate-float' width="400"/>
    </Fade>
    <div className='w-1/2'>
    { step === 2 &&  <Story store={store} copy={copy[0]} cta="Yes…" onDone={() => setStep(3)}/>}
    { step === 3 &&  <Story store={store} copy={copy[1]} cta="Okay…" onDone={() => setStep(4)}/>}
    { step === 4 &&  <Story copy={copy[2]} cta="Sure" onDone={() => setStep(5)}/>}
    { step === 5 &&  <BlackFade onDone={onSuccess} from={false}/>}
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
  const [step, setStep] = useState(1)
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
    <img src={deli} alt="deli" className='absolute top-72'/>
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
  // eslint-disable-next-line
  },[clicked])

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
    if (vals.length === 5 && vals.every(v => v)) {
      onPicked()
    }
  // eslint-disable-next-line
  },[picked])

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
  const [ message, setMessage] = useState()
  const canPlay = step > 2
  return <div>
  {canPlay && <ToeMouse/>}
  { step === 0 && <BlackFade onDone={() =>  setStep(1)} from/>}
  { step === 5 && <BlackFade onDone={onSuccess}/>}

  <div className='flex flex-row space-y-4'>
  { step === 0 &&  <div class='w-96 mt-10'/>}
  { step === 1 &&  <div class='w-96 mt-10'>
    <Story copy={COPY.game_1} cta="Okay" onDone={() => setStep(2)}/>
  </div>}
  { step === 2 &&  <div className='w-96 mt-10 mr-10 '> <div className='grid grid-cols-2 gap-y-5'>
    <img src={spoon} alt='spoon' className='h-24 mx-auto' onClick={() => setMessage('No.... that spoon is far to small to pick a kumquat with!')}/>
    <img src={sunglasses} alt='glasses' className='h-24 mx-auto' onClick={() => setMessage('Sunglasses might look good on a wig, but they are no way to pick a kumquat!')}/>
    <img src={hand} alt='hand' className='w-24 mx-auto' onClick={() => setMessage('Hmmm, that looks like fun... but maybe for later in the evening?')}/>
    <img src={mouse} alt='toe' className='h-24 mx-auto' onClick={() => setMessage('Ahh, good idea! I toetally support using your feet.')}/>

    </div>
  </div>}
  { step === 3 &&  <div className='w-96 mt-10'>
    <Story startDelay={0} copy={COPY.game_2}/>
  </div>}
  { step === 4 &&  <div className='w-96 mt-10'>
    <Story startDelay={0} copy={COPY.game_3} onTypingDone={() => setStep(5)}/>
  </div>}
    <img src={llama} alt='llama' width={200} className='animate-llama' /> 
  </div>
  { step === 2 && <div className='w-96 mx-auto relative'>
    <div class='absolute'>
    {message && <p className=''>{message}</p>}
      {message && message.includes('feet') && <Button onClick={() => setStep(3)}>Start picking</Button>}
      </div>
      </div>
}
    <KumquatTrees enabled={canPlay} onPicked={() => setStep(4)}/>
  </div>
}

const BlackFade = ({duration= 2000, onDone, from=false}) => {
  const [black, setBlack] = useState(from)
  useEffect(() => {
    setBlack(!from)
  }, [from])

  useTimeout(() => {onDone?.()}, 2000)
  return <div className={`absolute z-50 inset-0 transition-colors duration-${duration} ${(black ? 'bg-black' : 'bg-transparent')}`}/>
}

const Announcement = () => {
  const [showControls, setShowContols] = useState(false)
  const [showBg, setShowBg] = useState(true)
  const [showColoredFractal, setShowColoredFractal] = useState(false)
  const [hover, setHover] = useState()
  useTimeout(() => {
    setShowContols(true)
  }, 30000)
  useTimeout(() => {
    setShowColoredFractal(true)
  }, 24000)

  const inner = <>
    <TimedFade showAt={21000} duration="1500"><p>PJ Murray presents</p></TimedFade>
    <TimedFade showAt={24000} duration="1500"><h1 className='text-7xl mb-2 -mt-2 font-dancing'>tasmaniacs</h1></TimedFade>
    <TimedFade showAt={27000} duration="1500"><p className='text-3xl'>the path to enlightment</p></TimedFade>
  </>

  return <Screen> 
    {showControls && <>
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
        <p>Currently limited on huts (10 max)</p><p>and flights (none)</p><p>so may push it out to 2022</p>
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
        <p>More information to follow as we get clarity.</p>
        <p>If you're keen, let me know :)</p>
      </div>}
    </div>
    <div className='z-20 absolute flex items-center justify-center'>
    <TimedFade showAt={18000} duration="4000">
        <div className='rounded-full w-96 h-96 bg-black'/>
    </TimedFade>
    </div>
    <div className={`absolute duration-20000 transform transition-transform ${showBg ? 'scale-0' : 'scale-100'}`} onClick={() => setHover(null)} style={{width: 800}}><div className='animate-spin-slow w-full'>
      { 
      showColoredFractal ? 
      <div className='fractal-flower'/>
      : <Flower className='w-full complete-svg stroke-current text-white' />
      }
      
      </div></div>
      { showBg && <BlackFade duartion={4000} from onDone={() => setShowBg(false)}/>}
  </Screen>
}

const Screen = ({className="bg-black text-white", children}) => {
return (<div className={`${className} h-full w-full font-buda text-xl flex items-center justify-center text-center`}>
  {children}
</div>)

}

function encode(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
}

const submitStore = (store) => {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "onboarding",
      ...store
    })
  })
}


function App() {
  const [store, setStore] = useState({})
  const [page, setPage ] = useState('name')

  if (isMobile) {
    return <Screen>Sorry this experience does not work on mobile</Screen>
  }
  return (
    <>
      { page === 'name' && <Screen><Name setStore={setStore} store={store} onSuccess={() => setPage('seek')}/></Screen>}
      { page === 'seek' && <Screen><Login setStore={setStore} store={store} onSuccess={() => {
        setPage('buddha')
        submitStore(store)
        }}/></Screen>}
      { page === 'buddha' && <Screen className='bg-white text-black'><Buddha store={store} onSuccess={() => setPage('deli')}/></Screen>}
      { page === 'deli' && <Screen className='bg-white text-black'><Deli onSuccess={() => setPage('game')}/></Screen>}
      { page === 'game' && <Screen className='bg-white text-black'><Game onSuccess={() => setPage('premap')}/></Screen>}
      { page === 'premap' && <Screen className='bg-white text-black'><Premap onSuccess={() => setPage('map')}/></Screen>}
      { page === 'map' && <Map onSuccess={() => setPage('info')}/>}
      { page === 'info' && <Announcement/>}
      <form className='hidden' data-netlify="true" name="onboarding"><input type="text" name="name"/><input type="text" name="seeking"/><input type="hidden" name="form-name" value="onboarding" /></form>
    </>
  );
}

export default App;
