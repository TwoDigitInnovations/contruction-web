import { useState } from "react";
import { FaCheckCircle, FaShieldAlt, FaLock, FaUserShield } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div className="relative z-10 flex flex-col px-5 md:px-20 justify-center items-start h-full text-white">
            <p className="text-4xl md:text-5xl pb-2 font-semibold">Privacy Policy</p>
            <p className="text-lg md:text-xl">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-custom-white">
        {/* Introduction Section */}
        <div className="px-5 md:px-20 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-600 p-6 md:p-8 rounded-lg mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-2xl text-custom-black" />
                <h2 className="text-2xl md:text-3xl font-semibold text-custom-black">
                  Our Commitment to Your Privacy
                </h2>
              </div>
              <p className="text-custom-black text-lg">
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                This privacy policy explains how we collect, use, and safeguard your data when you use our construction services.
              </p>
            </div>

            {/* Information Collection */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Information We Collect
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCheckCircle className="text-yellow-600" />
                    <h4 className="text-xl font-semibold text-gray-700">Personal Information</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Full name and contact details</li>
                    <li>• Email address and phone number</li>
                    <li>• Property address and location</li>
                    <li>• Project requirements and specifications</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCheckCircle className="text-yellow-600" />
                    <h4 className="text-xl font-semibold text-gray-700">Technical Information</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• IP address and browser type</li>
                    <li>• Device information and operating system</li>
                    <li>• Website usage patterns</li>
                    <li>• Cookies and tracking data</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                How We Use Your Information
              </h3>
              <div className="bg-custom-black text-white p-6 md:p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-yellow-500">Service Delivery</h4>
                    <ul className="space-y-2">
                      <li>• Provide construction and architectural services</li>
                      <li>• Communicate project updates and timelines</li>
                      <li>• Process payments and invoicing</li>
                      <li>• Coordinate with contractors and suppliers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-yellow-500">Business Operations</h4>
                    <ul className="space-y-2">
                      <li>• Improve our services and customer experience</li>
                      <li>• Conduct market research and analysis</li>
                      <li>• Comply with legal and regulatory requirements</li>
                      <li>• Prevent fraud and ensure security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Data Protection & Security
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-yellow-600 rounded-lg">
                  <FaLock className="text-3xl text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Encryption</h4>
                  <p className="text-gray-700">All data is encrypted using industry-standard protocols</p>
                </div>
                <div className="text-center p-6 border border-yellow-600 rounded-lg">
                  <FaUserShield className="text-3xl text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Access Control</h4>
                  <p className="text-gray-700">Strict access controls and authentication measures</p>
                </div>
                <div className="text-center p-6 border border-yellow-600 rounded-lg">
                  <FaShieldAlt className="text-3xl text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Regular Audits</h4>
                  <p className="text-gray-700">Regular security audits and vulnerability assessments</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Your Rights
              </h3>
              <div className="bg-yellow-600 p-6 md:p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-custom-black mb-3">Data Access & Control</h4>
                    <ul className="space-y-2 text-custom-black">
                      <li>• Access your personal data</li>
                      <li>• Request data correction or updates</li>
                      <li>• Delete your personal information</li>
                      <li>• Restrict data processing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-custom-black mb-3">Communication Preferences</h4>
                    <ul className="space-y-2 text-custom-black">
                      <li>• Opt-out of marketing communications</li>
                      <li>• Control cookie preferences</li>
                      <li>• Request data portability</li>
                      <li>• File complaints with authorities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Data Sharing & Third Parties
              </h3>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Service Providers</h4>
                    <p className="text-gray-600">Trusted contractors, suppliers, and service providers who help deliver our construction services under strict confidentiality agreements.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Legal Requirements</h4>
                    <p className="text-gray-600">When required by law, court order, or government regulations, or to protect our rights and safety.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-custom-black text-white p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                Contact Us About Privacy
              </h3>
              <p className="text-lg mb-4">
                If you have any questions about this privacy policy or how we handle your data, please contact us:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-yellow-500">Email</h4>
                  <p>privacy@construction.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-500">Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-500">Address</h4>
                  <p>123 Construction Ave, City, State 12345</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-600">
                <p className="text-sm text-gray-300">
                  Last updated: January 2025 | This policy may be updated periodically to reflect changes in our practices or legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}