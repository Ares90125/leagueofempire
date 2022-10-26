import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import Routes from "@routes";
import store from "@store";
import Web3Provider from "@store/providers/Web3Provider";
import WrapperProvider from "@store/providers/Wrapper";
import theme from "@themes";

function App() {
  return (
    <Provider store={store}>
      <Web3Provider>
        <WrapperProvider>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </WrapperProvider>
      </Web3Provider>
    </Provider>
  );
}

export default App;
