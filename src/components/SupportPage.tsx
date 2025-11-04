import React from 'react';
import { ArrowLeft, Mail, User, Code, Coffee } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Main Page
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
              Support & Contact
            </h1>
            <p className="text-gray-600 text-lg">
              Need help or have questions? Reach out to our developer directly.
            </p>
          </div>

          {/* Developer Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full w-20 h-20 flex items-center justify-center text-white text-2xl font-bold mb-4 md:mb-0 md:mr-6">
                SK
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sandeep Kumar Sahoo</h2>
                <p className="text-gray-700 mb-1">Lead Developer & Creator</p>
                <p className="text-gray-600 text-sm">
                  Built the entire XRPL Institutional Fund Management Protocol from the ground up
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Email Support</h3>
              </div>
              <p className="text-gray-600 mb-4">
                For technical support, feature requests, or any questions about the platform:
              </p>
              <a 
                href="mailto:sandeep.savethem2@gmail.com" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                sandeep.savethem2@gmail.com
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Technical Details</h3>
              </div>
              <p className="text-gray-600 mb-4">
                This institutional-grade platform implements multiple XRPL standards:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  XLS-33 MPT Tokens
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  XLS-80 Permissioned Domains
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  XLS-40 DID Identity
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
            <div className="flex items-start">
              <Coffee className="h-6 w-6 text-amber-600 mr-3 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">About This Project</h3>
                <p className="text-gray-700 mb-3">
                  The XRPL Institutional Fund Management Protocol is an advanced, institutional-grade implementation 
                  built entirely by Sandeep Kumar Sahoo. It provides comprehensive fund management capabilities 
                  compliant with multiple financial regulatory frameworks.
                </p>
                <p className="text-gray-700">
                  For support, feature requests, or collaboration opportunities, please reach out via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};