import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  ADMIN_PAYMENTS,
  ADMIN_REPORTS,
  ADMIN_USERS,
  ADMIN_VERIFICATIONS,
  DISCOVER_PROFILES,
  INITIAL_CURRENT_USER,
  INITIAL_LIKES_ME,
  INITIAL_MATCHES,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
} from '../data/mockData';
import {
  AdminPayment,
  AdminReport,
  AdminUserRecord,
  AdminVerificationRequest,
  AppNotification,
  AppPage,
  ChatMessage,
  CurrentUser,
  MatchItem,
  SubscriptionTier,
  ToastMessage,
  UserProfile,
  UserSettings,
} from '../types/dating';

export interface DiscoverFilters {
  maxDistanceKm: number;
  ageRange: [number, number];
  onlyVerified: boolean;
  interests: string[];
  query: string;
}

interface SwipeHistoryEntry {
  profile: UserProfile;
  action: 'like' | 'dislike' | 'superlike';
}

interface DatingContextValue {
  currentPage: AppPage;
  navigate: (page: AppPage) => void;
  isAuthenticated: boolean;
  currentUser: CurrentUser;
  updateCurrentUser: (patch: Partial<CurrentUser>) => void;
  settings: UserSettings;
  updateSettings: (patch: Partial<UserSettings>) => void;
  unblockUser: (id: string) => void;
  login: (emailOrPhone: string) => void;
  loginWithGoogle: () => void;
  register: (payload: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: CurrentUser['gender'];
  }) => void;
  logout: () => void;
  deleteAccount: () => void;
  completeProfileSetup: () => void;

  // Discover & Interactions
  discoverProfiles: UserProfile[];
  allProfiles: UserProfile[];
  filters: DiscoverFilters;
  setFilters: (patch: Partial<DiscoverFilters>) => void;
  resetFilters: () => void;
  canUndo: boolean;
  likeProfile: (profile: UserProfile, isSuperLike?: boolean) => void;
  dislikeProfile: (profile: UserProfile) => void;
  undoLastSwipe: () => void;
  sendInterestMessage: (profile: UserProfile, message: string) => void;
  dailyLikesRemaining: number;

  // Likes & Matches
  likesMe: UserProfile[];
  likeBackFromLikes: (profile: UserProfile) => void;
  matches: MatchItem[];
  unmatchUser: (matchId: string) => void;
  celebrationMatch: MatchItem | null;
  closeCelebrationMatch: () => void;

  // Messaging
  selectedMatchId: string | null;
  setSelectedMatchId: (matchId: string | null) => void;
  openChatWithMatch: (matchId: string) => void;
  messagesByMatch: Record<string, ChatMessage[]>;
  typingMatchId: string | null;
  sendMessage: (matchId: string, text?: string, imageUrl?: string) => void;
  markMatchRead: (matchId: string) => void;
  totalUnreadMessages: number;

  // Notifications & Toasts
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Subscriptions
  subscribeToPlan: (tier: SubscriptionTier, cycle: 'monthly' | 'annual') => void;

  // Profile Modal inspection
  inspectedProfile: UserProfile | null;
  setInspectedProfile: (profile: UserProfile | null) => void;

  // Admin state
  adminUsers: AdminUserRecord[];
  toggleAdminUserStatus: (id: string) => void;
  adminVerifications: AdminVerificationRequest[];
  handleVerificationDecision: (id: string, decision: 'aprovado' | 'rejeitado') => void;
  adminReports: AdminReport[];
  handleReportDecision: (id: string, status: 'resolvido' | 'arquivado') => void;
  adminPayments: AdminPayment[];
}

const VALID_PAGES: AppPage[] = [
  'landing',
  'login',
  'register',
  'setup',
  'discover',
  'likes',
  'matches',
  'messages',
  'profile',
  'subscription',
  'settings',
  'admin',
];

