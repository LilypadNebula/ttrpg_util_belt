import React, { Component } from 'react'
import { styler, decay, listen, pointer, value } from 'popmotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'

//Variable to hold document listener, to unsubscribe in componentWillUnmount
let subscriber = null

class SpinnerPage extends Component {
  spinRef = React.createRef()
  pageRef = React.createRef()
  state = {
    result: 'Not spun',
  }

  componentDidMount() {
    const spinStyler = styler(this.spinRef.current)
    const rotation = value(0, spinStyler.set('rotate'))

    listen(this.spinRef.current, 'mousedown touchstart').start(() => {
      pointer({ x: rotation.get() })
        .pipe(({ x }) => x)
        .start(rotation)
    })

    subscriber = listen(document, 'mouseup touchend').start(() => {
      this.setState({ result: 'Spinning' })
      rotation.subscribe({
        update: v => {},
        complete: () =>
          this.setState({ result: Math.ceil(rotation.get() / 90) }),
      })
      decay({
        from: rotation.get(),
        velocity: rotation.getVelocity(),
        timeConstant: 700,
        restDelta: 0.25,
        modifyTarget: v => {
          const absolute = Math.abs(v)
          if (absolute < 360) {
            if (v < 0) return 360 - absolute
            return absolute
          }
          let cycles = Math.floor(absolute / 360)
          let finish = Math.floor(absolute - 360 * cycles)
          return finish
        },
      }).start(rotation)
    })
  }
  componentWillUnmount() {
    subscriber.stop()
  }
  render() {
    return (
      <div
        className="flex justify-center items-center flex-col"
        ref={this.pageRef}
      >
        <div className="rounded-full border-4 border-black relative flex flex-wrap h-80 w-80 md:w-realBig md:h-realBig">
          <div
            ref={this.spinRef}
            className="absolute pin flex justify-center items-center md:text-2xl"
          >
            <FontAwesomeIcon icon={faLongArrowAltUp} size="10x" />
          </div>
          <div
            className="rounded-tl-full border-r border-b border-black flex justify-center items-center"
            style={{ height: '50%', width: '50%' }}
          >
            4
          </div>
          <div
            className="rounded-tr-full border-b border-black flex justify-center items-center"
            style={{ height: '50%', width: '50%' }}
          >
            1
          </div>
          <div
            className="rounded-bl-full border-r border-black flex justify-center items-center"
            style={{ height: '50%', width: '50%' }}
          >
            3
          </div>
          <div
            className="rounded-br-full flex justify-center items-center"
            style={{ height: '50%', width: '50%' }}
          >
            2
          </div>
        </div>
        <p className="my-8 text-5xl md:text-realBig">{this.state.result}</p>
      </div>
    )
  }
}

export default SpinnerPage
