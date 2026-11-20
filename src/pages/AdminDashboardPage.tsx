import React, { useState } from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  CreditCard,
  Heart,
  MessageCircle,
  Search,
  Shield,
  Users,
  X,
} from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { AppShell } from '../components/layout/AppShell';
import { UserAvatar } from '../components/ui/UserAvatar';

type AdminTab = 'overview' | 'users' | 'verifications' | 'moderation' | 'payments' | 'roles';

const GROWTH_BARS = [
  { month: 'Jun', users: 31200, matches: 19400 },
  { month: 'Jul', users: 34800, matches: 22100 },
  { month: 'Ago', users: 38100, matches: 25600 },
  { month: 'Set', users: 41900, matches: 28900 },
  { month: 'Out', users: 45400, matches: 31800 },
  { month: 'Nov', users: 48920, matches: 36400 },
];

const ADMIN_ROLES = [
  {
    role: 'Super Admin',
    members: '2 gestores',
    permissions: 'Acesso integral a métricas, finanças, moderação e configurações de segurança.',
  },
  {
    role: 'Moderador de Confiança',
    members: '6 analistas',
    permissions: 'Aprovação de verificações faciais, análise de denúncias e suspensão de perfis.',
  },
  {
    role: 'Financeiro & Billing',
    members: '3 especialistas',
    permissions: 'Monitoramento de assinaturas Premium/VIP, estornos e conciliação PIX/cartões.',
  },
  {
    role: 'Suporte ao Membro',
    members: '8 atendentes',
    permissions: 'Auxílio em recuperação de conta e orientações sem acesso a mensagens privadas.',
  },
];

