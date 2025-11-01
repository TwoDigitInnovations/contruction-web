import { useState } from "react";
import { FaGavel, FaHandshake, FaClipboardList, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export default function TermsConditions() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div className="relative z-10 flex flex-col px-5 md:px-20 justify-center items-start h-full text-white">
            <p className="text-4xl md:text-5xl pb-2 font-semibold">Terms & Conditions</p>
            <p className="text-lg md:text-xl">
              Our terms of service for construction and architectural projects
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
                <FaGavel className="text-2xl text-custom-black" />
                <h2 className="text-2xl md:text-3xl font-semibold text-custom-black">
                  Terms of Service Agreement
                </h2>
              </div>
              <p className="text-custom-black text-lg">
                These terms and conditions govern your use of our construction and architectural services. 
                By engaging our services, you agree to be bound by these terms. Please read them carefully.
              </p>
            </div>

            {/* Service Agreement */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Service Agreement
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FaHandshake className="text-yellow-600" />
                    <h4 className="text-xl text-gray-700 font-semibold">Our Services</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Architectural design and planning</li>
                    <li>• Construction and building services</li>
                    <li>• Project management and supervision</li>
                    <li>• Building maintenance and renovation</li>
                    <li>• Interior design consultation</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FaClipboardList className="text-yellow-600" />
                    <h4 className="text-xl font-semibold text-gray-700">Client Responsibilities</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Provide accurate project requirements</li>
                    <li>• Ensure site accessibility</li>
                    <li>• Obtain necessary permits</li>
                    <li>• Make timely payments</li>
                    <li>• Provide feedback and approvals</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Project Timeline & Payments */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Project Timeline & Payment Terms
              </h3>
              <div className="bg-custom-black text-white p-6 md:p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-yellow-500">Timeline Management</h4>
                    <ul className="space-y-2">
                      <li>• Project timelines are estimates based on normal conditions</li>
                      <li>• Delays due to weather, permits, or changes may extend timeline</li>
                      <li>• We provide regular updates on project progress</li>
                      <li>• Client approval required at key milestones</li>
                      <li>• Final delivery subject to quality inspections</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-yellow-500">Payment Schedule</h4>
                    <ul className="space-y-2">
                      <li>• 25% deposit required to commence work</li>
                      <li>• Progress payments at predetermined milestones</li>
                      <li>• Final payment due upon project completion</li>
                      <li>• Late payment fees may apply after 30 days</li>
                      <li>• All payments subject to applicable taxes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Quality Assurance & Warranties
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-yellow-600 rounded-lg">
                  <FaCheckCircle className="text-3xl text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Quality Control</h4>
                  <p className="text-gray-700">Regular inspections and quality checks throughout the project</p>
                </div>
                <div className="text-center p-6 border border-yellow-600 rounded-lg">
                  <FaHandshake className="text-3xl text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Warranty Period</h4>
                  <p className="text-gray-700">12-month warranty on workmanship and materials</p>
                </div>
                <div className="text-center p-6 border border-yellow-600 rounded-lg">
                  <FaGavel className="text-3xl text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Compliance</h4>
                  <p className="text-gray-700">All work meets local building codes and regulations</p>
                </div>
              </div>
            </div>

            {/* Liability & Insurance */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-custom-black mb-6">
                Liability & Insurance
              </h3>
              <div className="bg-yellow-600 p-6 md:p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-custom-black mb-3">Our Coverage</h4>
                    <ul className="space-y-2 text-custom-black">
                      <li>• Comprehensive general liability insurance</li>
                      <li>• Professional indemnity coverage</li>
                      <li>• Workers' compensation insurance</li>
                      <li>• Equipment and materials coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-custom-black mb-3">Limitation of Liability</h4>
                    <ul className="space-y-2 text-custom-black">
                      <li>• Liability limited to project contract value</li>
                      <li>• Not responsible for pre-existing conditions</li>
                      <li>• Client responsible for site security</li>
                      <li>• Force majeure events excluded</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

         
            {/* Contact Information */}
            <div className="bg-custom-black text-white p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                Questions About Terms & Conditions
              </h3>
              <p className="text-lg mb-4">
                If you have any questions about these terms and conditions, please contact our legal department:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-yellow-500">Email</h4>
                  <p>legal@construction.com</p>
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
                  Last updated: January 2025 | These terms may be updated to reflect changes in our services or legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}