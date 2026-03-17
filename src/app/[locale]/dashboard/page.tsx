import { unstable_setRequestLocale } from 'next-intl/server';
import { ProtectedRoute } from '@/components/protected-route';
import { UserDashboard } from '@/components/user-dashboard';

interface Props {
  params: { locale: string };
}

export default function DashboardPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  );
}
