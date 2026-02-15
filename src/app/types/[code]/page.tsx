import type { Metadata } from 'next';
import { TypeDetailPage } from '../../../features/type-detail/TypeDetailPage';
import { OS_CONTENT } from '../../../features/result/data/content-os';

type Props = {
    params: { code: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const code = params.code;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];

    if (!data) {
        return {
            title: 'Type Not Found | Aqsh Prisma',
        };
    }

    return {
        title: `${data.name} (${data.code}) | Aqsh Prisma`,
        description: data.catchphrase,
        openGraph: {
            title: `${data.name} (${data.code}) | Aqsh Prisma`,
            description: data.catchphrase,
            // images would go here
        }
    };
}

export function generateStaticParams() {
    return Object.keys(OS_CONTENT).map((code) => ({
        code: code,
    }));
}

export default function Page() {
    return <TypeDetailPage />;
}
