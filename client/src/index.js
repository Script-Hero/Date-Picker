import React from 'react';
import ReactDOM from 'react-dom';
import Card from './components/card'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Card />, document.getElementById('root'));
registerServiceWorker();
