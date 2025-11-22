import LandingPageLayout from '@/layouts/LandingPageLayout'
import Head from 'next/head'

export default function PrivacyPolicy() {
  const lastUpdated = '22-Nov-2025'

  return (
    <div className="min-h-screen bg-white text-black py-10">
      <Head>
        <title>Privacy Policy | Only Heavy</title>
        <meta name="description" content="Only Heavy Privacy Policy — how we collect, use, and protect your data." />
      </Head>

      <LandingPageLayout>
        <div className="w-full mx-auto bg-white">

            <div className='relative'>
                <h1 className="text-2xl font-bold my-5">Only Heavy - Privacy Policy</h1>
                <p className='border border-b-4 border-orange-400 w-14 rounded absolute top-9'></p>
            </div>
          <p className="text-gray-600 pl-2"><strong>Last Updated:</strong> {lastUpdated}</p>

        
            <div className="px-6 pt-4 space-y-8">
              <div>
                <p className="text-gray-700 leading-7">
                  Welcome to <strong>Only Heavy</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring your data is handled securely. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.onlyheavy.com/" className="text-indigo-600 underline">https://www.onlyheavy.com/</a> (the &quot;Site&quot;).
                </p>
                <p className="text-gray-700 leading-7 mt-3">
                  By accessing or using our Site, you consent to the data practices described in this policy.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">1. Information We Collect</div>

                <p className="text-gray-700 leading-7">We collect information to provide better services, generate quotes, and connect you with dealers.</p>

                <h4 className="font-semibold mt-4 mb-2">A. Personal Information</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>City / Location</li>
                  <li>Vehicle Preferences (e.g., specific truck models, budget)</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">B. Non-Personal Information (Technical Data)</h4>
                <p className="text-gray-700 leading-7 mb-2">We automatically collect certain data when you visit the Site:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>IP Address</li>
                  <li>Browser Type and Version</li>
                  <li>Operating System</li>
                  <li>Pages visited and time spent on the Site</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">2. How We Use Your Information</div>
                <p className="text-gray-700 leading-7 mb-2">We use the collected data for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Service Fulfillment:</strong> To provide brochures, price quotes, and vehicle specifications you requested.</li>
                  <li><strong>Lead Generation:</strong> To connect you with authorized truck dealers, financiers, or OEMs who can fulfill your purchase requirements.</li>
                  <li><strong>Communication:</strong> To send you updates, newsletters, or responses to your inquiries (via email, SMS, or WhatsApp).</li>
                  <li><strong>Site Improvement:</strong>  To analyze user behavior and improve our website’s functionality and content.</li>
                  <li><strong>Security:</strong> To detect and prevent fraudulent activities.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">3. Sharing of Information</div>
                <p className="text-gray-700 leading-7 pb-2">
                 <strong>We do not sell your personal data to unrelated third parties.</strong>However, to provide our core services, we may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">   
                  <li><strong>Dealers & OEMs:</strong> If you request a quote or brochure, we share your contact details with relevant truck dealers or manufacturers so they can contact you directly.</li>
                  <li><strong>Service Providers:</strong>Third-party vendors who assist us with hosting, analytics (e.g., Google Analytics), and email delivery.</li>
                  <li><strong>Legal Obligations:</strong>If required by law or to protect our rights, property, or safety.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">4. Cookies and Tracking Technologies</div>
                <p className="text-gray-700 leading-7">We use cookies to enhance your browsing experience.</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                  <li><strong>Essential Cookies: </strong> Necessary for the website to function.</li>
                  <li><strong>Analytics Cookies: </strong> Help us understand how visitors interact with the Site.</li>
                  <li><strong>Advertising Cookies: </strong> May be used to show you relevant ads on other platforms.</li>
                 
                </ul>
                <p className="text-gray-700 leading-7 mb-2">You can choose to disable cookies through your browser settings, but some features of the Site may not function properly.</p>

              </div>

              {/* Section 5 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">5. Data Security</div>
                <p className="text-gray-700 leading-7">We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the Internet is 100% secure.</p>
              </div>

              {/* Section 6 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">6. Your Rights</div>
                <p className="text-gray-700 leading-7 mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Access your personal data</li>
                  <li>Request correction</li>
                  <li>Request deletion</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
                <p className="text-gray-700 leading-7 mt-3">To exercise these rights, please contact us at  <a href="mailto:support@onlyheavy.com" className="text-indigo-600 underline">support@onlyheavy.com</a></p>
              </div>

              {/* Section 7 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">7. Third-Party Links</div>
                <p className="text-gray-700 leading-7">Our Site may contain links to third-party websites (e.g., manufacturers, financiers). We are not responsible for the privacy practices or content of those third-party sites.</p>
              </div>

              {/* Section 8 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">8. Updates to This Policy</div>
                <p className="text-gray-700 leading-7">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date..</p>
              </div>

              {/* Section 9 */}
              <div>
                <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">9. Contact Us</div>
                <p className="text-gray-700 leading-7 pb-8">
                  Email: <a href="mailto:support@onlyheavy.com" className="text-indigo-600 underline">support@onlyheavy.com</a><br />
                  Website: <a href="https://www.onlyheavy.com/" className="text-indigo-600 underline">https://www.onlyheavy.com/</a>
                </p>
              </div>

            </div>
          </div>
        
      </LandingPageLayout>
    </div>
  )
}
