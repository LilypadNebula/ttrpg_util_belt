import React, { Component } from 'react'
import { styler, decay, listen, pointer, value } from 'popmotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { range } from 'lodash'
import 'chartist/dist/chartist.min.css'
import '../layouts/chart.css'

//Variable to hold document listener, to unsubscribe in componentWillUnmount
let spinStart
let spinEnd
let decayer

class SpinnerPage extends Component {
  spinRef = React.createRef()
  chartRef = React.createRef()
  state = {
    result: 'Not spun',
    newVal: '',
    seriesLength: 8,
    chart: null,
  }
  newSpinnerValue = () => {
    if (this.state.newVal > 15) return
    const length = range(this.state.newVal)
    const newData = { series: [], labels: [] }
    length.forEach(e => {
      newData.series.push(1)
      newData.labels.push(e + 1)
    })
    this.setState({ seriesLength: newData.series.length })
    this.state.chart.update(newData)
  }

  componentDidMount() {
    const Chartist = require('chartist')
    this.setState({
      chart: new Chartist.Pie(
        this.chartRef.current,
        {
          series: [1, 1, 1, 1, 1, 1, 1, 1],
          labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        },
        {
          labelOffset: 30,
        }
      ),
    })

    const spinStyler = styler(this.spinRef.current)
    const rotation = value(0, spinStyler.set('rotate'))

    spinStart = listen(this.spinRef.current, 'mousedown touchstart').start(
      () => {
        pointer({ x: rotation.get() })
          .pipe(({ x }) => x)
          .start(rotation)
      }
    )

    spinEnd = listen(document, 'mouseup touchend').start(() => {
      if (rotation.getVelocity() !== 0) this.setState({ result: 'Spinning!' })
      rotation.subscribe({
        update: v => {},
        complete: () => {
          if (rotation.get() !== 0) {
            this.setState({
              result: Math.ceil(
                rotation.get() / (360 / this.state.seriesLength)
              ),
            })
          }
        },
      })
      decayer = decay({
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
    spinStart.stop()
    spinEnd.stop()
    decayer.stop()
  }
  render() {
    return (
      <div className="w-full">
        <div className="w-full md:w-1/2 mx-auto flex justify-center items-center">
          <div
            ref={this.spinRef}
            className="text-sm md:text-2xl absolute z-50 text-purple-dark"
          >
            <FontAwesomeIcon icon={faLongArrowAltUp} size="10x" />
          </div>
          <div
            ref={this.chartRef}
            className="ct-chart ct-perfect-fifth flex justify-center items-center"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="my-8 text-5xl md:text-realBig">{this.state.result}</p>
          <input
            type="number"
            className="p-2 border-black rounded border text-2xl"
            value={this.state.newVal}
            onChange={e => this.setState({ newVal: e.target.value })}
          />
          <button
            className="bg-purple-light rounded p-4 text-2xl text-white my-4"
            onClick={this.newSpinnerValue}
          >
            Set Spinner
          </button>
        </div>
      </div>
    )
  }
}

export default SpinnerPage
