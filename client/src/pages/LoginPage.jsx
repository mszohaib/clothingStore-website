import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { validateEmail, validatePassword } from '../utils/validate.js';

export function LoginPage() {
  const { user, loading, signIn, signOut, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/shop';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (loading) {
    return (
      <div className="flex min-h-[200px] w-full max-w-md items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return (
      <Card className="w-full max-w-md border-neutral-200 shadow-lg dark:border-neutral-800">
        <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">You are signed in</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{user.email}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Button type="button" onClick={() => navigate(from, { replace: true })}>
            Continue
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              await signOut();
            }}
          >
            Sign out
          </Button>
        </div>
      </Card>
    );
  }

  if (!configured) {
    return (
      <Card className="w-full max-w-md border-neutral-200 border-l-[3px] border-l-accent bg-neutral-50 shadow-lg dark:border-neutral-800 dark:border-l-accent dark:bg-neutral-950/80">
        <h1 className="font-display text-xl font-bold text-neutral-900 dark:text-white">Auth not configured</h1>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          Add <code className="rounded bg-white/80 px-1 text-xs dark:bg-neutral-900">VITE_SUPABASE_URL</code> and{' '}
          <code className="rounded bg-white/80 px-1 text-xs dark:bg-neutral-900">VITE_SUPABASE_ANON_KEY</code> to your client
          env, then restart Vite.
        </p>
        <Button to="/" className="mt-6" variant="secondary">
          Back home
        </Button>
      </Card>
    );
  }

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === 'email') setErrors((e) => ({ ...e, email: validateEmail(email) }));
    if (field === 'password') setErrors((e) => ({ ...e, password: validatePassword(password) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const next = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSubmitting(true);
    setFormError('');
    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Could not sign in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-neutral-200 shadow-lg dark:border-neutral-800">
      <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">Welcome back</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Sign in with your account.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
        {formError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {formError}
          </p>
        ) : null}
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : ''}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : ''}
        />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? <Spinner size="sm" /> : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        No account?{' '}
        <Link to="/signup" className="font-semibold text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
}