const DEFAULT_FILTERS: DiscoverFilters = {
  maxDistanceKm: 30,
  ageRange: [21, 38],
  onlyVerified: false,
  interests: [],
  query: '',
};

const DatingContext = createContext<DatingContextValue | null>(null);

function getInitialPageFromHash(): AppPage {
  const hash = window.location.hash.replace('#', '') as AppPage;
  return VALID_PAGES.includes(hash) ? hash : 'landing';
}

export const DatingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>(getInitialPageFromHash);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const p = getInitialPageFromHash();
    return !['landing', 'login', 'register'].includes(p);
  });

  const [currentUser, setCurrentUser] = useState<CurrentUser>(INITIAL_CURRENT_USER);
  const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);
  const [discoverQueue, setDiscoverQueue] = useState<UserProfile[]>(DISCOVER_PROFILES);
  const [swipeHistory, setSwipeHistory] = useState<SwipeHistoryEntry[]>([]);
  const [filters, setFiltersState] = useState<DiscoverFilters>(DEFAULT_FILTERS);
  const [dailyLikesUsed, setDailyLikesUsed] = useState<number>(3);

  const [likesMe, setLikesMe] = useState<UserProfile[]>(INITIAL_LIKES_ME);
  const [matches, setMatches] = useState<MatchItem[]>(INITIAL_MATCHES);
  const [celebrationMatch, setCelebrationMatch] = useState<MatchItem | null>(null);

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(INITIAL_MATCHES[0]?.id ?? null);
  const [messagesByMatch, setMessagesByMatch] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [typingMatchId, setTypingMatchId] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [inspectedProfile, setInspectedProfile] = useState<UserProfile | null>(null);

  // Admin state
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(ADMIN_USERS);
  const [adminVerifications, setAdminVerifications] = useState<AdminVerificationRequest[]>(ADMIN_VERIFICATIONS);
  const [adminReports, setAdminReports] = useState<AdminReport[]>(ADMIN_REPORTS);
  const [adminPayments] = useState<AdminPayment[]>(ADMIN_PAYMENTS);

  const navigate = useCallback((page: AppPage) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = getInitialPageFromHash();
      setCurrentPage(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateCurrentUser = useCallback((patch: Partial<CurrentUser>) => {
    setCurrentUser((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateSettings = useCallback((patch: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const unblockUser = useCallback(
    (id: string) => {
      setSettings((prev) => ({
        ...prev,
        blockedUsers: prev.blockedUsers.filter((b) => b.id !== id),
      }));
      addToast({ type: 'info', title: 'Usuário desbloqueado', description: 'As interações foram restauradas.' });
    },
    [addToast]
  );

  const login = useCallback(
    (emailOrPhone: string) => {
      setIsAuthenticated(true);
      if (emailOrPhone.includes('@')) {
        setCurrentUser((prev) => ({ ...prev, email: emailOrPhone }));
      }
      addToast({ type: 'success', title: 'Bem-vindo de volta!', description: 'Sessão iniciada com segurança.' });
      navigate('discover');
    },
    [addToast, navigate]
  );

  const loginWithGoogle = useCallback(() => {
    setIsAuthenticated(true);
    addToast({ type: 'success', title: 'Conectado com Google', description: 'Sua conta foi autenticada.' });
    navigate('discover');
  }, [addToast, navigate]);

  const register = useCallback(
    (payload: {
      name: string;
      email: string;
      phone: string;
      birthDate: string;
      gender: CurrentUser['gender'];
    }) => {
      const birthYear = new Date(payload.birthDate).getFullYear();
      const computedAge = !Number.isNaN(birthYear) ? Math.max(18, 2026 - birthYear) : 26;
      setCurrentUser((prev) => ({
        ...prev,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        birthDate: payload.birthDate,
        age: computedAge,
        gender: payload.gender,
      }));
      setIsAuthenticated(true);
      addToast({
        type: 'success',
        title: 'Conta criada com sucesso',
        description: 'Vamos personalizar seu perfil em poucos passos.',
      });
      navigate('setup');
    },
    [addToast, navigate]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    addToast({ type: 'info', title: 'Você saiu da sua conta' });
    navigate('landing');
  }, [addToast, navigate]);

  const deleteAccount = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(INITIAL_CURRENT_USER);
    addToast({ type: 'info', title: 'Conta removida', description: 'Seus dados foram encerrados conforme solicitado.' });
    navigate('landing');
  }, [addToast, navigate]);

  const completeProfileSetup = useCallback(() => {
    setIsAuthenticated(true);
    addToast({ type: 'success', title: 'Perfil publicado!', description: 'Agora você pode explorar conexões na sua região.' });
    navigate('discover');
  }, [addToast, navigate]);

  const setFilters = useCallback((patch: Partial<DiscoverFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
  }, []);

  const discoverProfiles = useMemo(() => {
    return discoverQueue.filter((p) => {
      if (p.distanceKm > filters.maxDistanceKm) return false;
      if (p.age < filters.ageRange[0] || p.age > filters.ageRange[1]) return false;
      if (filters.onlyVerified && !p.verified) return false;
      if (
        filters.interests.length > 0 &&
        !filters.interests.some((interest) => p.interests.includes(interest))
      ) {
        return false;
      }
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const hay = `${p.name} ${p.city} ${p.bio} ${p.interests.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [discoverQueue, filters]);

  const dailyLikesRemaining = currentUser.tier === 'free' ? Math.max(0, 15 - dailyLikesUsed) : 999;

  const createMatchFromProfile = useCallback(
    (profile: UserProfile, initialGreeting?: string) => {
      const existing = matches.find((m) => m.profile.id === profile.id);
      if (existing) return existing;

      const newMatch: MatchItem = {
        id: `m-${Date.now()}`,
        profile,
        matchedAt: 'Agora mesmo',
        lastActivity: 'Agora mesmo',
        isNew: true,
        unreadCount: 0,
      };

      setMatches((prev) => [newMatch, ...prev]);
      setLikesMe((prev) => prev.filter((item) => item.id !== profile.id));
      setMessagesByMatch((prev) => ({
        ...prev,
        [newMatch.id]: initialGreeting
          ? [
              {
                id: `msg-${Date.now()}`,
                matchId: newMatch.id,
                senderId: 'me',
                text: initialGreeting,
                timestamp: 'Agora',
                read: true,
              },
            ]
          : [],
      }));
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'match',
          title: `Novo match com ${profile.name.split(' ')[0]}`,
          description: 'Vocês demonstraram interesse mútuo. Inicie uma conversa!',
          time: 'Agora',
          read: false,
          targetPage: 'matches',
          avatarUrl: profile.photos[0],
        },
        ...prev,
      ]);
      return newMatch;
    },
    [matches]
  );

  const likeProfile = useCallback(
    (profile: UserProfile, isSuperLike = false) => {
      if (currentUser.tier === 'free' && dailyLikesRemaining <= 0) {
        addToast({
          type: 'error',
          title: 'Limite diário atingido',
          description: 'Assine o Premium para curtidas ilimitadas ou volte amanhã.',
        });
        navigate('subscription');
        return;
      }

      setDailyLikesUsed((n) => n + 1);
      setDiscoverQueue((prev) => prev.filter((p) => p.id !== profile.id));
      setSwipeHistory((prev) => [...prev, { profile, action: isSuperLike ? 'superlike' : 'like' }]);

      if (profile.likedBack || isSuperLike) {
        const created = createMatchFromProfile(profile);
        setCelebrationMatch(created);
      } else {
        addToast({
          type: 'info',
          title: isSuperLike ? `Super Like enviado para ${profile.name.split(' ')[0]}` : `Você curtiu ${profile.name.split(' ')[0]}`,
        });
      }
    },
    [addToast, createMatchFromProfile, currentUser.tier, dailyLikesRemaining, navigate]
  );

  const dislikeProfile = useCallback((profile: UserProfile) => {
    setDiscoverQueue((prev) => prev.filter((p) => p.id !== profile.id));
    setSwipeHistory((prev) => [...prev, { profile, action: 'dislike' }]);
  }, []);

  const undoLastSwipe = useCallback(() => {
    if (currentUser.tier === 'free') {
      addToast({
        type: 'info',
        title: 'Recurso Premium',
        description: 'Desfazer deslizes está disponível nos planos Premium e VIP.',
      });
      navigate('subscription');
      return;
    }
    const last = swipeHistory[swipeHistory.length - 1];
    if (!last) return;
    setSwipeHistory((prev) => prev.slice(0, -1));
    setDiscoverQueue((prev) => [last.profile, ...prev]);
    addToast({ type: 'info', title: `Perfil de ${last.profile.name.split(' ')[0]} restaurado` });
  }, [addToast, currentUser.tier, navigate, swipeHistory]);

  const sendInterestMessage = useCallback(
    (profile: UserProfile, message: string) => {
      setDiscoverQueue((prev) => prev.filter((p) => p.id !== profile.id));
      setSwipeHistory((prev) => [...prev, { profile, action: 'superlike' }]);
      const created = createMatchFromProfile(profile, message);
      setCelebrationMatch(created);
      addToast({
        type: 'success',
        title: 'Interesse enviado!',
        description: `Sua mensagem chegou para ${profile.name.split(' ')[0]}.`,
      });
    },
    [addToast, createMatchFromProfile]
  );

  const likeBackFromLikes = useCallback(
    (profile: UserProfile) => {
      const created = createMatchFromProfile(profile);
      setDiscoverQueue((prev) => prev.filter((p) => p.id !== profile.id));
      setCelebrationMatch(created);
    },
    [createMatchFromProfile]
  );

  const unmatchUser = useCallback(
    (matchId: string) => {
      setMatches((prev) => prev.filter((m) => m.id !== matchId));
      if (selectedMatchId === matchId) {
        setSelectedMatchId(null);
      }
      addToast({ type: 'info', title: 'Match desfeito', description: 'A conversa foi removida da sua lista.' });
    },
    [addToast, selectedMatchId]
  );

  const closeCelebrationMatch = useCallback(() => {
    setCelebrationMatch(null);
  }, []);

  const markMatchRead = useCallback((matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, unreadCount: 0, isNew: false } : m))
    );
    setMessagesByMatch((prev) => {
      const list = prev[matchId];
      if (!list) return prev;
      return {
        ...prev,
        [matchId]: list.map((msg) => ({ ...msg, read: true })),
      };
    });
  }, []);

  const openChatWithMatch = useCallback(
    (matchId: string) => {
      setSelectedMatchId(matchId);
      markMatchRead(matchId);
      navigate('messages');
    },
    [markMatchRead, navigate]
  );

  const sendMessage = useCallback(
    (matchId: string, text?: string, imageUrl?: string) => {
      if (!text?.trim() && !imageUrl) return;
      const now = new Date();
      const timeLabel = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        matchId,
        senderId: 'me',
        text: text?.trim(),
        imageUrl,
        timestamp: timeLabel,
        read: false,
      };

      setMessagesByMatch((prev) => ({
        ...prev,
        [matchId]: [...(prev[matchId] ?? []), newMsg],
      }));
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId ? { ...m, lastActivity: 'Agora', isNew: false, unreadCount: 0 } : m
        )
      );

      // Simulate realistic live reply with typing indicator
      const targetMatch = matches.find((m) => m.id === matchId);
      if (!targetMatch) return;

      setTimeout(() => {
        setTypingMatchId(matchId);
      }, 650);

      setTimeout(() => {
        setTypingMatchId((curr) => (curr === matchId ? null : curr));
        const replies = [
          `Adorei isso! O que você costuma fazer nos fins de semana por ${targetMatch.profile.city.split(',')[0]}?`,
          'Combina muito comigo também. Que tal marcarmos um café essa semana?',
          'Que coincidência boa! Tenho um lugar ótimo em mente para indicar.',
          'Fiquei curiosa para saber mais sobre essa história!',
        ];
        const replyText = imageUrl
          ? 'Que foto incrível! Onde foi tirada?'
          : replies[Math.floor(Math.random() * replies.length)];

        const replyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          matchId,
          senderId: targetMatch.profile.id,
          text: replyText,
          timestamp: timeLabel,
          read: true,
        };

        setMessagesByMatch((prev) => ({
          ...prev,
          [matchId]: [
            ...(prev[matchId] ?? []).map((m) => (m.id === newMsg.id ? { ...m, read: true } : m)),
            replyMsg,
          ],
        }));
      }, 2200);
    },
    [matches]
  );

  const totalUnreadMessages = useMemo(
    () => matches.reduce((sum, m) => sum + m.unreadCount, 0),
    [matches]
  );

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const subscribeToPlan = useCallback(
    (tier: SubscriptionTier, cycle: 'monthly' | 'annual') => {
      setCurrentUser((prev) => ({ ...prev, tier, billingCycle: cycle }));
      addToast({
        type: 'success',
        title: `Plano ${tier.toUpperCase()} ativado!`,
        description: 'Todos os benefícios já estão liberados na sua conta.',
      });
    },
    [addToast]
  );

  // Admin Handlers
  const toggleAdminUserStatus = useCallback(
    (id: string) => {
      setAdminUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: u.status === 'suspenso' ? 'ativo' : 'suspenso' } : u
        )
      );
      addToast({ type: 'info', title: 'Status do usuário atualizado' });
    },
    [addToast]
  );

  const handleVerificationDecision = useCallback(
    (id: string, decision: 'aprovado' | 'rejeitado') => {
      setAdminVerifications((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: decision } : v))
      );
      addToast({
        type: decision === 'aprovado' ? 'success' : 'info',
        title: decision === 'aprovado' ? 'Perfil verificado com sucesso' : 'Solicitação recusada',
      });
    },
    [addToast]
  );

  const handleReportDecision = useCallback(
    (id: string, status: 'resolvido' | 'arquivado') => {
      setAdminReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      addToast({ type: 'success', title: 'Ocorrência atualizada' });
    },
    [addToast]
  );

  const value: DatingContextValue = {
    currentPage,
    navigate,
    isAuthenticated,
    currentUser,
    updateCurrentUser,
    settings,
    updateSettings,
    unblockUser,
    login,
    loginWithGoogle,
    register,
    logout,
    deleteAccount,
    completeProfileSetup,
    discoverProfiles,
    allProfiles: DISCOVER_PROFILES,
    filters,
    setFilters,
    resetFilters,
    canUndo: swipeHistory.length > 0,
    likeProfile,
    dislikeProfile,
    undoLastSwipe,
    sendInterestMessage,
    dailyLikesRemaining,
    likesMe,
    likeBackFromLikes,
    matches,
    unmatchUser,
    celebrationMatch,
    closeCelebrationMatch,
    selectedMatchId,
    setSelectedMatchId,
    openChatWithMatch,
    messagesByMatch,
    typingMatchId,
    sendMessage,
    markMatchRead,
    totalUnreadMessages,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    toasts,
    addToast,
    removeToast,
    subscribeToPlan,
    inspectedProfile,
    setInspectedProfile,
    adminUsers,
    toggleAdminUserStatus,
    adminVerifications,
    handleVerificationDecision,
    adminReports,
    handleReportDecision,
    adminPayments,
  };

  return <DatingContext.Provider value={value}>{children}</DatingContext.Provider>;
};

export function useDating(): DatingContextValue {
  const ctx = useContext(DatingContext);
  if (!ctx) throw new Error('useDating must be used inside DatingProvider');
  return ctx;
}
