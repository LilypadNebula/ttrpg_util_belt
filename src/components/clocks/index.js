import React from 'react'
import Segment from './segment'

export default class Clock extends React.Component {
  state = {
    clocks: [],
    newClockTitle: '',
    newClockVal: 4,
    possibleValues: {
      4: [1, 1, 1, 1],
      6: [1, 1, 1, 1, 1, 1],
      8: [1, 1, 1, 1, 1, 1, 1, 1],
      PbtA: [3, 3, 3, 1, 1, 1],
    },
  }

  componentDidMount() {
    const temp = JSON.parse(localStorage.getItem('clocks'))
    if (temp && temp.length > 0) this.setState({ clocks: temp })
  }

  saveClocks = newClocks => {
    this.setState({ clocks: newClocks })
    localStorage.setItem('clocks', JSON.stringify(newClocks))
  }

  newClock = async () => {
    if (this.state.newClockTitle.trim().length < 1) return
    let newClocks = this.state.clocks.concat({
      title: this.state.newClockTitle,
      vals: this.state.possibleValues[this.state.newClockVal],
      progress: 0,
      id: Math.floor(Math.random() * Math.random() * 1000),
    })
    this.saveClocks(newClocks)
    this.setState({
      newClockTitle: '',
      newClockVal: 4,
    })
  }

  updateClock = (id, progress) => {
    const newClocks = this.state.clocks.map(e => {
      if (e.id === id) e.progress = progress
      return e
    })
    this.saveClocks(newClocks)
  }

  deleteClock = id => {
    const newClocks = this.state.clocks.filter(clock => clock.id !== id)
    this.saveClocks(newClocks)
  }

  titleHandler = e => {
    if (e.target.value.length < 25)
      this.setState({ newClockTitle: e.target.value })
  }

  render() {
    return (
      <div className="font-kufi">
        <div className="flex flex-col md:flex-row">
          <label htmlFor="newClockTitle" className="flex flex-col m-2 text-2xl">
            Title - 25 character limit
            <input
              className="text-2xl p-2 border border-black rounded"
              type="text"
              id="newClockTitle"
              value={this.state.newClockTitle}
              onChange={this.titleHandler}
            />
          </label>

          <label htmlFor="newClockVals" className="flex flex-col m-2 text-2xl">
            Clock Length
            <select
              className="text-lg p-2 border border-black rounded text-2xl"
              value={this.state.newClockVal}
              onChange={e => this.setState({ newClockVal: e.target.value })}
            >
              {Object.keys(this.state.possibleValues).map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <button
            className="rounded p-2 text-2xl text-white bg-purple-light m-2"
            onClick={() => this.newClock()}
          >
            Create Clock
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          {this.state.clocks.map(clock => (
            <div
              className="flex flex-col items-center md:items-start my-4 md:w-1/2"
              key={clock.id}
            >
              <div className="flex justify-between mb-2 w-4/5 md:w-1/2">
                <p className="text-3xl">{clock.title}</p>
                <button
                  className="text-3xl px-2 py-1 bg-purple-light text-white rounded ml-5"
                  onClick={() => this.deleteClock(clock.id)}
                >
                  X
                </button>
              </div>
              <div className="flex w-full">
                {clock.vals.map((e, index) => (
                  <Segment
                    key={`${clock.id}-${index}`}
                    filled={clock.progress >= index + 1}
                    width={e * 8}
                    update={() => this.updateClock(clock.id, index + 1)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
