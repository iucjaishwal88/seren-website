import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersClient } from '@/lib/ordersClient';
import { toast } from 'sonner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ordersClient.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await ordersClient.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Login failed');
      return;
    }
    toast.success('Welcome back!');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF8F3' }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-[#E0D8C8] p-8 space-y-5"
      >
        <div className="text-center mb-2">
          <h1 className="font-serif text-3xl text-warm-mid">Seren Admin</h1>
          <p className="font-sans text-sm text-warm-mid/60 mt-1">Sign in to manage orders & products</p>
        </div>

        <div>
          <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] text-sm focus:outline-none focus:ring-2 focus:ring-sage/30"
          />
        </div>

        <div>
          <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] text-sm focus:outline-none focus:ring-2 focus:ring-sage/30"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-sans text-sm tracking-wide transition-all disabled:opacity-50"
          style={{ background: '#9E9882' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
