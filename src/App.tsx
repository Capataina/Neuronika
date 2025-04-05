import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import MasonryBoard from './components/MasonryBoard/MasonryBoard'
import DynamicFolders from './components/DynamicFolders/DynamicFolders'
import InteractiveGraph from './components/InteractiveGraph/InteractiveGraph'
import { ThemeProvider } from "./components/ThemeProvider"
import { useViewStore } from './store/ViewStore'

function App() {
  const currentView = useViewStore((state) => state.currentView)

  const renderView = () => {
    switch (currentView) {
      case 'masonry':
        return <MasonryBoard />
      case 'folders':
        return <DynamicFolders />
      case 'graph':
        return <InteractiveGraph />
      default:
        return <MasonryBoard />
    }
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="app-container">
        <div className="menu-container">
          <MenuBar />
        </div>
        <div className="board-container">
          {renderView()}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
