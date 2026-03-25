import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import { PUBLISHER_JSON_LD, buildUrl } from '@/lib/constants/site-config';

export const TermsOfServiceEnPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service | Aqsh Prisma',
        description: 'Terms of Service for using the Aqsh Prisma diagnostic platform.',
        url: buildUrl('/en/terms'),
        publisher: PUBLISHER_JSON_LD,
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'TOP',
                    item: buildUrl('/en'),
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Terms of Service',
                    item: buildUrl('/en/terms'),
                },
            ],
        },
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header (Breadcrumb UI) */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/en" className="inline-flex items-center text-sm text-slate-500 hover:text-prisma-600 font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Hero Title */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-prisma-50 border border-prisma-100 flex items-center justify-center">
                            <Scale className="w-6 h-6 text-prisma-600" />
                        </div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
                            Terms of Service
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                        Terms of Service
                    </h1>
                </div>

                {/* Content Body */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                    <div className="prose prose-slate md:prose-lg max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3 prose-h2:mt-12 prose-a:text-prisma-600 hover:prose-a:text-prisma-700 prose-li:marker:text-prisma-500">
                        <p>
                            These Terms of Service (hereinafter referred to as the "Terms") define the conditions for using "Aqsh Prisma" (hereinafter referred to as the "Service") provided by Aqsh Co., Ltd. (hereinafter referred to as the "Company"). All users of the Service (hereinafter referred to as "Users") must agree to these Terms before using the Service.
                        </p>

                        <h2>Article 1 (Application)</h2>
                        <ol>
                            <li>These Terms shall apply to all relationships concerning the use of the Service between the User and the Company.</li>
                            <li>The Company may establish rules, guidelines, and other regulations (hereinafter referred to as "Individual Regulations") for the Service in addition to these Terms. Regardless of their name, such Individual Regulations shall constitute a part of these Terms.</li>
                            <li>If the contents of these Terms conflict with the Individual Regulations in the preceding paragraph, the provisions of the Individual Regulations shall take precedence unless otherwise specified.</li>
                        </ol>

                        <h2>Article 2 (Service Provision)</h2>
                        <ol>
                            <li>The Service is a platform providing personality diagnosis tests and results. The Service does not require user registration and can generally be used free of charge.</li>
                            <li>Diagnostic results provided by the Service are visual representations of behavioral tendencies based on the Company's proprietary algorithms and statistical data. They are extremely logical but are intended to support self-reflection and communication. They do not guarantee the user's talent, future success, absolute aptitude, or serve as medical/clinical psychological diagnoses.</li>
                            <li>The Company may change the content of the Service or suspend the provision of the Service without prior notice to the User. The Company assumes no responsibility for any damages caused by this.</li>
                        </ol>

                        <h2>Article 3 (Prohibited Actions)</h2>
                        <p>Users must not engage in the following acts when using the Service:</p>
                        <ol>
                            <li>Acts that violate laws and regulations or public order and morals.</li>
                            <li>Acts associated with criminal activity.</li>
                            <li>Acts that infringe on copyrights, trademark rights, or other intellectual property rights contained in the Service, including the contents of the Service.</li>
                            <li>Acts that destroy or interfere with the functionality of the Company's servers or networks.</li>
                            <li>Acts of commercially utilizing the information obtained from the Service without permission.</li>
                            <li>Acts that may interfere with the operation of the Company's services.</li>
                            <li>Acts of reverse engineering, decompiling, disassembling, or otherwise analyzing software or systems related to the Service.</li>
                            <li>Acts of collecting or accumulating personal information concerning other users.</li>
                            <li>Acts of collecting data automatically using means such as scraping, crawling, or bots.</li>
                            <li>Providing benefits directly or indirectly to antisocial forces in relation to the Company's services.</li>
                            <li>Other acts deemed inappropriate by the Company.</li>
                        </ol>

                        <h2>Article 4 (Suspension of Service Provision)</h2>
                        <ol>
                            <li>
                                The Company may suspend or interrupt all or part of the Service without prior notice if it is determined that any of the following events exist:
                                <ul>
                                    <li>When performing maintenance, inspection, or updating of computer systems related to the Service.</li>
                                    <li>When it becomes difficult to provide the Service due to force majeure, such as earthquakes, lightning strikes, fires, power outages, or natural disasters.</li>
                                    <li>When computers or communication lines cease to operate due to an accident.</li>
                                    <li>When the Company otherwise judges that it is difficult to provide the Service.</li>
                                </ul>
                            </li>
                            <li>The Company assumes no liability for any disadvantage or damage suffered by the User or a third party due to the suspension or interruption of the Service.</li>
                        </ol>

                        <h2>Article 5 (Disclaimer of Warranties and Limitation of Liability)</h2>
                        <ol>
                            <li>The Company makes no warranty, express or implied, that the Service is free from factual or legal defects (including safety, reliability, accuracy, completeness, effectiveness, fitness for a particular purpose, security-related faults, errors, bugs, or rights infringements).</li>
                            <li>The Company shall bear no responsibility for any damages incurred by the User due to the Service. Even if the Company assumes responsibility (e.g., if these Terms constitute a consumer contract under the Consumer Contract Act), its liability for damages arising from default or tort due to the Company's negligence (excluding gross negligence) shall be limited to direct and ordinary damages.</li>
                            <li>The Company bears no responsibility for any transactions, communications, or disputes occurring between Users or between a User and a third party regarding the Service.</li>
                        </ol>

                        <h2>Article 6 (Handling of Personal and Related Information)</h2>
                        <p>The Company shall handle the user's personal information and personal-related information acquired through the use of the Service appropriately according to the Company's "Privacy Policy."</p>

                        <h2>Article 7 (Changes to the Terms of Service)</h2>
                        <p>The Company may revise these Terms without requiring the consent of the User if it determines it to be necessary. After revision, the User's continued use of the Service shall be deemed an agreement to the revised Terms.</p>

                        <h2>Article 8 (Governing Law and Jurisdiction)</h2>
                        <ol>
                            <li>The interpretation of these Terms shall be governed by the laws of Japan.</li>
                            <li>In the event a dispute arises regarding the Service, the Tokyo District Court shall be the exclusive court of first instance.</li>
                        </ol>

                        {/* Footer Data */}
                        <div className="mt-16 pt-8 border-t border-slate-100 bg-slate-50/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-center md:text-left">
                                <span className="block text-sm font-bold text-slate-800 mb-1">Supplementary Provisions</span>
                                <span className="text-sm text-slate-500">Established and Implemented on March 9, 2026</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};
