import '../styles/globals.css';
import '../styles/login.css';
import '../styles/dashboard.css'
import '../styles/studentList.css'
import '../styles/modal.css'

import type {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
