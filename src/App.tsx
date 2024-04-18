import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import Router from './router/router';
import SuccessSnackbar from './components/CustomSnackbar/SuccessSnackbar';
import ErrorSnackbar from './components/CustomSnackbar/ErrorSnackbar';

type AnchorOrigin = SnackbarOrigin;
const customAnchorOrigin: AnchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};
declare module "notistack" {
  interface VariantOverrides {
    successSnackbar: true;
    errorSnackbar: {         
      errorDetailMessage: string  
    }
  }
}



function App() {
  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={customAnchorOrigin}
        Components={{
          successSnackbar: SuccessSnackbar,
          errorSnackbar: ErrorSnackbar
        }}>
        <Router />
      </SnackbarProvider>
    </div>
  );
}

export default App;
