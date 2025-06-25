import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import routeConfig from './components/routes/routeConfig'

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
        <Routes >
          {routeConfig.map((item, index) => (
            <Route key={index} path={item.path} element={item.element}>
              {item.children && item.children.map((child, childIndex) => (
                <React.Fragment key={childIndex}>
                  <Route path={child.path} element={child.element} />
                </React.Fragment>
              ))}
            </Route>
          ))}
        </Routes>
    </BrowserRouter>
  )
}

export default App
