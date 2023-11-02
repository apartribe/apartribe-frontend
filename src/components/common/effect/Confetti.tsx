import { useCallback, useEffect, useRef } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { type IProps } from 'react-canvas-confetti'

// instance 타입이 공식적으로 제공되지 않음.
// reference : https://stackoverflow.com/questions/74478737/how-to-solve-type-htmlcanvaselement-has-no-call-signatures-ts2349-for-react
type CreateConfetti = NonNullable<Parameters<NonNullable<IProps['refConfetti']>>[0]>

interface Opts {
  spread?: number
  startVelocity?: number
  decay?: number
  scalar?: number
  origin?: { y: number }
  particleCount?: number
}

export default function Confetti() {
  const refAnimationInstance = useRef<CreateConfetti | null>(null)

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio: number, opts: Opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  useEffect(() => fire(), [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    />
  )
}
