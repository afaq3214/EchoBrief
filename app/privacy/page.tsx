import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";


const PrivacyPolicyPage = () => (
    <>
        <Header />
        <main style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
            <h1>Privacy Policy</h1>
            <p>
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or interact
        </p>
        <ul>
            <li>To display relevant advertisements</li>
            <li>To analyze website usage and improve our services</li>
        </ul>
        <h2>Third-Party Links</h2>
        <p>
            Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites.
        </p>
        <h2>Changes to This Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. Please review this page periodically for any changes.
        </p>
        <h2>Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us.
        </p>
    
    </main>
    <Footer/>
    </>
);

export default PrivacyPolicyPage;