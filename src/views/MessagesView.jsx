import React, { useState, useEffect, useRef } from 'react';
import { chatApi } from '../api/chatApi';
import { useApp } from '../context/AppContext';

export default function MessagesView() {
  const { showToast } = useApp();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const [replyingTo, setReplyingTo] = useState(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchUsersResults, setSearchUsersResults] = useState([]);
  const [userSearchText, setUserSearchText] = useState('');
  const [searchingUsers, setSearchingUsers] = useState(false);

  const messagesEndRef = useRef(null);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoadingConversations(true);
      const data = await chatApi.getConversations();
      const list = Array.isArray(data) ? data : (data.conversations || []);
      setConversations(list);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setLoadingConversations(false);
    }
  };

  // Poll active chat messages every 4 seconds
  useEffect(() => {
    if (!activeChat) return;

    loadMessages(activeChat.id || activeChat.other_user_id);
    const interval = setInterval(() => {
      loadMessages(activeChat.id || activeChat.other_user_id, true);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeChat]);

  const loadMessages = async (targetId, isSilent = false) => {
    if (!targetId) return;
    try {
      if (!isSilent) setLoadingMessages(true);
      const res = await chatApi.getMessages(targetId);
      const msgList = Array.isArray(res) ? res : (res.messages || []);
      setMessages(msgList);
      if (!isSilent) {
        scrollToBottom();
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      if (!isSilent) setLoadingMessages(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectConversation = async (conv) => {
    setActiveChat(conv);
    setReplyingTo(null);
    // Mark as read
    try {
      if (conv.id) {
        await chatApi.markConversationAsRead(conv.id);
        setConversations((prev) =>
          prev.map((c) => (c.id === conv.id ? { ...c, unread_count: 0 } : c))
        );
      }
    } catch (e) {
      console.warn('Could not mark as read:', e);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const text = messageText.trim();
    if (!text || !activeChat) return;

    const optimisticMessage = {
      id: `temp_${Date.now()}`,
      content: text,
      created_at: new Date().toISOString(),
      timestamp: new Date().toISOString(),
      sender_id: 'me',
      is_delivered: false,
      is_read: false,
      reply_to_id: replyingTo?.id,
      reply_to_content: replyingTo?.content,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageText('');
    setReplyingTo(null);
    scrollToBottom();

    try {
      const targetUserId = activeChat.other_user_id || activeChat.id;
      const sent = await chatApi.sendMessage({
        conversationId: activeChat.id,
        receiverId: targetUserId,
        content: text,
        replyToId: replyingTo?.id,
      });

      // Update with server message id
      if (sent?.id) {
        setMessages((prev) =>
          prev.map((m) => (m.id === optimisticMessage.id ? { ...m, ...sent, is_delivered: true } : m))
        );
      }

      loadConversations();
    } catch (err) {
      console.error('Send message failed:', err);
      showToast?.('Failed to deliver message');
    }
  };

  const handleSearchUsers = async (q) => {
    setUserSearchText(q);
    if (!q.trim()) {
      setSearchUsersResults([]);
      return;
    }
    setSearchingUsers(true);
    try {
      const res = await chatApi.searchUsers(q);
      setSearchUsersResults(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error('User search error:', e);
    } finally {
      setSearchingUsers(false);
    }
  };

  const handleStartChatWithUser = (user) => {
    const existing = conversations.find((c) => c.other_user_id === user.id);
    if (existing) {
      setActiveChat(existing);
    } else {
      const newConv = {
        id: '',
        other_user_id: user.id,
        other_user_name: user.name,
        other_user_avatar: user.photoUrl || user.avatar_url,
        last_message: '',
        unread_count: 0,
      };
      setActiveChat(newConv);
    }
    setShowNewChatModal(false);
    setUserSearchText('');
    setSearchUsersResults([]);
  };

  const filteredConversations = conversations.filter((c) => {
    const name = (c.other_user_name || '').toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    if (filter === 'unread') {
      return matchesSearch && (c.unread_count > 0);
    }
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', margin: '16px' }}>
      {/* ── Left Sidebar: Conversations ───────────────────────────────── */}
      <div style={{ width: '380px', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', background: '#FAFAFA' }}>
        {/* Top Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827', fontFamily: 'Google Sans, sans-serif' }}>
              Messages
            </h2>
            <button
              onClick={() => setShowNewChatModal(true)}
              style={{
                background: '#6B46FE',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Chat
            </button>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                background: '#F3F4F6',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2.5"
              style={{ position: 'absolute', left: '12px', top: '11px' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '4px 12px',
                borderRadius: '14px',
                border: 'none',
                background: filter === 'all' ? '#6B46FE' : '#E5E7EB',
                color: filter === 'all' ? '#fff' : '#4B5563',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              style={{
                padding: '4px 12px',
                borderRadius: '14px',
                border: 'none',
                background: filter === 'unread' ? '#6B46FE' : '#E5E7EB',
                color: filter === 'unread' ? '#fff' : '#4B5563',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loadingConversations ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9CA3AF', fontSize: '13.5px' }}>
              No conversations found. Click "New Chat" to connect with students, candidates, or attendees.
            </div>
          ) : (
            filteredConversations.map((c) => {
              const isSelected = activeChat && (activeChat.id === c.id || activeChat.other_user_id === c.other_user_id);
              const displayName = c.other_user_name || 'User';
              const avatar = c.other_user_avatar;
              const hasUnread = (c.unread_count || 0) > 0;

              return (
                <div
                  key={c.id || c.other_user_id}
                  onClick={() => handleSelectConversation(c)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    gap: '12px',
                    cursor: 'pointer',
                    background: isSelected ? '#F0ECFF' : 'transparent',
                    borderLeft: isSelected ? '4px solid #6B46FE' : '4px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* Avatar */}
                  <div style={{ position: 'relative' }}>
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={displayName}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: '#E0E7FF',
                          color: '#4338CA',
                          fontWeight: '700',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Online Dot */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '1px',
                        right: '1px',
                        width: '11px',
                        height: '11px',
                        borderRadius: '50%',
                        background: '#10B981',
                        border: '2px solid #fff',
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontWeight: hasUnread ? '700' : '600',
                          fontSize: '14.5px',
                          color: '#111827',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {displayName}
                      </span>
                      {c.last_message_at && (
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                          {new Date(c.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          color: hasUnread ? '#111827' : '#6B7280',
                          fontWeight: hasUnread ? '600' : '400',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '220px',
                        }}
                      >
                        {c.last_message || 'Start conversation...'}
                      </span>
                      {hasUnread && (
                        <span
                          style={{
                            background: '#6B46FE',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: '700',
                            borderRadius: '10px',
                            padding: '2px 7px',
                            minWidth: '18px',
                            textAlign: 'center',
                          }}
                        >
                          {c.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Right Content: Chat Thread ─────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div
              style={{
                padding: '12px 24px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  {activeChat.other_user_avatar ? (
                    <img
                      src={activeChat.other_user_avatar}
                      alt={activeChat.other_user_name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: '#E0E7FF',
                        color: '#4338CA',
                        fontWeight: '700',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {(activeChat.other_user_name || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#10B981',
                      border: '2px solid #fff',
                    }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: '700', color: '#111827' }}>
                      {activeChat.other_user_name || 'User'}
                    </h3>
                    <span style={{ fontSize: '11px', background: '#EEF2FF', color: '#6366F1', padding: '1px 6px', borderRadius: '8px', fontWeight: '600' }}>
                      Verified
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '500' }}>Active now</span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => showToast?.('Options menu coming soon')}
                  style={{
                    background: '#F3F4F6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: '#4B5563',
                    cursor: 'pointer',
                  }}
                >
                  Options
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', background: '#FAF9FE' }}>
              {loadingMessages ? (
                <div style={{ textAlign: 'center', color: '#6B7280', padding: '30px' }}>Loading messages...</div>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9CA3AF', padding: '50px 20px' }}>
                  No messages yet. Send a greeting to start the conversation!
                </div>
              ) : (
                messages.map((m) => {
                  const isMe = m.sender_id === 'me' || m.senderId === activeChat.current_user_id;

                  return (
                    <div
                      key={m.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMe ? 'flex-end' : 'flex-start',
                        marginBottom: '14px',
                      }}
                    >
                      {/* Quoted preview if reply */}
                      {m.reply_to_content && (
                        <div
                          style={{
                            background: '#E5E7EB',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#4B5563',
                            marginBottom: '4px',
                            maxWidth: '70%',
                            borderLeft: '3px solid #6B46FE',
                          }}
                        >
                          Replying: {m.reply_to_content}
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        style={{
                          maxWidth: '65%',
                          padding: '10px 14px',
                          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          background: isMe ? '#6B46FE' : '#FFFFFF',
                          color: isMe ? '#FFFFFF' : '#1F2937',
                          boxShadow: isMe ? '0 2px 8px rgba(107, 70, 254, 0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
                          fontSize: '14px',
                          lineHeight: '1.45',
                          wordBreak: 'break-word',
                        }}
                      >
                        {m.media_url && (
                          <div style={{ marginBottom: '8px' }}>
                            <img
                              src={m.media_url}
                              alt="Attachment"
                              style={{ maxWidth: '100%', borderRadius: '10px', maxHeight: '240px', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        {m.content}
                      </div>

                      {/* Timestamp & receipts */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '3px',
                          fontSize: '11px',
                          color: '#9CA3AF',
                        }}
                      >
                        {m.created_at
                          ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : 'Just now'}
                        {isMe && (
                          <span>
                            {m.is_read ? '✓✓' : m.is_delivered ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quoted reply banner if active */}
            {replyingTo && (
              <div
                style={{
                  background: '#F5F3FF',
                  padding: '8px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #E9D5FF',
                }}
              >
                <div style={{ fontSize: '12.5px', color: '#6B46FE' }}>
                  Replying to: <strong>{replyingTo.content}</strong>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Message Input Form */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: '14px 20px',
                borderTop: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#fff',
              }}
            >
              <input
                type="text"
                placeholder="Write a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '24px',
                  border: '1px solid #E5E7EB',
                  background: '#F9FAFB',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: messageText.trim() ? '#6B46FE' : '#E5E7EB',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: messageText.trim() ? 'pointer' : 'default',
                  transition: 'background 0.15s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          /* Empty placeholder when no chat selected */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6B46FE" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#111827' }}>
              Your Messages
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', maxWidth: '340px', lineHeight: '1.5' }}>
              Select a conversation from the list or start a new chat with candidates, attendees, or team members.
            </p>
          </div>
        )}
      </div>

      {/* ── New Chat Search Modal ────────────────────────────────────── */}
      {showNewChatModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '460px',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#111827' }}>Start New Chat</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#6B7280' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '16px 20px' }}>
              <input
                type="text"
                placeholder="Search user or organization..."
                value={userSearchText}
                onChange={(e) => handleSearchUsers(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  background: '#F9FAFB',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '0 12px 16px 12px' }}>
              {searchingUsers ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#6B7280' }}>Searching...</div>
              ) : searchUsersResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', color: '#9CA3AF', fontSize: '13.5px' }}>
                  {userSearchText ? 'No users found' : 'Type a name to search user directory'}
                </div>
              ) : (
                searchUsersResults.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => handleStartChatWithUser(u)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#E0E7FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        color: '#4338CA',
                      }}
                    >
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>{u.name}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>@{u.username || 'user'}</div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6B46FE', fontWeight: '600' }}>Message</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

