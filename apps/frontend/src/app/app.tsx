// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Button } from '@chat/ui-kit';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <NxWelcome title="frontend" />
      <Button variant="destructive">Button</Button>
    </div>
  );
}

export default App;
