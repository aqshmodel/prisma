import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { PUBLISHER_JSON_LD, buildUrl } from '@/lib/constants/site-config';

export const PrivacyPolicyEnPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy | Aqsh Prisma',
        description: 'Explanation regarding the handling of personal information and personal-related information (diagnostic results, behavioral history, etc.) on Aqsh Prisma.',
        url: buildUrl('/en/privacy'),
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
                    name: 'Privacy Policy',
                    item: buildUrl('/en/privacy'),
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
                            <Lock className="w-6 h-6 text-prisma-600" />
                        </div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
                            Privacy Policy
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                        Privacy Policy
                    </h1>
                </div>

                {/* Content Body */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                    <div className="prose prose-slate md:prose-lg max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3 prose-h2:mt-12 prose-a:text-prisma-600 hover:prose-a:text-prisma-700 prose-li:marker:text-prisma-500">
                        <p>
                            Aqsh Co., Ltd. (hereinafter referred to as the "Company") pays the utmost attention to respecting the privacy of Users and appropriately managing personal information and personal-related information when providing "Aqsh Prisma" (hereinafter referred to as the "Service"), a platform designed to enhance self-understanding and organizational synergy through personality diagnostics.
                        </p>

                        <h2>Article 1 (Definitions)</h2>
                        <h3>1. Personal Information</h3>
                        <p>Personal Information refers to "personal information" as defined by the Act on the Protection of Personal Information of Japan. It is information relating to a living individual that can identify a specific individual by name, date of birth, address, telephone number, contact details, or other descriptions contained therein.</p>

                        <h3>2. Personal-Related Information</h3>
                        <p>Personal-Related Information refers to information relating to a living individual that cannot identify a specific individual on its own. This includes identifiers like Cookies, IP addresses, terminal browser information, access logs, search history, analytical data, location information, behavioral history, and <strong>the diagnostic test response data and resulting diagnostic outcome inputted within the Service.</strong></p>

                        <h2>Article 2 (Purpose of Using Personal Information)</h2>
                        <p>The Company uses acquired personal information appropriately within the scope of the following purposes and does so not beyond them:</p>
                        <ol>
                            <li>For user authentication and to provide the Service to users.</li>
                            <li>To distribute or send various notices and important communications related to the use of the Service.</li>
                            <li>To respond to user inquiries and provide support.</li>
                            <li>To investigate and respond to actions violating the Terms of Service or unauthorized usage.</li>
                        </ol>

                        <h2>Article 3 (Acquisition and Purpose of Use of Personal-Related Information)</h2>
                        <p>Given the Service allows usage without mandatory membership registration, the Company acquires various "Personal-Related Information" for the following purposes. If the Company links Personal-Related Information with Personal Information provided separately by the User, such information will be treated as Personal Information in accordance with Article 2.</p>
                        <ol>
                            <li>
                                <strong>Execution of Personality Diagnostics and Data Storage</strong>
                                <ul>
                                    <li>The Service requires no membership registration and is freely accessible to all users.</li>
                                    <li>The response data and the latest diagnostic result of a personality diagnostic test executed by a User are saved <strong>only within the browser (e.g., Local Storage) on the device the User uses.</strong> The Company does not collect or store diagnostic history or result content linked to a specific individual in its own database.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Collection and Use of Statistical Data (Use of Personal-Related Information)</strong>
                                <ul>
                                    <li>As anonymous information that does not identify users individually (i.e., "who" took it), the Company retrieves and aggregates statistical data such as "when" and "what kind of diagnostic result was obtained" on its management server.</li>
                                    <li>This statistical data is used solely in "forms that do not identify individuals" for improving the Service's functionality, market research, marketing measures, and producing B2B HR content. It will never be disclosed to third parties as an individual's specific result.</li>
                                    <li>To improve diagnostic algorithm accuracy and the Service's features.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Use of Access Logs, Cookies, etc.</strong>
                                <ul>
                                    <li>To improve user convenience and manage sessions within the Service.</li>
                                    <li>To compile statistical data regarding usage status (including the use of external tools like Google Analytics (GA4) and Google Search Console).</li>
                                    <li>To utilize behavioral targeting advertising services to deliver appropriate content and ads to users.</li>
                                </ul>
                            </li>
                        </ol>

                        <h2>Article 4 (Provision of Personal Information to Third Parties)</h2>
                        <p>Except in the following cases, the Company will not provide personal information to third parties without prior consent from the User, unless permitted under the Personal Information Protection Law or other laws:</p>
                        <ol>
                            <li>When it is necessary for the protection of a person's life, body, or property, and obtaining consent is difficult.</li>
                            <li>When it is specifically necessary for improving public health or promoting the sound growth of children, and obtaining consent is difficult.</li>
                            <li>When it is necessary to cooperate with a national agency, local government, or an entity entrusted by them in executing statutory duties, and obtaining consent may impede the execution of said duties.</li>
                            <li>In cases of business succession due to a merger or other reasons, provided the information is transferred within the scope of the purpose of use.</li>
                        </ol>

                        <h2>Article 5 (Disclaimer Regarding Third-Party Provision)</h2>
                        <p>The Company assumes no responsibility for third parties obtaining personal information in the following cases:</p>
                        <ol>
                            <li>When the User reveals personal information to third parties using features of the Service or other means.</li>
                            <li>When an individual can be identified inadvertently based on arbitrary information entered by the User into the Service.</li>
                            <li>When personal information is provided by the User on external websites linked from the Service and used there.</li>
                        </ol>

                        <h2>Article 6 (Use of Statically Processed Data)</h2>
                        <p>Based on the provided personal and personal-related information, the Company may create statistical data processed to make the identification of individuals impossible. The Company may freely use such statistical data without restrictions (including publishing attributes on the Company's website or providing them to other corporations).</p>

                        <h2>Article 7 (Disclosure, Correction, and Suspension of Use of Personal Information)</h2>
                        <p>In principle, only the User themselves can request the notification of the "purpose of use," disclosure of registered personal information, correction, addition, deletion, suspension of use, or suspension of third-party provision ("Changes, etc."). However, if the Company has not assigned a User ID and identifying the subject data from the system is extremely difficult, or if the Company bears no obligation under the law, we may decline requests for such Changes, etc.</p>

                        <h2>Article 8 (Security Management Measures)</h2>
                        <p>The Company takes necessary and appropriate measures to manage personal information securely and prevent leakage, loss, or damage. When outsourcing data processing, the Company provides necessary and appropriate supervision to the entrusted party.</p>

                        <h2>Article 9 (Use by Minors)</h2>
                        <p>If the user of the Service is a minor, they shall use the Service and provide personal information only after obtaining consent from a parent or legal guardian.</p>

                        <h2>Article 10 (Changes to the Privacy Policy)</h2>
                        <p>The Company may change this Policy at any time as necessary, except as otherwise stipulated by laws or regulations. The revised Privacy Policy shall take effect from the time it is posted on the Service or the Company's website. Please review the latest Privacy Policy when using the Service.</p>

                        <h2>Contact Information</h2>
                        <p>For inquiries regarding this Policy, please contact the following:</p>
                        <p className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <strong>Aqsh Co., Ltd.</strong><br />
                            Representative Director: Takahiro Tsukada<br />
                            Email: <a href="mailto:info@aqsh.co.jp">info@aqsh.co.jp</a>
                        </p>

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
