import { signInWithGoogle } from '@/lib/actions';
import { Button } from './ui/button';

export function AuthButton() {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit">Sign In with Google</Button>
    </form>
  );
}
