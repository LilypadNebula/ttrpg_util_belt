import React from 'react'

import SEO from '../components/seo'
import Clocks from '../components/clocks'

const ClocksPage = () => (
  <>
    <SEO title="Clocks" />
    <div className="container mx-auto">
      <Clocks />
    </div>
  </>
)

export default ClocksPage
