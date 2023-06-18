import './App.css'
import useRouterElement from './hooks/useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
function App() {
  const routerElemnts = useRouterElement()
  return (
    <div>
      {routerElemnts}
      <ToastContainer />
    </div>
  )
}

export default App
