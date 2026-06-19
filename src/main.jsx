import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/AuthContext'
import CartContext from './context/CartContext'

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <AuthContext>
        <CartContext>
            <App /> <Toaster />
        </CartContext>
    </AuthContext>)
