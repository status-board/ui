import { connect } from 'react-redux';
import { Themes } from '@status-board/theme-manager/lib/types';

import ThemeProvider from '../components/ThemeProvider';

const mapStateToProps = (
    { themes: { themes, current } }: { themes: { themes: Themes; current: string } },
) => ({ themes, current });

export default connect(mapStateToProps)(ThemeProvider);
