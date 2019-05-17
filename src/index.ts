import Inspector from './components/Inspector';
import Registry from './WidgetsRegistry';

Registry.add('status-board', 'Inspector', Inspector);

export { default as App } from './App';
export { Registry };
