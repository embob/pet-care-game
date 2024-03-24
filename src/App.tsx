import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { Clock } from './components/Clock'
import { addMinutes } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFastForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

const PAUSE = 0
const NORMAL = 650
const FAST_FORWARD = 100

// TODO: abstract this out to a separate component
const Button = ({ currentSpeed, speed, setSpeed, icon }: {currentSpeed: number, speed: number, setSpeed: Dispatch<SetStateAction<number>>, icon: FontAwesomeIconProps['icon'] }) => (
  <button
    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"}
    disabled={currentSpeed === speed}
    type='button'
    onClick={() => setSpeed(speed)}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
)

function App() {


  const [time, setTime] = useState(new Date())
  const [intervalTime, setIntervalTime] = useState(650)

  useEffect(() => {
    if (intervalTime === 0) return
    const timer = setInterval(() => {
      setTime(prevTime => addMinutes(prevTime, 1))
    }, intervalTime)

    return () => clearInterval(timer)
  }, [intervalTime])

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-4 items-center'>
        <Clock value={time}/>
        <div className='flex gap-2'>
        <Button currentSpeed={intervalTime} speed={PAUSE} setSpeed={setIntervalTime} icon={faPause}/>
        <Button currentSpeed={intervalTime} speed={NORMAL} setSpeed={setIntervalTime} icon={faPlay}/>
        <Button currentSpeed={intervalTime} speed={FAST_FORWARD} setSpeed={setIntervalTime} icon={faFastForward}/>
        </div>
      </div>
    </div>
  )
}

export default App
