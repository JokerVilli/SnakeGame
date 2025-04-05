import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SnakeGame from './SnakeGame.tsx'
import Grid from './Grid.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Grid /> */}
    
    <SnakeGame />
  </StrictMode>,
)
  