import { useState, useRef } from 'react'
import ResultModal from './ResultModal'
export default function TimerChallenge({ title, targetTime }) {
  // const [timerStarted, setTimerStarted] = useState(false)
  // const [timeExpired, setTimeExpired] = useState(false)
  const [timeRemaining, setRemainingTime] = useState(targetTime * 1000)
  const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  const timer = useRef()
  const dialog = useRef()

  if (timeRemaining <= 0) {
    clearInterval(timer.current)
    dialog.current.open()
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000)
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setRemainingTime((prevValue) => prevValue - 10)
    }, 10)
    // dialog.current.open()

    // setTimerStarted(true)
  }

  const handleStop = () => {
    // clearTimeout(timer.current)
    dialog.current.open()
    clearInterval(timer.current)
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? 'Stop' : 'Start'} challenge
          </button>
        </p>
        <p className={timerActive ? 'active' : undefined}>
          {timerActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}
