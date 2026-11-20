import React from 'react';
import { useDating } from '../../context/DatingContext';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { MobileBottomNavigation } from './MobileBottomNavigation';
import { RightSidebar } from './RightSidebar';

interface AppShellProps {
  title: string;
  subtitle?: string;
  headerRightSlot?: React.ReactNode;
  hideRightSidebar?: boolean;
  hideHeaderOnMobile?: boolean;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  title,
  subtitle,
  headerRightSlot,
  hideRightSidebar = false,
  hideHeaderOnMobile = false,
  children,
}) => {
  const { currentPage } = useDating();

  return (
    <div className="min-h-screen bg-canvas text-ink flex">
      <AppSidebar />

      <div className="flex-1 min-w-0 flex flex-col pb-16 lg:pb-0">
        <div className={hideHeaderOnMobile ? 'hidden lg:block' : 'block'}>
          <Header title={title} subtitle={subtitle} rightSlot={headerRightSlot} />
        </div>
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {!hideRightSidebar && currentPage !== 'messages' && currentPage !== 'admin' && (
        <RightSidebar />
      )}

      <MobileBottomNavigation />
    </div>
  );
};
