import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Textarea } from '../components/ui/Textarea.jsx';
import { validateEmail, validateMessage, validateName } from '../utils/validate.js';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const runValidate = () => {
    const next = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === 'name') setErrors((e) => ({ ...e, name: validateName(name) }));
    if (field === 'email') setErrors((e) => ({ ...e, email: validateEmail(email) }));
    if (field === 'message') setErrors((e) => ({ ...e, message: validateMessage(message) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!runValidate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/12 text-accent ring-1 ring-accent/25 dark:bg-accent/15 dark:text-accent-muted">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.75} />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-neutral-900 dark:text-white">Message received</h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Thanks for reaching out. We read every note and typically reply within one to two business days. If your
            question is urgent, mention your order number in a follow-up email.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button type="button" onClick={() => setSubmitted(false)}>
              Send another
            </Button>
            <Button to="/shop" variant="secondary">
              Continue shopping
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Contact</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Talk to the team
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Sizing help, order updates, collaborations — use the form and we will get back to you. For policy details, see{' '}
            <Link to="/policy" className="font-semibold text-accent hover:underline">
              policies
            </Link>{' '}
            and{' '}
            <Link to="/faq" className="font-semibold text-accent hover:underline">
              FAQ
            </Link>
            .
          </p>

          <ul className="mt-10 space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <span>
                Prefer email? Send a note from the address you use at checkout so we can match your order faster.
              </span>
            </li>
            <li className="flex gap-3">
              <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <span>
                Instagram DMs work for quick questions — see the link in the footer.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <Input
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              autoComplete="name"
              error={touched.name ? errors.name : ''}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              autoComplete="email"
              error={touched.email ? errors.email : ''}
            />
            <Textarea
              name="message"
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => handleBlur('message')}
              placeholder="How can we help?"
              error={touched.message ? errors.message : ''}
            />
            <Button type="submit" className="w-full" size="lg">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
