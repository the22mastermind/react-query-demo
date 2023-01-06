import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HomePage } from './components/Home.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { Root } from './routes/root'
import { ErrorPage } from './Error.page'
import './App.css';
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelPage } from './components/DynamicParallel.page'
import { DependentQueriesPage } from './components/DependentQueries.page'
import { PaginatedQueriesPage } from './components/PaginatedQueries.page'
import { InfiniteQueriesPage } from './components/InfiniteQueries.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'super-heroes',
        element: <SuperHeroesPage />,
      },
      {
        path: 'rq-super-heroes',
        element: <RQSuperHeroesPage />,
      },
      {
        path: 'rq-super-heroes/:heroId',
        element: <RQSuperHeroPage />,
      },
      {
        path: 'rq-parallel',
        element: <ParallelQueriesPage />,
      },
      {
        path: 'rq-dynamic-parallel',
        element: <DynamicParallelPage heroIds={[1, 3]} />,
      },
      {
        path: 'rq-dependent',
        element: <DependentQueriesPage email='hello@example.com' />,
      },
      {
        path: 'rq-paginated',
        element: <PaginatedQueriesPage />,
      },
      {
        path: 'rq-infinite',
        element: <InfiniteQueriesPage />,
      },
    ]
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