export const AdminDashboardPage: React.FC = () => {
  const {
    adminUsers,
    toggleAdminUserStatus,
    adminVerifications,
    handleVerificationDecision,
    adminReports,
    handleReportDecision,
    adminPayments,
  } = useDating();

  const [tab, setTab] = useState<AdminTab>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'free' | 'premium' | 'vip'>('all');

  const filteredUsers = adminUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.city.toLowerCase().includes(userSearch.toLowerCase());
    const matchesTier = tierFilter === 'all' || u.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const pendingVerifs = adminVerifications.filter((v) => v.status === 'pendente').length;
  const openReports = adminReports.filter((r) => r.status === 'aberto').length;

  return (
    <AppShell
      title="Painel Administrativo"
      subtitle="Operações, moderação, verificações e receita da plataforma"
      hideRightSidebar
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'overview' as const, label: 'Visão Geral' },
            { id: 'users' as const, label: `Usuários (${adminUsers.length})` },
            { id: 'verifications' as const, label: `Verificações (${pendingVerifs})` },
            { id: 'moderation' as const, label: `Denúncias (${openReports})` },
            { id: 'payments' as const, label: 'Assinaturas e Pagamentos' },
            { id: 'roles' as const, label: 'Cargos Admin' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`min-h-[40px] px-4 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                tab === item.id
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-ink-muted hover:bg-lavender/60 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Usuários cadastrados', value: '48.920', delta: '+8,4% este mês', icon: Users, romantic: false },
                { label: 'Usuários ativos (DAU)', value: '19.410', delta: '39,6% da base total', icon: BadgeCheck, romantic: false },
                { label: 'Novos cadastros (7d)', value: '1.240', delta: '+142 hoje', icon: Users, romantic: false },
                { label: 'Matches acumulados', value: '312.840', delta: '+4.920 esta semana', icon: Heart, romantic: true },
                { label: 'Mensagens enviadas / dia', value: '94.300', delta: 'Média 18,4 por match', icon: MessageCircle, romantic: false },
                { label: 'Receita mensal (MRR)', value: 'R$ 184.620', delta: '+12,1% vs mês anterior', icon: CreditCard, romantic: false },
              ].map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.label}
                    className="p-5 rounded-2xl bg-surface border border-border flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-medium text-ink-muted">{kpi.label}</p>
                      <p className="font-display text-2xl font-bold text-ink mt-1 tabular-nums">
                        {kpi.value}
                      </p>
                      <p className="text-xs text-success font-medium mt-1">{kpi.delta}</p>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-xl border border-border flex items-center justify-center shrink-0 ${
                        kpi.romantic ? 'bg-pink/10 text-pink' : 'bg-lavender text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-3xl bg-surface border border-border">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      Crescimento de usuários e matches (6 meses)
                    </h3>
                    <p className="text-xs text-ink-muted">
                      Comparativo mensal de base cadastrada vs matches formados
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
                      Usuários
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-pink" />
                      Matches
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 sm:gap-5 items-end h-52 pt-4 border-b border-border">
                  {GROWTH_BARS.map((bar) => {
                    const userH = Math.round((bar.users / 50000) * 165);
                    const matchH = Math.round((bar.matches / 50000) * 165);
                    return (
                      <div key={bar.month} className="flex flex-col items-center gap-2 h-full justify-end">
                        <div className="flex items-end gap-1.5">
                          <div
                            className="w-4 sm:w-6 rounded-t-lg bg-primary transition-all"
                            style={{ height: `${userH}px` }}
                            title={`${bar.users.toLocaleString('pt-BR')} usuários`}
                          />
                          <div
                            className="w-4 sm:w-6 rounded-t-lg bg-pink transition-all"
                            style={{ height: `${matchH}px` }}
                            title={`${bar.matches.toLocaleString('pt-BR')} matches`}
                          />
                        </div>
                        <span className="text-xs text-ink-muted pb-2 font-mono">{bar.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-3xl bg-surface border border-border space-y-5">
                <h3 className="font-display text-base font-bold text-ink">
                  Distribuição por plano
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Free', count: '39.620 contas', pct: 81, color: 'bg-[#C4BDD4]' },
                    { label: 'Premium', count: '6.840 assinantes', pct: 14, color: 'bg-primary' },
                    { label: 'VIP', count: '2.460 assinantes', pct: 5, color: 'bg-pink' },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-ink">{item.label}</span>
                        <span className="text-ink-muted tabular-nums">
                          {item.count} · {item.pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-lavender/60 overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border text-xs text-ink-muted leading-relaxed">
                  Conversão de Free para planos pagos cresceu <strong className="text-success">+2,3 p.p.</strong> após liberação de filtros por intenção.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USER MANAGEMENT */}
        {tab === 'users' && (
          <div className="rounded-3xl bg-surface border border-border overflow-hidden">
            <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Buscar por nome, e-mail ou cidade..."
                  className="w-full min-h-[40px] pl-9 pr-4 rounded-xl bg-canvas border border-border text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {(['all', 'free', 'premium', 'vip'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTierFilter(t)}
                    className={`min-h-[36px] px-3 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      tierFilter === t
                        ? 'bg-lavender text-primary-dark'
                        : 'bg-canvas text-ink-muted hover:text-ink'
                    }`}
                  >
                    {t === 'all' ? 'Todos' : t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-canvas text-xs font-semibold text-ink-muted">
                    <th className="py-3 px-5">Usuário</th>
                    <th className="py-3 px-4">Cidade</th>
                    <th className="py-3 px-4">Plano</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Matches</th>
                    <th className="py-3 px-5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-lavender/25 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={u.avatar} name={u.name} size="sm" />
                          <div>
                            <p className="font-semibold text-ink">{u.name}</p>
                            <p className="text-xs text-ink-muted">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-ink-muted">{u.city}</td>
                      <td className="py-3 px-4 font-semibold uppercase text-xs text-primary">
                        {u.tier}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-semibold ${
                            u.status === 'ativo'
                              ? 'text-success'
                              : u.status === 'suspenso'
                                ? 'text-error'
                                : 'text-warning'
                          }`}
                        >
                          {u.status === 'ativo'
                            ? 'Ativo'
                            : u.status === 'suspenso'
                              ? 'Suspenso'
                              : 'Pendente'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums">
                        {u.matchesCount}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => toggleAdminUserStatus(u.id)}
                          className="min-h-[34px] px-3 rounded-lg border border-border bg-surface hover:bg-lavender/60 text-xs font-semibold text-ink transition-colors"
                        >
                          {u.status === 'suspenso' ? 'Reativar' : 'Suspender'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROFILE VERIFICATIONS */}
        {tab === 'verifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {adminVerifications.map((verif) => (
              <div
                key={verif.id}
                className="p-5 rounded-3xl bg-surface border border-border flex items-start gap-4"
              >
                <img
                  src={verif.profilePhoto}
                  alt={verif.userName}
                  referrerPolicy="no-referrer"
                  className="w-24 h-32 rounded-2xl object-cover border border-border shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-ink truncate">
                      {verif.userName}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                      {verif.confidence}% match facial
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    {verif.city} · {verif.submittedAt}
                  </p>
                  <p className="text-xs text-ink bg-lavender/45 p-2.5 rounded-xl border border-border">
                    Gesto solicitado: {verif.poseInstruction}
                  </p>

                  {verif.status === 'pendente' ? (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleVerificationDecision(verif.id, 'aprovado')}
                        className="flex-1 min-h-[38px] rounded-xl bg-success hover:bg-[#15803D] text-white text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Aprovar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerificationDecision(verif.id, 'rejeitado')}
                        className="flex-1 min-h-[38px] rounded-xl border border-border bg-surface hover:bg-error/5 text-error text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Rejeitar</span>
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`text-xs font-semibold pt-2 ${
                        verif.status === 'aprovado' ? 'text-success' : 'text-error'
                      }`}
                    >
                      Decisão registrada: {verif.status}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REPORTS & CONTENT MODERATION */}
        {tab === 'moderation' && (
          <div className="space-y-4">
            {adminReports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-3xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        rep.severity === 'alta' ? 'text-error' : 'text-warning'
                      }`}
                    />
                    <span className="font-display text-sm font-bold text-ink">
                      Denúncia contra {rep.reportedUser}
                    </span>
                    <span className="text-xs text-ink-muted">
                      por {rep.reportedBy} · {rep.createdAt}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-ink">{rep.reason}</p>
                  <p className="text-xs text-ink-muted">{rep.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {rep.status === 'aberto' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleReportDecision(rep.id, 'resolvido')}
                        className="min-h-[40px] px-4 rounded-xl bg-error hover:bg-[#B91C1C] text-white text-xs font-semibold transition-colors"
                      >
                        Aplicar bloqueio
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReportDecision(rep.id, 'arquivado')}
                        className="min-h-[40px] px-4 rounded-xl border border-border bg-surface hover:bg-lavender/60 text-xs font-semibold text-ink transition-colors"
                      >
                        Arquivar
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-success capitalize">
                      Status: {rep.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBSCRIPTION & PAYMENT MONITORING */}
        {tab === 'payments' && (
          <div className="rounded-3xl bg-surface border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-canvas text-xs font-semibold text-ink-muted">
                    <th className="py-3.5 px-5">Fatura</th>
                    <th className="py-3.5 px-4">Assinante</th>
                    <th className="py-3.5 px-4">Plano / Ciclo</th>
                    <th className="py-3.5 px-4">Método</th>
                    <th className="py-3.5 px-4">Data</th>
                    <th className="py-3.5 px-4 text-right">Valor</th>
                    <th className="py-3.5 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {adminPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-lavender/25 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-xs text-ink-muted">{pay.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-ink">{pay.userName}</td>
                      <td className="py-3.5 px-4 text-ink">
                        {pay.plan.toUpperCase()} · {pay.cycle}
                      </td>
                      <td className="py-3.5 px-4 text-ink-muted">{pay.method}</td>
                      <td className="py-3.5 px-4 text-ink-muted">{pay.date}</td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold">
                        R$ {pay.amount.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <span
                          className={`text-xs font-semibold ${
                            pay.status === 'pago' ? 'text-success' : 'text-error'
                          }`}
                        >
                          {pay.status === 'pago' ? 'Pago' : 'Estornado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADMIN ROLES & PERMISSIONS */}
        {tab === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ADMIN_ROLES.map((item) => (
              <div
                key={item.role}
                className="p-6 rounded-3xl bg-surface border border-border space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-base font-bold text-ink">
                      {item.role}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-ink-muted">{item.members}</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{item.permissions}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
