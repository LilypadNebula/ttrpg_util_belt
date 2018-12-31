import React from 'react'
import names from '../../assets/names'
import adj from '../../assets/adj'
import { random, capitalize } from 'lodash'

export default class Npc extends React.Component {
  state = {
    currentName: '',
    currentAdjList: ['', '', ''],
    currentNotes: '',
    currentId: '',
    npcList: [],
  }

  componentDidMount() {
    const temp = JSON.parse(localStorage.getItem('npcList'))
    if (temp && temp.length > 0) this.setState({ npcList: temp })
  }

  saveList = list => {
    this.setState({ npcList: list })
    localStorage.setItem('npcList', JSON.stringify(list))
  }

  setCurrent = npc => {
    this.setState({
      currentName: npc.name,
      currentAdjList: npc.adjList,
      currentNotes: npc.notes,
      currentId: npc.id,
    })
  }

  newNPC = () => {
    let name = capitalize(names[random(0, names.length)])
    let adjList = [1, 2, 3].map(e => capitalize(adj[random(0, adj.length)]))
    let newId = Math.floor(Math.random() * Math.random() * 1000)
    this.setState({
      currentName: name,
      currentAdjList: adjList,
      currentNotes: '',
      currentId: newId,
    })
  }

  saveNPC = () => {
    let exists = false
    const currentNPC = {
      name: this.state.currentName,
      adjList: this.state.currentAdjList,
      notes: this.state.currentNotes,
      id: this.state.currentId,
    }
    let newList = this.state.npcList.map(e => {
      if (e.id === this.state.currentId) {
        exists = true
        return currentNPC
      } else return e
    })
    if (!exists) newList.push(currentNPC)
    this.saveList(newList)
  }

  deleteNPC = (event, id) => {
    event.stopPropagation()
    const newList = this.state.npcList.filter(e => e.id !== id)
    this.saveList(newList)
  }

  changeAdj = (index, val) => {
    const temp = [...this.state.currentAdjList]
    temp[index] = val
    this.setState({ currentAdjList: temp })
  }

  render() {
    return (
      <div className="flex flex-col-reverse font-kufi xl:flex-row">
        <div
          className="xl:w-1/2 mx-2 lg:text-2xl items-center overflow-y-auto"
          style={{ maxHeight: '800px' }}
        >
          <div className="flex w-full border-b border-black">
            <div className="p-4 w-1/5">Name</div>
            <div className="p-4 w-3/5 border-l border-r border-black">
              Adjectives
            </div>
            <div className="p-4 w-1/5">Delete</div>
          </div>
          {this.state.npcList.map(e => (
            <div
              key={e.id}
              className={`flex w-full ${
                e.id === this.state.currentId
                  ? 'bg-purple-lighter text-white'
                  : ''
              }`}
              onClick={() => this.setCurrent(e)}
            >
              <div className="p-4 w-1/5">{e.name}</div>
              <div className="p-4 border-l border-r border-black w-3/5">
                {e.adjList.join(', ')}
              </div>
              <div className="p-4 text-center w-1/5">
                <button
                  className="border rounded border-black pt-1 px-1"
                  onClick={event => this.deleteNPC(event, e.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mx-4">
          <p className="text-2xl text-center self-center">
            Remember to hit Save NPC if you make any changes or generate an NPC,
            autosaving is not currently active
          </p>
          <label
            htmlFor="currentNPCName"
            className="flex flex-col text-2xl m-2"
          >
            Name:
            <input
              type="text"
              className="border border-black p-2 rounded"
              value={this.state.currentName}
              onChange={e => this.setState({ currentName: e.target.value })}
            />
          </label>
          <p className="text-xl m-2">Adjectives</p>
          <div className="flex flex-col xl:flex-row justify-between">
            <input
              type="text"
              className="border border-black text-xl p-2 rounded m-2"
              value={this.state.currentAdjList[0]}
              onChange={e => this.changeAdj(0, e.target.value)}
            />
            <input
              type="text"
              className="border border-black text-xl p-2 rounded m-2"
              value={this.state.currentAdjList[1]}
              onChange={e => this.changeAdj(1, e.target.value)}
            />
            <input
              type="text"
              className="border border-black text-xl p-2 rounded m-2"
              value={this.state.currentAdjList[2]}
              onChange={e => this.changeAdj(2, e.target.value)}
            />
          </div>
          <label
            htmlFor="currentNPCNotes"
            className="flex flex-col text-xl m-2"
          >
            Notes
            <textarea
              id="currentNPCNotes"
              className="border border-black rounded p-2"
              cols="30"
              rows="10"
              value={this.state.currentNotes}
              onChange={e => this.setState({ currentNotes: e.target.value })}
            />
          </label>
          <div className="flex justify-around mb-4">
            <button
              className="w-32 text-3xl p-4 text-white bg-purple rounded-lg"
              onClick={this.saveNPC}
            >
              Save NPC
            </button>
            <button
              className="w-32 text-3xl p-4 text-white bg-purple rounded-lg"
              onClick={this.newNPC}
            >
              New NPC
            </button>
          </div>
        </div>
      </div>
    )
  }
}
