import { apiClient } from './apiClient';

export const chatApi = {
  /**
   * Fetches all conversations for the organization account.
   */
  async getConversations() {
    const res = await apiClient.get('/chat/conversations');
    return res?.data || res || [];
  },

  /**
   * Fetches messages in a specific conversation or with a specific user.
   */
  async getMessages(conversationOrUserId, limit = 50) {
    const res = await apiClient.get(`/chat/conversations/${conversationOrUserId}?limit=${limit}`);
    return res?.data || res || [];
  },

  /**
   * Sends a message in a conversation.
   */
  async sendMessage({ conversationId, receiverId, content, messageType = 'text', mediaUrl, replyToId }) {
    const res = await apiClient.post('/chat/messages', {
      conversationId,
      receiverId,
      content,
      messageType,
      mediaUrl,
      replyToId,
    });
    return res?.data || res;
  },

  /**
   * Marks all messages in a conversation as read.
   */
  async markConversationAsRead(conversationId) {
    const res = await apiClient.patch(`/chat/conversations/${conversationId}/read-all`);
    return res?.data || res;
  },

  /**
   * Deletes a message (unsend).
   */
  async deleteMessage(messageId) {
    const res = await apiClient.delete(`/chat/messages/${messageId}`);
    return res?.data || res;
  },

  /**
   * Toggles an emoji reaction.
   */
  async toggleReaction(messageId, emoji) {
    const res = await apiClient.post(`/chat/messages/${messageId}/reactions`, { emoji });
    return res?.data || res;
  },

  /**
   * Searches users and organizations to start a conversation.
   */
  async searchUsers(query) {
    const res = await apiClient.get(`/chat/search-users?q=${encodeURIComponent(query || '')}`);
    return res?.data || res || [];
  },

  /**
   * Gets total unread message count.
   */
  async getUnreadCount() {
    const res = await apiClient.get('/chat/unread-count');
    return res?.data?.unreadCount || res?.unreadCount || 0;
  },

  /**
   * Blocks a user.
   */
  async blockUser(userId, reason) {
    const res = await apiClient.post(`/chat/users/${userId}/block`, { reason });
    return res?.data || res;
  },

  /**
   * Reports a message.
   */
  async reportMessage(messageId, reason) {
    const res = await apiClient.post(`/chat/messages/${messageId}/report`, { reason });
    return res?.data || res;
  },
};

