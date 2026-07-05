import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

/* 
  Punto de entrada de Kalamar.
  Esto es lo primero que se ejecuta. Toma el div <div id="root"> del index.html
  y mete la app completa ahí dentro.
  No toques esto a menos que sepas lo que haces.
*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
