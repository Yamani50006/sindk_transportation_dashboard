import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../../components/ui';
import { Truck, Lock, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError('خطأ في البريد الإلكتروني أو كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] px-6 z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-4 shadow-lg shadow-primary-600/20">
            <Truck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">سندك للأسطول</h1>
          <p className="text-slate-500 font-medium">نظام إدارة النقل والعمليات المتكامل</p>
        </div>

        <Card className="p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">تسجيل الدخول</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@sndak.com"
              required
              icon={<Mail size={18} />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              required
              icon={<Lock size={18} />}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={error}
            />

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">تذكرني</span>
              </label>
              <button type="button" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                نسيت كلمة المرور؟
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  جاري تسجيل الدخول...
                </>
              ) : 'دخول'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              ليس لديك حساب؟{' '}
              <button className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                تواصل مع الإدارة
              </button>
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">جميع الحقوق محفوظة © {new Date().getFullYear()} سندك للنقل</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
