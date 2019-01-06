import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default () => (
  <div className="flex mx-auto">
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
  </div>
)
{
  this.state.newCalMonths.length > 0 && (
    <DragDropContext onDragEnd={this.shiftNewMonths}>
      <Droppable droppableId="newMonths">
        {provided => (
          <div
            className="flex flex-col border border-black rounded p-4 w-64 mx-auto"
            ref={provided.innerRef}
          >
            Months
            {this.state.newCalMonths.map((month, index) => (
              <Draggable key={month.id} draggableId={month.id} index={index}>
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
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
