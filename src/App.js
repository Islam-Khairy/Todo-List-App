import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TodosProvider from './contexts/TodosContext';
import { ToastProvider } from './contexts/ToastContext';
import Footer from './components/Footer';

const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria'],
  },

  palette: {
    primary: {
      main: '#dd2c00',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className='App'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              direction: 'rtl',
            }}
          >
            <TodoList />
            <Footer />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;