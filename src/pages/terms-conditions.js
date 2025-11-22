import LandingPageLayout from '@/layouts/LandingPageLayout'
import Head from 'next/head'

export default function TermsAndConditions() {
  const lastUpdated = '22-Nov-2025'

  return (
    <div className="min-h-screen bg-white text-black py-10">
      <Head>
        <title>Terms & Conditions | Only Heavy</title>
        <meta
          name="description"
          content="Only Heavy Terms & Conditions — usage rules, disclaimers, and legal guidelines."
        />
      </Head>

      <LandingPageLayout>
        <div className="w-full mx-auto bg-white">

          <div className="relative">
            <h1 className="text-2xl font-bold my-5">Only Heavy - Terms and Conditions</h1>
            <p className="border border-b-4 border-orange-400 w-14 rounded absolute top-9"></p>
          </div>

          <p className="text-gray-600 pl-2">
            <strong>Last Updated:</strong> {lastUpdated}
          </p>

              

          <div className="px-6 pt-4 space-y-8">
            <div>
                <p className="text-gray-700 leading-7">
                   Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using <strong>Only Heavy</strong>. By accessing or using our website <a href="https://www.onlyheavy.com/" className="text-indigo-600 underline">https://www.onlyheavy.com/</a> operated by <strong>Only Heavy</strong>(&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                </p>
                <p className="text-gray-700 leading-7 mt-3">
                  By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Site.
                </p>
              </div>
            {/* Section 1 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                1. Nature of Service (Aggregator & Information Platform)
              </div>

              <p className="text-gray-700 leading-7">
                <strong>Only Heavy</strong> is a research and information platform for commercial vehicles.
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li><strong>We are not a seller:</strong> We do not own, sell, or manufacture any trucks listed on the Site.</li>
                <li><strong>We are an intermediary:</strong> We connect potential buyers with dealers, OEMs, and financial institutions.</li>
                <li><strong>No guarantee:</strong> We do not guarantee vehicle availability, price, or quality. All transactions occur directly between you and the dealer.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                2. Accuracy of Information
              </div>

              <p className="text-gray-700 leading-7">
               While we strive to provide accurate and up-to-date information regarding truck specifications, prices, mileage, and features:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li><strong>Prices are indicative:</strong> Ex-showroom prices and on-road prices vary by state and dealership. Always confirm the final price with the dealer.</li>
                <li><strong>Specifications may change:</strong>  Manufacturers may update vehicle specifications without notice. We are not liable for any discrepancies in the data provided.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                3. User Responsibilities
              </div>
                <p className="text-gray-700 leading-7 pb-2">
               When using our Site, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and truthful information (Name, Phone, Email) when requesting quotes or brochures.</li>
                <li>Use the Site only for lawful purposes.</li>
                <li>Not use any automated systems (robots, spiders) to scrape data from the Site.</li>
                <li>Not attempt to compromise the security of the Site.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                4. User Account
              </div>

              <p className="text-gray-700 leading-7">
                If you create an account on our Site, you are responsible for maintaining the confidentiality of your login credentials. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                5. Intellectual Property
              </div>

              <p className="text-gray-700 leading-7">
                The content, layout, design, data, databases, and graphics on this Site are protected by intellectual property laws. You may not copy, reproduce, republish, or distribute any content from Only Heavy without our prior written permission.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                6. Limitation of Liability
              </div>

              <p className="text-gray-700 leading-7">
                To the fullest extent permitted by law, <strong>Only Heavy</strong> shall not be liable for:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Any indirect, incidental, or consequential damages arising from your use of the Site.</li>
                <li>Any disputes, financial losses, or issues arising from your dealings with truck dealers or third parties introduced through our Site.</li>
                <li>Errors or omissions in the content provided on the Site</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                7. Third-Party Links and Services
              </div>

              <p className="text-gray-700 leading-7">
                Our Site may contain links to third-party websites or services (e.g., EMI calculators provided by banks, manufacturer sites). We have no control over, and assume no responsibility for, the content or practices of any third-party sites.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                8. Termination
              </div>

              <p className="text-gray-700 leading-7">
                We reserve the right to terminate or suspend your access to the Site immediately, without prior notice, for any reason, including without limitation if you breach the Terms.

              </p>
            </div>

            {/* Section 9 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                9. Governing Law
              </div>

              <p className="text-gray-700 leading-7">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes relating to these Terms shall be subject to the exclusive jurisdiction of the courts in <strong>[Your City, e.g., Vellore], Tamil Nadu</strong>.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                10. Changes to Terms
              </div>

              <p className="text-gray-700 leading-7">
                We reserve the right to modify or replace these Terms at any time. Continued use of the Site after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <div className="bg-gray-100 px-4 py-2 text-lg font-semibold border-l-4 border-orange-400 mb-3">
                11. Contact Us
              </div>

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
