import { Container } from './Section';
import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--rule)' }}>
      <Container width="wide">
        <div
          className="flex flex-col gap-2 text-[length:var(--text-small)] sm:flex-row sm:items-center sm:justify-between"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>
            {profile.name} — Operations and product delivery, {profile.location}
          </span>
          <span>© {new Date().getFullYear()} · Built with Next.js</span>
        </div>
      </Container>
    </footer>
  );
}
