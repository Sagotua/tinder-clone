import { create } from 'zustand';

const useUserStore = create((set, get) => ({
  user: null,
  likedUsers: [],
  chats: [],

  // Установка поточного користувача (використовується при реєстрації/вході)
  setUser: (userData) => set({ user: userData }),

  // Лайк користувача + перевірка на взаємність
  likeUser: (newUser) => {
    const currentUser = get().user;
    const mutual = newUser.likedYou?.includes(currentUser?.id);

    // Якщо взаємно і чату ще немає — створюємо чат
    if (mutual) {
      const chatExists = get().chats.some(
        (chat) =>
          (chat.user1.id === currentUser.id && chat.user2.id === newUser.id) ||
          (chat.user2.id === currentUser.id && chat.user1.id === newUser.id)
      );

      if (!chatExists) {
        get().addChat({
          user1: currentUser,
          user2: newUser,
          messages: [],
        });
      }
    }

    // Додаємо в список лайкнутих
    set((state) => ({
      likedUsers: [...state.likedUsers, newUser],
    }));
  },

  // Додавання нового чату
  addChat: (chat) => {
    set((state) => ({
      chats: [...state.chats, chat],
    }));
  },

  // Додавання повідомлення до конкретного чату
  sendMessage: (chatId, senderId, text) => {
    const currentChats = get().chats;
    const updatedChats = currentChats.map((chat, index) => {
      if (index === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, { senderId, text, timestamp: Date.now() }],
        };
      }
      return chat;
    });

    set({ chats: updatedChats });
  },

  // Вихід
  logout: () => set({ user: null, likedUsers: [], chats: [] }),
}));

export default useUserStore;
