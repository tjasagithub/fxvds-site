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
              <p>Welcome to FXVDS. These Terms of Service ("Terms") govern your use of our website, products, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.</p>
              
              <h3 className="text-2xl font-semibold text-white mt-8">1. Service Description</h3>
              <p>FXVDS provides virtual dedicated servers (VDS) and related infrastructure for the purpose of hosting third-party trading software, such as MetaTrader (MT4/MT5). FXVDS does not provide financial services, investment advice, brokerage services, or trading software.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">2. Eligibility</h3>
              <p>You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use our Services.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">3. Account Registration</h3>
              <p>You agree to provide accurate and complete information when creating an account and to keep your login credentials secure. You are solely responsible for all activities that occur under your account.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">4. Payments and Billing</h3>
              <p>Payments for our Services are processed via our third-party payment processor, Stripe. By providing a payment method, you authorize us to charge you for the selected subscription plan. Subscriptions automatically renew at the end of each billing cycle unless cancelled by you.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">5. Free Trial</h3>
              <p>If a free trial is offered, it will automatically convert to a paid subscription at the end of the trial period unless you cancel it beforehand. You are responsible for canceling your trial to avoid incurring charges.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">6. Cancellations</h3>
              <p>You may cancel your subscription at any time through your account dashboard. Your Service will remain active until the end of the current billing period. We do not offer refunds or credits for partial months or unused service.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">7. Dedicated IPs & Add-Ons</h3>
              <p>Optional add-ons, such as Dedicated IPs and Daily Backups, are billed monthly as part of your subscription. Backups are provided on a best-effort basis and only if the add-on has been purchased and is active.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">8. Service Availability</h3>
              <p>FXVDS aims for maximum uptime but does not guarantee uninterrupted or error-free service. Scheduled maintenance, network issues, or other unforeseen events may cause temporary outages.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">9. Data & Backups</h3>
              <p>You are solely responsible for your data. FXVDS does not automatically back up user data unless the Daily Backup add-on is purchased. Even with this add-on, we strongly recommend you maintain your own separate backups.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">10. Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, FXVDS is not liable for any financial losses, trading losses, data loss, or other direct or consequential damages arising from the use or inability to use our Services. We do not guarantee the performance or reliability of any third-party trading software installed on the VDS.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">11. Changes to the Service</h3>
              <p>We reserve the right to modify, suspend, or discontinue our Services at any time, with or without notice. Prices for all Services are subject to change with 30 days notice from us.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">12. Changes to Terms</h3>
              <p>We may update these Terms from time to time. Your continued use of the Services after any changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically.</p>

              <h3 className="text-2xl font-semibold text-white mt-8">13. Contact</h3>
              <p>For any questions about these Terms, please contact us at <a href="mailto:info@fxvds.com">info@fxvds.com</a>.</p>
            </div>
          </section>

          <section id="cookies" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">Cookie Policy</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too. This policy explains what cookies are and how we use them.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">1. What are cookies?</h3>
                <p>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>
                <p>The cookie-related information is not used to personally identify you, and the data is fully under our control. These cookies are not used for any purpose other than those described here.</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8">2. How we use cookies</h3>
                <p>We use cookies to enhance your browsing experience by:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site. Disabling these cookies may affect site functionality.</li>
                    <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you have made in the past, like what language you prefer or your user name for automatic login.</li>
                    <li><strong>Performance/Analytics Cookies:</strong> We use these cookies to collect information about how you use our website, such as which pages you visited and which links you clicked on. This information is aggregated and anonymized and is used to improve our website's functionality.</li>
                </ul>
                <p>Enabling these cookies is not strictly necessary for the website to work but it will provide you with a better browsing experience.</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8">3. How to control cookies</h3>
                <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
                <p>For more details, see <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">4. Changes to this policy</h3>
                <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.</p>
            </div>
          </section>

          <section id="impressum" className="mb-16 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">Impressum / Legal Notice</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>Information according to § 5 TMG.</p>
                
                <p><strong>Company Description:</strong><br/>
                FXVDS provides high-performance virtual dedicated servers (VDS) for traders and software hosting.<br/>
                FXVDS does not provide financial services, investment advice, or brokerage services.</p>
                
                <p><strong>Responsible for content:</strong><br/>
                FXVDS<br/>
                Email: <a href="mailto:info@fxvds.com">info@fxvds.com</a><br/>
                Website: <a href="https://fxvds.com" target="_blank" rel="noopener noreferrer">https://fxvds.com</a></p>

                <h3 className="text-2xl font-semibold text-white mt-8">Liability for links</h3>
                <p>Our website may contain links to external third-party websites. We have no influence over the content of those external websites and therefore cannot assume any liability for their content. The respective provider or operator of the linked pages is always responsible for their content. At the time of linking, the linked pages were checked for possible legal violations. If we become aware of any legal infringements, such links will be removed immediately.</p>

                <h3 className="text-2xl font-semibold text-white mt-8">Copyright</h3>
                <p>All content and works published on this website, including text, graphics, and layout, are protected by copyright law. Any reproduction, editing, distribution, or use beyond the limits of copyright law requires prior written consent. Downloads and copies of this website are permitted for private, non-commercial use only.</p>
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
