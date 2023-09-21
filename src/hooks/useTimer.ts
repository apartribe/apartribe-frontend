import { useState, useEffect } from 'react'

export const useTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0)
  const minutes = String(Math.floor((secondsLeft / 60) % 60)).padStart(2, '0')
  const seconds = String(Math.floor(secondsLeft % 60)).padStart(2, '0')
  const formattedTimeLeft = `${minutes} : ${seconds}`

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timeout = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timeout)
  }, [secondsLeft])

  const startTimer = (seconds: number) => {
    setSecondsLeft(seconds)
  }

  return { startTimer, secondsLeft, formattedTimeLeft }
}
