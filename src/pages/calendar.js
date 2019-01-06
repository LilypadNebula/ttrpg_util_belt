import React from 'react'

import SEO from '../components/seo'
import Calendar from '../components/calendar'

const CalendarPage = () => (
  <>
    <SEO title="Calendar" />
    <div className="container mx-auto">
      <Calendar />
    </div>
  </>
)

export default CalendarPage
