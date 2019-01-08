import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default class NewCalModal extends React.Component {
  state = {
    newCalMonthName: '',
    newCalMonthDays: '',
    newCalWeekDayName: '',
    newCalStartAt: 2,
    newCalMonths: [],
    newCalWeekDays: [],
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

  addNewCalWeekday = () => {
    const newDays = this.state.newCalWeekDays.concat(
      this.state.newCalWeekDayName
    )
    this.setState({ newCalWeekDays: newDays, newCalWeekDayName: '' })
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

  shiftNewWeekdays = result => {
    if (!result.destination) {
      return
    }
    const newDays = Array.from(this.state.newCalWeekDays)
    const [toMove] = newDays.splice(result.source.index, 1)
    newDays.splice(result.destination.index, 0, toMove)
    this.setState({ newCalWeekDays: newDays })
  }

  render() {
    return (
      <div className="bg-shade fixed pin flex justify-center items-center">
        <div className=" rounded-none bg-white md:rounded flex flex-col">
          <header className="shadow">
            <p className="text-center text-2xl p-4">Create New Calendar</p>
          </header>
          <div className="flex flex-col p-8">
            <input
              type="text"
              className="border border-black rounded p-2 text-xl m-2 w-32 md:w-auto"
              value={this.state.newCalMonthName}
              onChange={e => this.setState({ newCalMonthName: e.target.value })}
            />
            <input
              type="number"
              className="border border-black rounded p-2 text-xl m-2 w-32 md:w-auto"
              value={this.state.newCalMonthDays}
              onChange={e => this.setState({ newCalMonthDays: e.target.value })}
            />
            <button
              className="my-2 mx-2 rounded p-2 bg-purple-light text-white"
              onClick={() => this.addNewCalMonth()}
            >
              Add Month
            </button>

            <DragDropContext onDragEnd={this.shiftNewMonths}>
              <Droppable droppableId="newMonths">
                {provided => (
                  <div
                    className="flex flex-col w-3/4 border border-black rounded p-4 w-64 mx-auto"
                    ref={provided.innerRef}
                  >
                    {this.state.newCalMonths.length < 1 ? (
                      <p className="text-2xl">
                        Months will appear as you add them
                      </p>
                    ) : (
                      this.state.newCalMonths.map((month, index) => (
                        <Draggable
                          key={month.id}
                          draggableId={month.id}
                          index={index}
                        >
                          {provided => (
                            <p
                              className="border border-purple rounded p-2 text-xl"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {month.name} - {month.days}
                            </p>
                          )}
                        </Draggable>
                      ))
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    )
  }
}

/* <div className="flex">
            <div className="flex flex-col">
              <input
                type="text"
                className="border border-black rounded p-2 text-xl m-2 w-32 md:w-auto"
                value={this.state.newCalWeekDayName}
                onChange={e =>
                  this.setState({ newCalWeekDayName: e.target.value })
                }
              />
              <button
                className="my-2 mx-2 rounded p-2 bg-purple-light text-white"
                onClick={() => this.addNewCalWeekday()}
              >
                Add Weekday
              </button>
            </div>

            {this.state.newCalWeekDays.length > 0 && (
              <DragDropContext onDragEnd={this.shiftNewWeekdays}>
                <Droppable droppableId="newWeekdays">
                  {provided => (
                    <div
                      className="flex flex-col w-3/4 border border-black rounded p-4 w-64 mx-auto"
                      ref={provided.innerRef}
                    >
                      Week Days
                      {this.state.newCalWeekDays.map((day, index) => (
                        <Draggable key={day} draggableId={day} index={index}>
                          {provided => (
                            <p
                              className="border border-purple rounded p-2 text-xl"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {day}
                            </p>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div> */
