import React from 'react';
import { History, Shield, CheckCircle2, XCircle, Ban, Star, Trash2, Edit } from 'lucide-react';

export interface AuditLogEntry {
  id: string;
  action: 'approve_listing' | 'reject_listing' | 'toggle_featured' | 'delete_listing' | 'change_role' | 'ban_user' | 'unban_user' | 'broadcast_update';
  details: string;
  actor: string;
  timestamp: number;
}

interface AdminAuditTabProps {
  logs: AuditLogEntry[];
  onClearLogs?: () => void;
}

export const AdminAuditTab: React.FC<AdminAuditTabProps> = ({ logs, onClearLogs }) => {
  const getActionIcon = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'approve_listing':
        return <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />;
      case 'reject_listing':
        return <XCircle className="w-4 h-4 text-rose-400" />;
      case 'toggle_featured':
        return <Star className="w-4 h-4 text-[#8A2BE2]" />;
      case 'ban_user':
      case 'unban_user':
        return <Ban className="w-4 h-4 text-amber-400" />;
      case 'delete_listing':
        return <Trash2 className="w-4 h-4 text-rose-400" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#00E5FF]" />
            Administrative Operations & Security Trail
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Real-time audit log of approvals, role updates, deletions and moderation events in this session.
          </p>
        </div>
        {logs.length > 0 && onClearLogs && (
          <button
            onClick={onClearLogs}
            className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-colors"
          >
            Clear Session Logs
          </button>
        )}
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                {getActionIcon(log.action)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{log.details}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">By {log.actor}</p>
              </div>
            </div>

            <span className="text-[11px] text-gray-500 font-mono shrink-0">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="py-16 text-center rounded-3xl bg-white/[0.01] border border-dashed border-white/10 text-gray-500">
            <History className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold text-white">No Moderation Events Recorded Yet</p>
            <p className="text-xs text-gray-500 mt-1">Moderation operations performed during this session will stream here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
