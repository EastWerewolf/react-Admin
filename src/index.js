import React from 'react';
import ReactDOM from 'react-dom';
import RouterLink from './router/router'
import {Provider} from 'mobx-react'
import Store from './store/store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider {...Store}>
        <RouterLink/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
