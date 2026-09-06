import { useState } from 'react';
import { refundApi } from '../../api/endpoints.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { AsyncBoundary } from '../../components/StateViews.jsx';
import { Badge, currency } from '../../components/ui.jsx';

const TONE = { pending: 'warn', approved: 'success', rejected: 'neutral', failed: 'danger' };

/** F16 refund extension — admin review and execution of simulated refunds. */
export default function RefundsManagement() {
  const toast = useToast();
  const { data, loading, error, reload } = useAsync(() => refundApi.list(), []);
  const [busy, setBusy] = useState(null);
  const refunds = data?.data || [];

  const act = async (id, fn, label) => {
    setBusy(id);
    try {
      await fn();
      toast.success(label);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  const process = (id) => act(id, () => refundApi.process(id, { simulate: 'success' }), 'Refund processed');
  const reject = (id) => {
    const note = window.prompt('Reason for rejecting this refund (optional)') ?? '';
    return act(id, () => refundApi.reject(id, { note }), 'Refund rejected');
  };

  return (
    <>
      <div className="row between">
        <h1>Refunds</h1>
        <button className="btn btn-sm btn-ghost" onClick={reload}>Refresh</button>
      </div>
      <p className="muted">Simulated refunds (F16 extension). Approving reverses loyalty points and marks the payment refunded; net revenue excludes refunded payments.</p>

      <AsyncBoundary loading={loading} error={error} isEmpty={refunds.length === 0} onRetry={reload} emptyProps={{ title: 'No refund requests', emoji: '💸' }}>
        <div className="table-wrap card mt">
          <table>
            <thead><tr><th>Customer</th><th>Amount</th><th>Reason</th><th>Status</th><th>Ref</th><th>Actions</th></tr></thead>
            <tbody>
              {refunds.map((r) => (
                <tr key={r._id}>
                  <td>{r.customer?.name || '—'}<div className="text-sm muted">{r.customer?.email}</div></td>
                  <td>{currency(r.amount)}</td>
                  <td style={{ maxWidth: 220 }}>{r.reason || <span className="muted">—</span>}</td>
                  <td><Badge tone={TONE[r.status] || 'neutral'}>{r.status}</Badge></td>
                  <td className="text-sm muted">{r.simulatedRef || '—'}</td>
                  <td className="row">
                    {r.status === 'pending' ? (
                      <>
                        <button className="btn btn-sm" onClick={() => process(r._id)} disabled={busy === r._id}>{busy === r._id ? '…' : 'Process'}</button>
                        <button className="btn btn-sm btn-ghost" onClick={() => reject(r._id)} disabled={busy === r._id}>Reject</button>
                      </>
                    ) : (
                      <span className="text-sm muted">{r.pointsReversed || r.pointsRestored ? `−${r.pointsReversed} / +${r.pointsRestored} pts` : 'Decided'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AsyncBoundary>
    </>
  );
}
