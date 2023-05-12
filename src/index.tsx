import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import GlobalStyles from './components/GlobalStyles';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ContextProvider from './utils/context/ContextPropvider';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';

const container = document.getElementById('root')!;

const root = createRoot(container);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <ContextProvider>
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <GlobalStyles Children={App} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ChakraProvider>
        </ContextProvider>
    </Provider>,
    // </React.StrictMode>,
);
