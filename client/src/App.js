import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './App.css'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/upload')
  }, [])
  return (
    <div className="App">
      <div>
        {/* asdsadsd */}
      </div>
    </div>
  )
}

export default App
