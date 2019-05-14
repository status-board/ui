import { connect } from 'react-redux';
import ThemeProvider from '../components/ThemeProvider';

const mapStateToProps = (
    { themes: { themes, current } }: { themes: { themes: any; current: any } },
) => ({ themes, current });

export default connect(mapStateToProps)(ThemeProvider);
