import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

import store from 'store/store';
import Application from './Application';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <Application />
            </Provider>
        </HashRouter>
    </React.StrictMode>,
);
