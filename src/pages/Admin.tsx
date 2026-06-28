import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersClient } from '@/lib/ordersClient';
import { toast } from 'sonner';
import { LogOut, Plus, Pencil, Trash2, X } from 'lucide-react';

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  product_type: string;
  occasion: string | null;
  customization: string | null;
  status: string;
  created_at: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  active: boolean;
};

const STATUSES = ['pending', 'contacted', 'completed', 'cancelled'];

export default function Admin() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<'orders' | 'products'>('orders');

  useEffect(() => {
    ordersClient.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin/login', { replace: true });
      else setChecking(false);
    });
    const { data: sub } = ordersClient.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate('/admin/login', { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await ordersClient.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  if (checking) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF8F3' }}>Loading...</div>;

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F3' }}>
      <header className="border-b border-[#E0D8C8] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-warm-mid">Seren Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0D8C8] text-sm hover:bg-[#FAF8F3]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex gap-2">
          {(['orders', 'products'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm capitalize border-b-2 transition-colors ${
                tab === t ? 'border-sage text-warm-mid font-medium' : 'border-transparent text-warm-mid/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'orders' ? <OrdersTab /> : <ProductsTab />}
      </main>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await ordersClient
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (error) {
      toast.error('Failed to load orders');
      return;
    }
    setOrders((data as Order[]) || []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const prev = orders;
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    const { error } = await ordersClient.from('orders').update({ status }).eq('id', id);
    if (error) {
      toast.error('Could not update status');
      setOrders(prev);
    } else {
      toast.success('Status updated');
    }
  };

  if (loading) return <p className="text-warm-mid/60">Loading orders...</p>;
  if (!orders.length) return <p className="text-warm-mid/60">No orders yet.</p>;

  return (
    <div className="bg-white rounded-2xl border border-[#E0D8C8] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#FAF8F3] text-left text-xs uppercase tracking-wider text-warm-mid/60">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Occasion</th>
            <th className="px-4 py-3">Details</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-[#E0D8C8] align-top">
              <td className="px-4 py-3 whitespace-nowrap text-warm-mid/70">
                {new Date(o.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3 font-medium">{o.customer_name}</td>
              <td className="px-4 py-3">
                <a href={`tel:${o.customer_phone}`} className="text-sage hover:underline">{o.customer_phone}</a>
              </td>
              <td className="px-4 py-3">{o.product_type}</td>
              <td className="px-4 py-3">{o.occasion || '—'}</td>
              <td className="px-4 py-3 max-w-xs text-warm-mid/70">{o.customization || '—'}</td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="px-2 py-1 rounded-md border border-[#E0D8C8] bg-white text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await ordersClient
      .from('products')
      .select('*')
      .order('name', { ascending: true });
    setLoading(false);
    if (error) {
      toast.error('Failed to load products. Make sure a "products" table exists.');
      return;
    }
    setProducts((data as Product[]) || []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      name: editing.name?.trim(),
      price: Number(editing.price) || 0,
      image_url: editing.image_url?.trim() || null,
      description: editing.description?.trim() || null,
      active: editing.active ?? true,
    };
    if (!payload.name) {
      toast.error('Name is required');
      return;
    }
    const res = editing.id
      ? await ordersClient.from('products').update(payload).eq('id', editing.id)
      : await ordersClient.from('products').insert(payload);
    if (res.error) {
      toast.error('Save failed');
      return;
    }
    toast.success('Saved');
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const { error } = await ordersClient.from('products').delete().eq('id', id);
    if (error) return toast.error('Delete failed');
    toast.success('Deleted');
    load();
  };

  const toggleActive = async (p: Product) => {
    const { error } = await ordersClient.from('products').update({ active: !p.active }).eq('id', p.id);
    if (error) return toast.error('Could not update');
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl text-warm-mid">Products</h2>
        <button
          onClick={() => setEditing({ name: '', price: 0, image_url: '', description: '', active: true })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm"
          style={{ background: '#9E9882' }}
        >
          <Plus size={16} /> Add product
        </button>
      </div>

      {loading ? (
        <p className="text-warm-mid/60">Loading products...</p>
      ) : !products.length ? (
        <p className="text-warm-mid/60">No products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E0D8C8] overflow-hidden">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-[#FAF8F3]" />
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-warm-mid">{p.name}</h3>
                  <span className="font-medium">₹{p.price}</span>
                </div>
                {p.description && <p className="text-sm text-warm-mid/60 line-clamp-2">{p.description}</p>}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={p.active} onChange={() => toggleActive(p)} />
                    Active
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-[#FAF8F3]" title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => remove(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl">{editing.id ? 'Edit product' : 'New product'}</h3>
              <button onClick={() => setEditing(null)}><X size={18} /></button>
            </div>
            <Field label="Name">
              <input
                value={editing.name || ''}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Price (₹)">
              <input
                type="number"
                value={editing.price ?? 0}
                onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                className="input"
              />
            </Field>
            <Field label="Image URL">
              <input
                value={editing.image_url || ''}
                onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Description">
              <textarea
                value={editing.description || ''}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="input"
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.active ?? true}
                onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
              />
              Active
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-[#E0D8C8] text-sm">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded-lg text-white text-sm" style={{ background: '#9E9882' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`.input{width:100%;padding:.6rem .75rem;border:1px solid #E0D8C8;border-radius:.75rem;background:#FAF8F3;font-size:.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px rgba(158,152,130,.3)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  );
}
