import { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const [len,setlen] = useState(8);
  const [numAllowed,setnumAllowed] = useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const [password,setpassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numAllowed) str+= '0123456789'
    if(charAllowed) str+= '!@#$%&*~_'

    for(let i=1; i<=len; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setpassword(pass)

  },[len,numAllowed,charAllowed,setpassword])

  const copy = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  }, [len,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md h-100
    rounded-lg px-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-3 '>Password Generator</h1>
    <div className='"flex-1 flex-wrap shadow rounded-lg overflow-hidden mb-4'>

      <input 
      type='text'
      value={password}
      className=' outline-none w-full py-2 px-3 my-6 mx-2-4 rounded-lg'
      placeholder='password'
      readOnly
      ref={passwordRef}
      />

      <button
      className='outline-none bg-blue-700 text-white
      px-3 py-0.5 shrink-0 rounded-lg'
      onClick={copy}>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-7 py-4'>
        <input
        type='range'
        min={6}
        max={100}
        value={len}
        className='cursor-pointer'
        onChange={(e)=>{setlen(e.target.value)}}/>
        <label>Length : {len}</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input 
        type='checkbox'
        defaultChecked={numAllowed}
        id='numberInput'
        onChange={()=>{
          setnumAllowed((prev)=> !prev)
        }}/>
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input 
        type='checkbox'
        defaultChecked={charAllowed}
        id='charInput'
        onChange={()=>{
          setcharAllowed((prev)=> !prev)
        }}/>
        <label htmlFor='charInput'>Character</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
