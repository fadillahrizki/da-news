import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout.jsx'
import Home from './screens/Home.jsx'
import Settings from './screens/Settings.jsx'
import Detail from './screens/Detail.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
    
  </BrowserRouter>
)
