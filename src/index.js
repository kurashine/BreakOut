import React from 'react'
import { createRoot } from 'react-dom/client';


import './index.css'
import Page from './components/page'
import * as serviceWorker from './serviceWorker'

createRoot(document.getElementById('root')).render(<Page />);


serviceWorker.unregister();
