'use client';

import { useEffect } from 'react';

/**
 * NotebookInitializer invokes the global initializeNotebook function
 * strictly after React hydration is complete.
 */
export default function NotebookInitializer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let attempts = 0;
    const checkAndInit = () => {
      const isReady = (window as any).initializeNotebook && (window as any).CodeMirror;
      if (isReady) {
        console.log('[Notebook] All scripts loaded. Initializing CodeMirror & Pyodide state...');
        (window as any).initializeNotebook();
      } else {
        attempts++;
        if (attempts < 100) { // Poll for up to 10 seconds (100 * 100ms)
          setTimeout(checkAndInit, 100);
        } else {
          console.error('[Notebook] Failed to initialize: CodeMirror or initializeNotebook did not load.');
          const statusEl = document.getElementById('pyStatus');
          if (statusEl) {
            statusEl.textContent = '❌ Failed to load editor. Please check your connection and refresh.';
          }
        }
      }
    };

    // Begin polling
    const timeout = setTimeout(checkAndInit, 100);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
