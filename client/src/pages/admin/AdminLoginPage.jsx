import { Card } from '../../components/ui/Card.jsx';
import { Input } from '../../components/ui/Input.jsx';
import { Button } from '../../components/ui/Button.jsx';

export function AdminLoginPage() {
  return (
    <Card className="w-full max-w-md border-neutral-200 shadow-lg dark:border-neutral-800">
      <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">Admin</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Staff sign-in — Step 10.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input name="email" type="email" label="Email" placeholder="admin@thriftverse.pk" autoComplete="username" />
        <Input name="password" type="password" label="Password" placeholder="••••••••" autoComplete="current-password" />
        <Button type="submit" className="w-full">
          Sign in to dashboard
        </Button>
      </form>
    </Card>
  );
}
