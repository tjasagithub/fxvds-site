'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

const LegalPage = () => {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-white mb-16 text-center">Legal Information</h1>

          <section id="privacy-policy" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">Privacy Policy</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
              <p>This privacy policy has been compiled to better serve those who are concerned with how their ‘Personally Identifiable Information’ (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.</p>
              
              <h3 className="text-2xl font-semibold text-white mt-8">What personal information do we collect from the people that visit our blog, website or app?</h3>
              <p>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, credit card information or other details to help you with your experience.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">When do we collect information?</h3>
              <p>We collect information from you when you place an order, subscribe to a newsletter, fill out a form or enter information on our site.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">How do we use your information?</h3>
              <p>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
                <li>To improve our website in order to better serve you.</li>
                <li>To allow us to better service you in responding to your customer service requests.</li>
                <li>To quickly process your transactions.</li>
                <li>To send periodic emails regarding your order or other products and services.</li>
                <li>To follow up with them after correspondence (live chat, email or phone inquiries)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white mt-8">How do we protect your information?</h3>
              <p>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. We use regular Malware Scanning. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information. All transactions are processed through a gateway provider and are not stored or processed on our servers.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">Do we use ‘cookies’?</h3>
              <p>Yes. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">Third-party disclosure</h3>
              <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">Third-party links</h3>
              <p>We do not include or offer third-party products or services on our website.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">GDPR</h3>
              <p>If you are a resident of the European Union, you have the right to access the personal information we hold about you, to port it to a new service, and to ask that your personal information be corrected, updated, or erased. If you would like to exercise these rights, please contact us.</p>
            </div>
          </section>

          <section id="terms-of-service" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">Terms of Service</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
              <p>Welcome to FXVDS. These Terms of Service ("Terms") govern your use of our website, products, and services (collectively, the "Services"). By using our Services, you agree to these Terms.</p>
              
              <h3 className="text-2xl font-semibold text-white mt-8">1. Service Description</h3>
              <p>FXVDS provides virtual dedicated servers (VDS) for hosting trading software such as MetaTrader (MT4/MT5). FXVDS does not provide financial services, investment advice, or brokerage services.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">2. Eligibility</h3>
              <p>Users must be at least 18 years old to use our Services.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">3. Account Registration</h3>
              <p>You agree to provide accurate and complete information when creating an account and to keep your login credentials secure. You are responsible for all activities that occur under your account.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">4. Payments and Billing</h3>
              <p>Payments for our Services are processed via Stripe. By providing a payment method, you authorize us to charge you for the selected subscription plan. Subscriptions renew automatically at the end of each billing cycle unless cancelled.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">5. Free Trial</h3>
              <p>If a free trial is offered, it will automatically convert to a paid subscription at the end of the trial period unless you cancel it beforehand. You are responsible for canceling your trial to avoid charges.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">6. Cancellations</h3>
              <p>You may cancel your subscription at any time. Your service will remain active until the end of the current billing period. We do not offer refunds for partial months or unused service.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">7. Dedicated IPs & Add-Ons</h3>
              <p>Optional add-ons, such as Dedicated IPs and Daily Backups, are billed monthly as part of your subscription. Backups are provided on a best-effort basis only if the add-on has been purchased.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">8. Service Availability</h3>
              <p>FXVDS aims for maximum uptime but does not guarantee uninterrupted service. Scheduled maintenance, network issues, or other unforeseen events may cause temporary outages.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">9. Data & Backups</h3>
              <p>You are solely responsible for your data. FXVDS does not automatically back up user data unless the Daily Backup add-on is purchased. Even with the add-on, we recommend you maintain your own backups.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">10. Limitation of Liability</h3>
              <p>FXVDS is not liable for any financial losses, trading losses, data loss, or other consequential damages arising from the use of our Services. We do not guarantee the performance or reliability of any third-party trading software.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">11. Changes to the Service</h3>
              <p>We reserve the right to modify or discontinue our Services at any time, with or without notice.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">12. Changes to Terms</h3>
              <p>We may update these Terms from time to time. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">13. Contact</h3>
              <p>For any questions about these Terms, please contact us at <a href="mailto:info@fxvds.com">info@fxvds.com</a>.</p>
            </div>
          </section>

          <section id="cookies" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">Cookies</h2>
             <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">What are cookies?</h3>
                <p>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">How do we use cookies?</h3>
                <p>We use cookies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences</li>
                    <li>Operate our shopping cart</li>
                    <li>Collect anonymous statistics to improve our website's functionality</li>
                </ul>
                <p>Enabling these cookies is not strictly necessary for the website to work but it will provide you with a better browsing experience. You can delete or block these cookies, but if you do that some features of this site may not work as intended.</p>
                <p>The cookie-related information is not used to identify you personally and the pattern data is fully under our control. These cookies are not used for any purpose other than those described here.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">How to control cookies</h3>
                <p>You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
            </div>
          </section>

          <section id="impressum" className="mb-16 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">Impressum</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>Information according to § 5 TMG.</p>
                
                <p><strong>Company Description:</strong><br/>
                We offer professional traders high-performance virtual dedicated servers (VDS) to guarantee reliable, low-latency execution for their trading platforms and automated strategies. Our infrastructure is specifically designed to meet the demands of forex trading, including high-frequency trading and the use of expert advisors.</p>
                
                <p><strong>Responsible for the content:</strong><br/>
                info@fxvds.com</p>

                <h3 className="text-2xl font-semibold text-white mt-8">Liability for links</h3>
                <p>Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. If we become aware of any legal infringements, we will remove such links immediately.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">Copyright</h3>
                <p>The contents and works on these pages created by the site operators are subject to German copyright law. The reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.</p>
            </div>
          </section>
          
          <div className="text-center mt-24">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-primary hover:underline">
              Back to top
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
