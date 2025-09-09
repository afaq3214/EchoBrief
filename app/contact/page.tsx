import AdBanner from "@/components/ad-banner";
import Header from "@/components/header";
import React from "react";
import Footer from "@/components/footer";

const Contact = () => (
    <div  className="min-h-screen bg-background">
         <Header />
        
              <div className="container mx-auto px-4 py-4 flex justify-center">
                <AdBanner size="leaderboard" className="hidden md:block" />
                <AdBanner size="mobile-banner" className="md:hidden" />
              </div>
        
        <h1>Contact Us</h1>
        <p>
            We'd love to hear from you! Please reach out using the details below.
        </p>
        <section style={{ marginTop: "2rem" }}>
            <h2>Email</h2>
            <p>
                <a href="mailto:info@newswebsite.com">info@echobrief.com</a>
            </p>
            <h2>Phone</h2>
            <p>
                <a href="tel:+1234567890">+92 335049 5057</a>
            </p>
            <h2>Address</h2>
            <p>
                123 News Street<br />
                Cityville, Country 12345
            </p>
        </section>
        <Footer/>
    </div>
);

export default Contact;