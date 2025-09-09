import Header from '@/components/header';
import Footer from '@/components/footer';
export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use the site.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2. Use of Content</h2>
                    <p>
                        All content provided on this website is for informational purposes only. You may not reproduce, distribute, or modify any content without prior written consent.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">3. User Conduct</h2>
                    <p>
                        You agree not to use the website for any unlawful purpose or in any way that could harm the website or its users.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">4. Disclaimer</h2>
                    <p>
                        The website is provided "as is" without warranties of any kind. We do not guarantee the accuracy or completeness of any information.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
                    <p>
                        We reserve the right to update these Terms of Service at any time. Changes will be posted on this page.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
                    <p>
                        If you have any questions about these Terms, please contact us via the information provided on our website.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}