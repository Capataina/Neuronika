import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import MasonryBoard from './components/MasonryBoard/MasonryBoard'

function App() {
  return (
    <div className="app-container">
      <div className="menu-container">
        <MenuBar />
      </div>
      <div className="board-container">
        <MasonryBoard />
      </div>
    </div>
  )
}

export default App
