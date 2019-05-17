import Inspector from './components/Inspector';
import App from './App';
import Registry from './WidgetsRegistry';

Registry.add('status-board', 'Inspector', Inspector);

export { App, Registry };
