import React, { useState, useRef, useEffect } from 'react'
import styles from './index.scss'

const Slider = props => {
  const {
    width = 560,
    height = 40,
    borderRadius = 40,
    tipText,
    handleSuccess = () => {},
  } = props

  const mouseDown = useRef(false)
  const startPosition = useRef(0)
  const mousePosition = useRef(0)
  const maxMoveLength = useRef(width - 56)
  const isSuccess = useRef(false)
  const [isMouseEnter, setMouseEnter] = useState(false)
  const [diff, setDiff] = useState(0)

  const renderIcon = () => {
    return <img className={styles.icon} src="/assets/ksLogo.svg" />
  }

  const handleMouseEnter = () => {
    if (isSuccess.current || mouseDown.current) {
      return
    }
    setMouseEnter(true)
    setDiff(0)
  }

  const handleMouseLeave = () => {
    if (isSuccess.current || mouseDown.current) {
      return
    }
    setMouseEnter(false)
  }

  const handleMouseDown = e => {
    if (isSuccess.current) {
      return
    }
    startPosition.current = e.nativeEvent.x || e.touches[0].clientX
    mouseDown.current = true
  }

  const handleMouseUp = () => {
    if (isSuccess.current) {
      return
    }
    mouseDown.current = false
    setMouseEnter(true)
    setDiff(0)
  }

  const handleMouseMove = e => {
    if (!mouseDown.current || isSuccess.current) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    mousePosition.current = e.x
    let _diff = mousePosition.current - startPosition.current
    if (_diff < 0) {
      _diff = 0
    }

    if (_diff >= maxMoveLength.current) {
      _diff = maxMoveLength.current
      setDiff(_diff)
      isSuccess.current = true
      handleSuccess && handleSuccess()
      return
    }

    setDiff(_diff)
  }

  useEffect(() => {
    document.body.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.body.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const sliderBoxStyle = {
    borderRadius,
    opacity: isMouseEnter && diff / maxMoveLength.current,
    width: 56 + diff,
    transitionDuration: !isMouseEnter || !mouseDown.current ? '.3s' : '0s',
  }

  const sliderStyle = {
    borderRadius,
    height: height - 8,
    transitionDuration: !isMouseEnter || !mouseDown.current ? '.3s' : '0s',
    transform: `translateX(${diff}px)`,
  }

  const tipStyle = {
    color: `rgb(${121 + (255 - 121) * (diff / maxMoveLength.current)},
    ${135 + (255 - 135) * (diff / maxMoveLength.current)},
    ${156 + (255 - 156) * (diff / maxMoveLength.current)})`,
  }

  return (
    <div className={styles.content} style={{ width }}>
      <div className={styles.background} style={{ borderRadius }}>
        <span style={tipStyle}>{tipText}</span>
      </div>
      <div className={styles.sliderBox} style={sliderBoxStyle}></div>
      <div
        style={sliderStyle}
        className={styles.slider}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {renderIcon()}
      </div>
    </div>
  )
}

export default Slider
