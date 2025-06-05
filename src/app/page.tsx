import Desktop from '@/components/desktop/Desktop';
import { WindowManagerProvider } from '@/contexts/WindowManagerContext';

export default function HomePage() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}
