import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import { GroomerSchedulerPage } from './pages/GroomerSchedulerPage';
import { GroomerOnboardPage } from './pages/GroomerOnboardPage';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-background">
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GroomerSchedulerPage,
});

const groomerOnboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groomer-onboard',
  component: GroomerOnboardPage,
});

const routeTree = rootRoute.addChildren([indexRoute, groomerOnboardRoute]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
