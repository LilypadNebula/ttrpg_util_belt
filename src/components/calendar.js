import React from 'react'
import { range, delay } from 'lodash'
import posed from 'react-pose'

const FadeDiv = posed.div({
  in: { opacity: 1, transition: { duration: 500 } },
  out: { opacity: 0, transition: { duration: 500 } },
})

class Calendar extends React.Component {
  state = {
    currentMonths: [
      { name: 'January', days: 31, startAt: 2 },
      { name: 'February', days: 28, startAt: 5 },
      { name: 'March', days: 31, startAt: 5 },
      { name: 'April', days: 30, startAt: 1 },
      { name: 'May', days: 31, startAt: 3 },
      { name: 'June', days: 30, startAt: 6 },
      { name: 'July', days: 31, startAt: 1 },
      { name: 'August', days: 31, startAt: 4 },
      { name: 'September', days: 30, startAt: 0 },
      { name: 'October', days: 31, startAt: 2 },
      { name: 'November', days: 30, startAt: 5 },
      { name: 'December', days: 31, startAt: 0 },
    ],
    currentWeekDays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    currentEventList: [{ name: 'New Years Day', month: 'January', day: 1 }],
    selectedMonthIndex: 0,
    changing: false,
    newCalMonthName: '',
    newCalMonthDays: '',
    newCalStartAt: 2,
    newCalMonths: [],
  }

  changeMonth = async index => {
    if (index === this.state.selectedMonthIndex) return
    this.setState({ changing: true })
    delay(
      () => this.setState({ changing: false, selectedMonthIndex: index }),
      700
    )
  }

  addNewCalMonth = () => {
    const newMonths = this.state.newCalMonths.concat({
      name: this.state.newCalMonthName,
      days: this.state.newCalMonthDays,
      id: Math.floor(Math.random() * Math.random() * 1000),
    })
    this.setState({
      newCalMonths: newMonths,
      newCalMonthName: '',
      newCalMonthDays: '',
    })
  }

  createCal = () => {
    let startAt = this.state.newCalStartAt
    const newCalendar = this.state.newCalMonths.map(month => {
      month.startAt = startAt
      startAt = startAt + (month.days % 7)
      if (startAt > 7) startAt = startAt - 7
      return month
    })
    this.setState({ currentMonths: newCalendar })
    delay(
      () =>
        console.log(
          range(this.state.currentMonths[this.state.selectedMonthIndex].days)
        ),
      3000
    )
  }

  shiftNewMonths = result => {
    if (!result.destination) {
      return
    }
    const newMonths = Array.from(this.state.newCalMonths)
    const [toMove] = newMonths.splice(result.source.index, 1)
    newMonths.splice(result.destination.index, 0, toMove)
    this.setState({ newCalMonths: newMonths })
  }

  render() {
    return (
      <div className="flex flex-col font-sans">
        <div>
          {this.state.currentMonths.map((month, index) => (
            <button
              className="p-2 m-2 text-white rounded bg-purple-light"
              key={month.name}
              onClick={() => this.changeMonth(index)}
            >
              {month.name}
            </button>
          ))}
        </div>
        <FadeDiv
          className="border border-black my-8 mx-4 p-4 pr-1 rounded shadow-lg"
          pose={this.state.changing ? 'out' : 'in'}
        >
          <p className="text-center mt-2 mb-8 font-bold text-4xl">
            {this.state.currentMonths[this.state.selectedMonthIndex].name}
          </p>
          <div className="flex flex-wrap mb-2">
            {this.state.currentWeekDays.map(day => (
              <div
                style={{ width: `${(1 / 7) * 100}%` }}
                className="-m-px text-center truncate"
                key={day}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap">
            {range(
              this.state.currentMonths[this.state.selectedMonthIndex].startAt
            ).map(num => (
              <div
                key={`spacer--${num}`}
                className="-m-px"
                style={{ width: `${(1 / 7) * 100}%` }}
              />
            ))}
            {range(
              this.state.currentMonths[this.state.selectedMonthIndex].days
            ).map(day => (
              <div
                style={{ width: `${(1 / 7) * 100}%` }}
                className="h-24 border-2 border-black -m-px text-right p-1"
                key={day}
              >
                <p>{day + 1}</p>
              </div>
            ))}
          </div>
        </FadeDiv>
      </div>
    )
  }
}

export default Calendar
