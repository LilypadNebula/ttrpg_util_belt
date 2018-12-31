import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div className="bg-purple-dark mb-2 font-kufi text-2xl">
    <div className="p-6 flex justify-between items-center text-white">
      <h1>
        <Link className="no-underline text-white" to="/">
          {siteTitle}
        </Link>
      </h1>
      <h2>
        <Link
          className="no-underline mx-2 text-white"
          style={{ transition: '.5s color' }}
          activeStyle={{ color: 'black' }}
          to="/clocks/"
        >
          Clocks
        </Link>
        <Link
          activeStyle={{ color: 'black' }}
          className="no-underline mx-2 text-white"
          style={{ transition: '.5s color' }}
          to="/npc/"
        >
          NPC
        </Link>
      </h2>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
