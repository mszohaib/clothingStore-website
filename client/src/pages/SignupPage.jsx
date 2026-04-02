import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Input } from '../components/ui/Input.jsx';

export function SignupPage() {
  return (
    <Card className="w-full max-w-md border-neutral-200 shadow-lg dark:border-neutral-800">
      <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">Create account</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Join ThriftVerse — Supabase auth in Step 9.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input name="full_name" label="Full name" placeholder="Your name" autoComplete="name" />
        <Input name="email" type="email" label="Email" placeholder="you@example.com" autoComplete="email" />
        <Input name="password" type="password" label="Password" placeholder="••••••••" autoComplete="new-password" />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
