import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    background: {
      default: '#f5f5f5',
    },
  },
  zIndex: {
    modal: 1200,
  },
});

export default theme;
