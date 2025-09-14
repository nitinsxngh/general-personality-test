import { title } from '@/components/primitives';

export default function PrivacyPage() {
  return (
    <>
      <div className='text-center'>
        <h1 className={title()}>Privacy Policy</h1>
        <h5 className='text-default-500 text-lg'>ILC Personality Assessment Privacy Policy</h5>
      </div>
      <div className='mt-10 max-w-4xl mx-auto space-y-6 text-default-700'>
        <p className='text-lg'>
          This Privacy Policy explains how ILC Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) 
          collects, uses, and protects your personal information when you use our ILC Personality Assessment 
          platform and related services.
        </p>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>1. Information We Collect</h2>
          <div className='space-y-4'>
            <h3 className='text-xl font-medium'>Personal Information</h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Email address and authentication details (when you create an account)</li>
              <li>Name and profile information (if provided)</li>
              <li>Profile photo (if uploaded)</li>
            </ul>

            <h3 className='text-xl font-medium'>Assessment Data</h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Personality test responses and answers</li>
              <li>Test completion timestamps</li>
              <li>Language preferences</li>
              <li>Assessment results and scores</li>
            </ul>

            <h3 className='text-xl font-medium'>Technical Information</h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage patterns and interactions with our platform</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>2. How We Use Your Information</h2>
          <div className='space-y-4'>
            <p>We use your information to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Provide personalized personality assessments and career guidance</li>
              <li>Generate detailed personality reports and recommendations</li>
              <li>Maintain your account and assessment history</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about our services</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>3. Data Storage and Security</h2>
          <div className='space-y-4'>
            <p>We implement appropriate security measures to protect your data:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Data is encrypted in transit and at rest</li>
              <li>Access to personal data is restricted to authorized personnel</li>
              <li>Regular security audits and updates</li>
              <li>Secure cloud infrastructure with industry-standard protections</li>
            </ul>
            <p>
              Your assessment data is stored in our secure MongoDB database and is associated 
              with your user account for personalized access to your results.
            </p>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>4. Data Sharing</h2>
          <div className='space-y-4'>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share data only in these circumstances:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With trusted service providers who assist in platform operations (under strict confidentiality agreements)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>5. Your Rights</h2>
          <div className='space-y-4'>
            <p>You have the right to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Access your personal data and assessment results</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to certain types of data processing</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>6. Cookies and Tracking</h2>
          <div className='space-y-4'>
            <p>We use cookies and similar technologies to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Remember your preferences and login status</li>
              <li>Analyze platform usage and performance</li>
              <li>Provide personalized content and recommendations</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences. 
              Note that disabling cookies may affect platform functionality.
            </p>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>7. Data Retention</h2>
          <div className='space-y-4'>
            <p>
              We retain your personal data and assessment results for as long as your account 
              is active or as needed to provide our services. You may request deletion of 
              your data at any time, and we will process such requests within 30 days.
            </p>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>8. Children&apos;s Privacy</h2>
          <div className='space-y-4'>
            <p>
              Our services are not intended for children under 16 years of age. We do not 
              knowingly collect personal information from children under 16. If we become 
              aware that we have collected such information, we will take steps to delete it promptly.
            </p>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>9. Changes to This Policy</h2>
          <div className='space-y-4'>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              any material changes by posting the new policy on this page and updating 
              the &quot;Last Updated&quot; date. Your continued use of our services after 
              such changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-primary-600 mb-4'>10. Contact Us</h2>
          <div className='space-y-4'>
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className='bg-default-50 p-4 rounded-lg'>
              <p><strong>Email:</strong> privacy@ilc.limited</p>
              <p><strong>Address:</strong> ILC Limited, Privacy Department</p>
              <p><strong>Website:</strong> <a href="https://ilc.limited" className="text-primary-600 hover:underline">https://ilc.limited</a></p>
            </div>
          </div>
        </section>

        <div className='mt-8 p-4 bg-primary-50 rounded-lg'>
          <p className='text-sm text-default-600'>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </>
  );
}
