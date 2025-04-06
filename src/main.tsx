import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SnakeGame from './components/snake-game/SnakeGame.tsx'
import Grid from './components/grid/Grid.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Grid /> */}
    
    <SnakeGame />
  </StrictMode>,
)
  