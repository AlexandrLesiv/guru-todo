import ReactDOM from 'react-dom';
import { App } from './views/app'

export const runApp = () => {

  ReactDOM.render(<App />, document.getElementById('app') as HTMLElement);
}
