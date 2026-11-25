export interface FileDialogFilter {
  name: string;
  extensions: string[];
}

export function isTauriRuntime(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

/**
 * Saves text or binary data using native Tauri OS Save dialog when running in desktop mode,
 * or falls back to standard browser Blob download.
 */
export async function saveFileNativeOrBrowser(
  filename: string,
  content: string | Blob,
  filters?: FileDialogFilter[]
): Promise<boolean> {
  if (isTauriRuntime()) {
    const [{ save }, { writeFile, writeTextFile }] = await Promise.all([
      import('@tauri-apps/plugin-dialog'),
      import('@tauri-apps/plugin-fs'),
    ]);
    const targetPath = await save({
      defaultPath: filename,
      filters,
    });
    if (!targetPath) return false;

    if (typeof content === 'string') {
      await writeTextFile(targetPath, content);
    } else {
      const buffer = await content.arrayBuffer();
      await writeFile(targetPath, new Uint8Array(buffer));
    }
    return true;
  }

  const blob = typeof content === 'string' ? new Blob([content], { type: 'text/plain;charset=utf-8' }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

export interface OpenedFileResult {
  name: string;
  text?: string;
  bytes?: Uint8Array;
}

/**
 * Opens a native OS Open File dialog in Tauri mode and returns text or binary content
 * depending on file extension (.rsf -> binary Uint8Array, otherwise text).
 * Returns null if cancelled or if not running in Tauri.
 */
export async function openProjectFileNative(filters?: FileDialogFilter[]): Promise<OpenedFileResult | null> {
  if (!isTauriRuntime()) return null;

  const [{ open }, { readFile, readTextFile }] = await Promise.all([
    import('@tauri-apps/plugin-dialog'),
    import('@tauri-apps/plugin-fs'),
  ]);
  const selected = await open({
    multiple: false,
    filters,
  });
  if (!selected || Array.isArray(selected)) return null;

  const name = selected.split(/[/\\]/).pop() || selected;
  if (name.toLowerCase().endsWith('.rsf')) {
    const bytes = await readFile(selected);
    return { name, bytes };
  }
  const text = await readTextFile(selected);
  return { name, text };
}
