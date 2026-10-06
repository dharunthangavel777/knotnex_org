import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Layout & Common Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import GlobalLoadingBar from './components/common/GlobalLoadingBar';
import ToastContainer from './components/common/ToastContainer';
import LoginModal from './components/common/LoginModal';
import ModalManager from './components/modals/ModalManager';

// Views
import DashboardView from './views/DashboardView';
import EventsView from './views/EventsView';
import CreateEventView from './views/CreateEventView';
import EventDetailsView from './views/EventDetailsView';
import EventPassesView from './views/EventPassesView';
import CampaignsView from './views/CampaignsView';
import CareersView from './views/CareersView';
import CreateOpportunityView from './views/CreateOpportunityView';
import SchemesView from './views/SchemesView';
import CreateSchemeView from './views/CreateSchemeView';
import AchievementsView from './views/AchievementsView';
import OrgContentView from './views/OrgContentView';
import OrgProfileView from './views/OrgProfileView';
import TicketsView from './views/TicketsView';
import HelpCenterView from './views/HelpCenterView';
import SettingsView from './views/SettingsView';

function AppContent() {
  const { activeView, isSidebarCollapsed } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'events':
        return <EventsView />;
      case 'createEvent':
        return <CreateEventView />;
      case 'eventDetails':
        return <EventDetailsView />;
      case 'eventPasses':
        return <EventPassesView />;
      case 'campaigns':
        return <CampaignsView />;
      case 'careers':
        return <CareersView />;
      case 'createOpportunity':
        return <CreateOpportunityView />;
      case 'schemes':
        return <SchemesView />;
      case 'createScheme':
        return <CreateSchemeView />;
      case 'achievements':
        return <AchievementsView />;
      case 'orgContent':
        return <OrgContentView />;
      case 'orgProfile':
        return <OrgProfileView />;
      case 'tickets':
        return <TicketsView />;
      case 'helpCenter':
        return <HelpCenterView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="desktop-viewport">
      <div className={`desktop-app-frame ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`} id="appFrame">
        <Sidebar />
        <main className="main-content" id="mainContentArea">
          <GlobalLoadingBar />
          <Header />
          <div className="content-fade-in" key={activeView}>
            {renderActiveView()}
          </div>
        </main>
      </div>

      <ModalManager />
      <ToastContainer />
      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
