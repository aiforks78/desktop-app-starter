import { dialog, BrowserWindow } from 'electron';
import { fsService } from '../services/fs-service';
import type { DialogOpenFileRequest, DialogOpenFileResponse } from '@shared/ipc/types';

export async function handleDialogOpenFile(
  event: Electron.IpcMainInvokeEvent,
  data?: DialogOpenFileRequest
): Promise<DialogOpenFileResponse> {
  try {
    const win = BrowserWindow.fromWebContents(event.sender);
    const properties: Electron.OpenDialogOptions['properties'] = [
      data?.directory ? 'openDirectory' : 'openFile',
    ];

    if (data?.multiSelections) {
      properties.push('multiSelections');
    }

    const result = await dialog.showOpenDialog(win!, {
      title: data?.title ?? (data?.directory ? 'Choose Folder' : 'Open File'),
      filters: data?.filters,
      properties,
    });

    if (!result.canceled) {
      for (const p of result.filePaths) fsService.bless(p);
    }

    return {
      filePaths: result.filePaths,
      canceled: result.canceled,
    };
  } catch (_err) {
    return { filePaths: [], canceled: true };
  }
}
