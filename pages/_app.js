import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />

    </Provider>
  )
}

export default MyApp
