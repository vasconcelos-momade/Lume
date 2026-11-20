/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MatchCelebrationModal } from './components/dating/MatchCelebrationModal';
import { ProfileDetailModal } from './components/dating/ProfileDetailModal';
import { ToastContainer } from './components/ui/ToastContainer';
import { DatingProvider, useDating } from './context/DatingContext';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { LandingPage } from './pages/LandingPage';
import { LikesPage } from './pages/LikesPage';
import { LoginPage } from './pages/LoginPage';
import { MatchesPage } from './pages/MatchesPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { RegisterPage } from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { UserProfilePage } from './pages/UserProfilePage';

const PageRouter: React.FC = () => {
  const { currentPage } = useDating();

  switch (currentPage) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    case 'setup':
      return <ProfileSetupPage />;
    case 'discover':
      return <DiscoverPage />;
    case 'likes':
      return <LikesPage />;
    case 'matches':
      return <MatchesPage />;
    case 'messages':
      return <MessagesPage />;
    case 'profile':
      return <UserProfilePage />;
    case 'subscription':
      return <SubscriptionPage />;
    case 'settings':
      return <SettingsPage />;
    case 'admin':
      return <AdminDashboardPage />;
    default:
      return <LandingPage />;
  }
};

export default function App() {
  return (
    <DatingProvider>
      <PageRouter />
      <ProfileDetailModal />
      <MatchCelebrationModal />
      <ToastContainer />
    </DatingProvider>
  );
}
