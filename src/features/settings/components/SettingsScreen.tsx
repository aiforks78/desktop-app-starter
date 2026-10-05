import { useState, useEffect } from 'react';
import { Panel, Button, Modal } from '@shared/components';
import type { AppGetInfoResponse, ThemePreference } from '@shared/ipc/types';
import type { AppSettings } from '@shared/validation/settings-schema';
import { useTheme } from '@renderer/contexts/ThemeContext';
import { useSetting } from '@renderer/hooks/useSetting';
import { SettingsForm } from './SettingsForm';

const themeColors = [
  { name: 'Deep', var: '--color-app-deep', hex: '#131316' },
  { name: 'Base', var: '--color-app-base', hex: '#1a1a1e' },
  { name: 'Surface', var: '--color-app-surface', hex: '#222226' },
  { name: 'Hover', var: '--color-app-hover', hex: '#2a2a2e' },
  { name: 'Accent', var: '--color-accent', hex: '#7F77DD' },
  { name: 'Green', var: '--color-accent-green', hex: '#5DCAA5' },
  { name: 'Amber', var: '--color-accent-amber', hex: '#EF9F27' },
  { name: 'Red', var: '--color-accent-red', hex: '#F09595' },
];

export function SettingsScreen() {
  const [appInfo, setAppInfo] = useState<AppGetInfoResponse | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const { preference: theme, resolved: resolvedTheme, setPreference: setTheme } = useTheme();
  const [density, setDensity] = useSetting('density');

  const themeOptions: { value: ThemePreference; label: string }[] = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'slate', label: 'Slate' },
    { value: 'midnight', label: 'Midnight' },
    { value: 'hc', label: 'High contrast' },
  ];

  const densityOptions: {
    value: AppSettings['density'];
    label: string;
  }[] = [
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'compact', label: 'Compact' },
  ];

  useEffect(() => {
    window.api.appGetInfo().then(setAppInfo);
  }, []);

  const handleReset = async () => {
    await window.api.settingsReset();
    setShowResetModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center h-[40px] px-3 bg-app-surface shrink-0"
        style={{ borderBottom: '0.5px solid var(--color-border)' }}
      >
        <span className="text-[13px] font-medium text-text-secondary">Settings</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-[500px] space-y-4">
          {/* Profile (react-hook-form + zod demo) */}
          <SettingsForm />

          {/* About */}
          <Panel header="About">
            <div className="p-3 space-y-2">
              {appInfo ? (
                <>
                  <InfoRow label="App version" value={`v${appInfo.version}`} />
                  <InfoRow label="Electron" value={appInfo.electronVersion} />
                  <InfoRow label="Chrome" value={appInfo.chromeVersion} />
                  <InfoRow label="Node.js" value={appInfo.nodeVersion} />
                </>
              ) : (
                <p className="text-[11px] text-text-dim">Loading...</p>
              )}
            </div>
          </Panel>

          {/* Density */}
          <Panel header={'Density'}>
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-3">
                {densityOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-1.5 text-[12px] text-text-secondary cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="density"
                      value={option.value}
                      checked={density === option.value}
                      onChange={() => {
                        void setDensity(option.value);
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </Panel>

          {/* Theme preference */}
          <Panel header={'Theme'}>
            <div className="p-3 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                {themeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-1.5 text-[12px] text-text-secondary cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={option.value}
                      checked={theme === option.value}
                      onChange={() => {
                        void setTheme(option.value);
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-text-dim">
                {'Resolved'}: <span className="font-mono">{resolvedTheme}</span> ·
                persisted to {`{userData}/settings.json`}.
              </p>
            </div>
          </Panel>

          {/* Theme colors */}
          <Panel header="Theme colors">
            <div className="p-3">
              <div className="grid grid-cols-4 gap-2">
                {themeColors.map((color) => (
                  <div key={color.var} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 h-8 rounded-md border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[9px] text-text-dim">{color.name}</span>
                    <span className="text-[8px] text-text-dim font-mono">{color.hex}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-text-dim mt-3">
                Customize these in src/renderer/styles/global.css using the @theme block.
              </p>
            </div>
          </Panel>

          {/* Actions */}
          <Panel header={'Actions'}>
            <div className="p-3 flex gap-2">
              <Button variant="secondary" onClick={() => setShowResetModal(true)}>
                {'Reset Settings'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.api.appOpenExternal({ url: 'https://electron-vite.org' })}
              >
                electron-vite Docs
              </Button>
            </div>
          </Panel>
        </div>
      </div>

      {/* Reset confirmation modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={'Reset Settings'}
      >
        <p className="text-[12px] text-text-secondary mb-4">
          {'This will restore all preferences to their defaults.'}
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            {'Cancel'}
          </Button>
          <Button variant="primary" onClick={() => void handleReset()}>
            {'Confirm'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-text-muted">{label}</span>
      <span className="text-[11px] text-text-primary font-mono">{value}</span>
    </div>
  );
}
