import React from 'react'
import posed, { PoseGroup } from 'react-pose'

const Transition = posed.div({
  enter: { opacity: 1, delay: 500 },
  exit: { opacity: 0 },
})

export const replaceComponentRenderer = ({ props, ...other }) => {
  const { component } = props.pageResources
  return (
    <PoseGroup>
      <Transition key={props.location.key}>
        {React.createElement(component, props)}
      </Transition>
    </PoseGroup>
  )
}
