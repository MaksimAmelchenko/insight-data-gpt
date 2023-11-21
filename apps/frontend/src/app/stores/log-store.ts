import { MainStore } from '../core/main-store';
import { ManageableStore } from '../core/manageable-store';
import { useStore } from '../core/hooks/use-store';

/**
 * This store is basically logs everything to somewhere (console, api etc.)
 */
export class LogStore extends ManageableStore {
  static storeName = 'Log';

  constructor(mainStore: MainStore, protected _debug: boolean) {
    super(mainStore);
  }

  // TODO: Send logs to somewhere

  log(message: string, ...args: any[]): void {
    if (this._debug) {
      console.log(message, ...args);
    }
  }

  fatal(e: Error): void {
    console.error(`Fatal error: `, e);
  }

  error(e: Error): void {
    if (this._debug) {
      console.error(`Error: `, e);
    }
  }

  clear(): void {}
}

/**
 * Obtain Log within the current context
 */
export function useLog() {
  return useStore(LogStore);
}
