import type { LucideIcon } from 'lucide-react';
import { Home, Folder, Sparkles, LayoutGrid, Settings } from 'lucide-react';
import { HomeScreen } from '@features/home/components/HomeScreen';
import { ExplorerScreen } from '@features/explorer/components/ExplorerScreen';
import { AiScreen } from '@features/ai/components/AiScreen';
import { ComponentsGalleryScreen } from '@features/components-gallery/components/ComponentsGalleryScreen';
import { SettingsScreen } from '@features/settings/components/SettingsScreen';

export type ScreenSection = 'main' | 'bottom';

/**
 * Single source of truth for all top-level screens. The Sidebar reads
 * `(section, icon, label)` from here and App.tsx routes on `(id, Component)`.
 *
 * Adding a screen = appending one entry here (or run `npm run new:feature`).
 */
export interface ScreenDef {
  /** Stable id used for routing. */
  id: string;
  /** Text shown in the Sidebar. */
  label: string;
  /** lucide-react icon used in the Sidebar. */
  icon: LucideIcon;
  /** Where the Sidebar renders the entry. `bottom` floats it below the spacer. */
  section: ScreenSection;
  Component: React.ComponentType;
}

export const SCREENS: readonly ScreenDef[] = [
  { id: 'home', label: 'Home', icon: Home, section: 'main', Component: HomeScreen },
  { id: 'explorer', label: 'Explorer', icon: Folder, section: 'main', Component: ExplorerScreen },
  { id: 'ai', label: 'AI', icon: Sparkles, section: 'main', Component: AiScreen },
  {
    id: 'components',
    label: 'Components',
    icon: LayoutGrid,
    section: 'main',
    Component: ComponentsGalleryScreen,
  },
  { id: 'settings', label: 'Settings', icon: Settings, section: 'bottom', Component: SettingsScreen },
];

export const SCREEN_BY_ID: Record<string, ScreenDef> = SCREENS.reduce(
  (acc, screen) => {
    acc[screen.id] = screen;
    return acc;
  },
  {} as Record<string, ScreenDef>,
);
