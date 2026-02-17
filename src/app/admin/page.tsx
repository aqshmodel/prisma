import type { Metadata } from 'next';
import { AdminPage } from '../../features/admin/AdminPage';

export const metadata: Metadata = {
    title: 'Prisma Admin',
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return <AdminPage />;
}
