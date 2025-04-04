// app/dashboard/layout.tsx
import MobileBottomNav from '../components/layout/MobileBottomNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {children}
      <MobileBottomNav />
    </div>
  );
}