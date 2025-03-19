import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import MasonryBoard from './components/MasonryBoard/MasonryBoard'
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="app-container">
        <div className="menu-container">
          <MenuBar />
        </div>
        <div className="board-container">
          <MasonryBoard />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
