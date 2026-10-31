import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EventManagement } from './components/EventManagement';
import { OtherViews } from './components/OtherViews';
import { EventDetailModal } from './components/EventDetailModal';
import { FilterModal } from './components/FilterModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { MOCK_EVENTS, NOTIFICATIONS } from './data/mockData';
import type { EventItem, EventStatus, SidebarSection } from './types';
import './App.css';

export function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<SidebarSection>('event-manage');
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & filters
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Status changes handler
  const handleStatusChange = (eventId: string, newStatus: EventStatus) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return { ...e, status: newStatus };
        }
        return e;
      })
    );
    addToast(`Event ${eventId} status updated to "${newStatus}"`, 'success');
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  const handleLogout = () => {
    addToast('Logged out of Organization Admin Console', 'info');
  };

  return (
    <div className="app-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Area */}
      <div className="main-content-wrapper">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onLogout={handleLogout}
        />

        {/* Dashboard Main View Area */}
        <main className="dashboard-scroll-body">
          {activeSection === 'event-manage' ? (
            <EventManagement
              events={events}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
              onSelectEvent={(event) => setSelectedEvent(event)}
              onOpenFilterModal={() => setIsFilterOpen(true)}
              selectedFormatFilter={selectedFormatFilter}
            />
          ) : (
            <OtherViews
              section={activeSection}
              onBackToEvents={() => setActiveSection('event-manage')}
            />
          )}
        </main>
      </div>

      {/* 3. Interactive Modals */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onStatusChange={handleStatusChange}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedFormat={selectedFormatFilter}
        onSelectFormat={(fmt) => {
          setSelectedFormatFilter(fmt);
          addToast(fmt ? `Filtered by ${fmt}` : 'All formats active', 'info');
        }}
        onReset={() => {
          setSelectedFormatFilter(null);
          addToast('Filters reset', 'info');
        }}
      />

      {/* 4. Feedback Toasts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
