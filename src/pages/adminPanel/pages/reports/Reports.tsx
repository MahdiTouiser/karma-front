import { useState, useEffect } from 'react'
import ReportsCard from './ReportsCard'
import { useLocation } from 'react-router-dom'
import TicketsReport from './TicketsReport'

const Reports = () => {
  const [showGrid, setShowGrid] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setShowGrid(location.pathname === '/admin/reports/tickets')
  }, [location.pathname])

  return (
    <>
      {location.pathname === '/admin/reports' && (
        <div className="my-3 w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
          <ReportsCard onClick={() => setShowGrid(true)} />
        </div>
      )}
      {showGrid && <TicketsReport />}
    </>
  )
}

export default Reports
