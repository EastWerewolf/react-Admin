import React from 'react';
import ReactDOM from 'react-dom';
import RouterLink from './Router/router'
import {Provider} from 'mobx-react'
import Store from './Store/store'
import registerServiceWorker from './registerServiceWorker';
//Mock数据  全局注入
if(process.env.NODE_ENV!=='production')import('./mock/data.js');

ReactDOM.render(
    <Provider {...Store}>
        <RouterLink/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
