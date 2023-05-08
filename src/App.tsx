import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ChangeLanguageButton from './components/ChangeLanguageButton/ChangeLanguageButton';
import Container from './components/Container/Container';
import Logo from './components/Logo/Logo';
import Router from './router/Router';
import './lib/i18n';
import './App.css';

const queryClient = new QueryClient();

class App extends React.Component {
  public render() {
    return (
      <QueryClientProvider client={queryClient}>
        <Container>
          <nav>
            <Logo />
            <ChangeLanguageButton />
          </nav>
          <Router />
        </Container>
        <ReactQueryDevtools />
      </QueryClientProvider>
    );
  }
}

export default App;
