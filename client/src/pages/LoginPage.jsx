import { Card } from '../components/ui/Card.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <Card className="w-full max-w-md border-neutral-200 shadow-lg dark:border-neutral-800">
      <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">Welcome back</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Sign in with email — wiring in Step 9.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input name="email" type="email" label="Email" placeholder="you@example.com" autoComplete="email" />
        <Input name="password" type="password" label="Password" placeholder="••••••••" autoComplete="current-password" />
        <Button type="submit" className="w-full">
          Sign in
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
