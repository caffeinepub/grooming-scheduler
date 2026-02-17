import { GroomerSchedulerPage } from './pages/GroomerSchedulerPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <GroomerSchedulerPage />
      </div>
      <Toaster />
    </>
  );
}

export default App;
