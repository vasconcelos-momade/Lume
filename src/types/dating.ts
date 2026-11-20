export type AppPage =
  | 'landing'
  | 'login'
  | 'register'
  | 'setup'
  | 'discover'
  | 'likes'
  | 'matches'
  | 'messages'
  | 'profile'
  | 'subscription'
  | 'settings'
  | 'admin';

export type SubscriptionTier = 'free' | 'premium' | 'vip';

export type RelationshipGoal =
  | 'Relacionamento sério'
  | 'Conhecer pessoas novas'
  | 'Algo sem pressa'
  | 'Amizade e conexões';

export interface LifestyleInfo {
  work: string;
  education: string;
  height: string;
  drinking: string;
  smoking: string;
  exercise: string;
  languages: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Feminino' | 'Masculino' | 'Não-binário';
  lookingFor: ('Feminino' | 'Masculino' | 'Todos')[];
  city: string;
  state: string;
  distanceKm: number;
  bio: string;
  photos: string[];
  interests: string[];
  intention: RelationshipGoal;
  verified: boolean;
  online: boolean;
  lastActive: string;
  compatibility: number;
  lifestyle: LifestyleInfo;
  likedBack?: boolean;
  superLikedMe?: boolean;
  likedAt?: string;
}

export interface MatchItem {
  id: string;
  profile: UserProfile;
  matchedAt: string;
  lastActivity: string;
  isNew: boolean;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: 'me' | string;
  text?: string;
  imageUrl?: string;
  timestamp: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  type: 'match' | 'like' | 'message' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  targetPage: AppPage;
  avatarUrl?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  gender: 'Feminino' | 'Masculino' | 'Não-binário';
  lookingFor: ('Feminino' | 'Masculino' | 'Todos')[];
  city: string;
  state: string;
  bio: string;
  photos: string[];
  interests: string[];
  intention: RelationshipGoal;
  verified: boolean;
  verificationPending: boolean;
  visible: boolean;
  tier: SubscriptionTier;
  billingCycle: 'monthly' | 'annual';
  lifestyle: LifestyleInfo;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  matchAlerts: boolean;
  messagePreviews: boolean;
  showOnlineStatus: boolean;
  showDistance: boolean;
  incognitoMode: boolean;
  maxDistanceKm: number;
  ageRange: [number, number];
  onlyVerified: boolean;
  blockedUsers: { id: string; name: string; blockedAt: string }[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  city: string;
  age: number;
  tier: SubscriptionTier;
  status: 'ativo' | 'suspenso' | 'pendente';
  verified: boolean;
  joinedAt: string;
  matchesCount: number;
  avatar: string;
}

export interface AdminVerificationRequest {
  id: string;
  userId: string;
  userName: string;
  city: string;
  submittedAt: string;
  profilePhoto: string;
  poseInstruction: string;
  confidence: number;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

export interface AdminReport {
  id: string;
  reportedUser: string;
  reportedBy: string;
  reason: string;
  severity: 'alta' | 'media' | 'baixa';
  createdAt: string;
  status: 'aberto' | 'resolvido' | 'arquivado';
  excerpt: string;
}

export interface AdminPayment {
  id: string;
  userName: string;
  plan: SubscriptionTier;
  cycle: 'Mensal' | 'Anual';
  amount: number;
  method: string;
  date: string;
  status: 'pago' | 'pendente' | 'estornado';
}
