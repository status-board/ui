import StatusBoard from './App';
import Registry from './WidgetsRegistry';
import Inspector from './components/Inspector';

Registry.add('status-board', 'Inspector', Inspector);

export { Registry };

export default StatusBoard;
