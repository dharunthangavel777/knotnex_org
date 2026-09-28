import React, { useState, useEffect } from 'react';
import './style.css';

import {
  initialEvents,
  initialRegistrations,
  initialCampaigns,
  initialJobs,
  initialApplications,
  initialSchemes,
  initialSchemeApplications,
  initialTickets,
  initialNotifications,
  knowledgeCategories,
  helpArticles
} from './data/mockData';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import LoginScreen from './components/LoginScreen';

import DashboardView from './components/views/DashboardView';
import ManageEventsView from './components/views/ManageEventsView';
import CreateEventView from './components/views/CreateEventView';
import EventPassesView from './components/views/EventPassesView';
import TicketsIssuesView from './components/views/TicketsIssuesView';
import CareersView from './components/views/CareersView';
import SchemesView from './components/views/SchemesView';
import CreateSchemeView from './components/views/CreateSchemeView';
import HelpCenterView from './components/views/HelpCenterView';
import SettingsView from './components/views/SettingsView';

import IssueTicketModal from './components/modals/IssueTicketModal';
import EditEventModal from './components/modals/EditEventModal';
import QrGateScannerModal from './components/modals/QrGateScannerModal';
import AddAttendeeModal from './components/modals/AddAttendeeModal';
import TicketDetailsModal from './components/modals/TicketDetailsModal';
import CreateOpportunityModal from './components/modals/CreateOpportunityModal';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [subAction, setSubAction] = useState(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedEventForEdit, setSelectedEventForEdit] = useState(null);

  const [toasts, setToasts] = useState([]);

  // Main Data States
  const [events, setEvents] = useState(initialEvents);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [campaigns] = useState(initialCampaigns);
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [schemes, setSchemes] = useState(initialSchemes);
  const [schemeApplications, setSchemeApplications] = useState(initialSchemeApplications);
  const [tickets, setTickets] = useState(initialTickets);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleNavigate = (view, action = null) => {
    setActiveView(view);
    setSubAction(action);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedTicket(null);
    setSelectedEventForEdit(null);
  };

  const handleSelectTicketDetails = (tkt) => {
    setSelectedTicket(tkt);
    setActiveModal('ticketDetails');
  };

  const handleEditEvent = (ev) => {
    setSelectedEventForEdit(ev);
    setActiveModal('editEvent');
  };

  // Keyboard Shortcuts (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalTopSearch');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        handleCloseModal();
        setLoginModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="desktop-viewport">
      <div className="desktop-app-frame" id="appFrame">
        {/* Sidebar Navigation */}
        <Sidebar
          activeView={activeView}
          onNavigate={handleNavigate}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onOpenModal={handleOpenModal}
        />

        {/* Main Content Area */}
        <main className="main-content" id="mainContentArea">
          {/* Top Header */}
          <Header
            activeView={activeView}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            notifications={notifications}
            setNotifications={setNotifications}
            onToggleLoginScreen={() => setLoginModalOpen(true)}
            onOpenModal={handleOpenModal}
          />

          {/* Render Active View Component */}
          {activeView === 'dashboard' && (
            <DashboardView
              events={events}
              tickets={tickets}
              campaigns={campaigns}
              onNavigate={handleNavigate}
              onOpenModal={handleOpenModal}
              onSelectTicketDetails={handleSelectTicketDetails}
            />
          )}

          {activeView === 'events' && (
            <ManageEventsView
              events={events}
              setEvents={setEvents}
              registrations={registrations}
              setRegistrations={setRegistrations}
              onNavigate={handleNavigate}
              onOpenModal={handleOpenModal}
              onEditEvent={handleEditEvent}
              addToast={addToast}
              defaultSubAction={subAction}
            />
          )}

          {activeView === 'createEvent' && (
            <CreateEventView
              setEvents={setEvents}
              onNavigate={handleNavigate}
              addToast={addToast}
            />
          )}

          {activeView === 'eventPasses' && (
            <EventPassesView
              registrations={registrations}
              setRegistrations={setRegistrations}
              onOpenModal={handleOpenModal}
              addToast={addToast}
            />
          )}

          {activeView === 'tickets' && (
            <TicketsIssuesView
              tickets={tickets}
              onOpenModal={handleOpenModal}
              onSelectTicketDetails={handleSelectTicketDetails}
            />
          )}

          {activeView === 'careers' && (
            <CareersView
              jobs={jobs}
              setJobs={setJobs}
              applications={applications}
              setApplications={setApplications}
              onOpenModal={handleOpenModal}
              addToast={addToast}
              defaultSubAction={subAction}
            />
          )}

          {activeView === 'schemes' && (
            <SchemesView
              schemes={schemes}
              schemeApplications={schemeApplications}
              setSchemeApplications={setSchemeApplications}
              onNavigate={handleNavigate}
              addToast={addToast}
              defaultSubAction={subAction}
            />
          )}

          {activeView === 'createScheme' && (
            <CreateSchemeView
              setSchemes={setSchemes}
              onNavigate={handleNavigate}
              addToast={addToast}
            />
          )}

          {activeView === 'helpCenter' && (
            <HelpCenterView
              knowledgeCategories={knowledgeCategories}
              helpArticles={helpArticles}
              addToast={addToast}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView addToast={addToast} />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <IssueTicketModal
        isOpen={activeModal === 'issueTicket'}
        onClose={handleCloseModal}
        setRegistrations={setRegistrations}
        addToast={addToast}
      />

      <EditEventModal
        isOpen={activeModal === 'editEvent'}
        onClose={handleCloseModal}
        event={selectedEventForEdit}
        setEvents={setEvents}
        addToast={addToast}
      />

      <QrGateScannerModal
        isOpen={activeModal === 'qrScanner'}
        onClose={handleCloseModal}
        registrations={registrations}
        setRegistrations={setRegistrations}
        addToast={addToast}
      />

      <AddAttendeeModal
        isOpen={activeModal === 'addAttendee'}
        onClose={handleCloseModal}
        setRegistrations={setRegistrations}
        addToast={addToast}
      />

      <TicketDetailsModal
        isOpen={activeModal === 'ticketDetails'}
        onClose={handleCloseModal}
        ticket={selectedTicket}
        setTickets={setTickets}
        addToast={addToast}
      />

      <CreateOpportunityModal
        isOpen={activeModal === 'createOpportunity'}
        onClose={handleCloseModal}
        setJobs={setJobs}
        addToast={addToast}
      />

      <LoginScreen
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={() => setIsLoggedIn(true)}
        addToast={addToast}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
