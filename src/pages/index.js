import React from 'react'

import SEO from '../components/seo'

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1 className="text-center p-8 font-kufi">
      Hello! This is a site with several tools I've put together to hopefully
      help with your games. They're all free and open source if you want to see
      what's happening.
    </h1>
    <h1 className="text-center p-8 font-kufi">
      As of now, each tools saves to your device, so you can open them up and
      keep your data, but it won't persist between devices or if you clear your
      data.
    </h1>
    <h1 className="text-center p-8 font-kufi">
      I may work something into this to have an account and save it online so
      you can access the same data anywhere, but that's in the potential future
    </h1>
  </>
)

export default IndexPage
