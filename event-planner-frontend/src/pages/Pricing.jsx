import { Link } from "react-router-dom";
import Footer from "../components/Footer";


export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">EventPro</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/Feature" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium">
                Features
              </Link>
              <Link to="/pricing" className="text-indigo-600 font-medium border-b-2 border-indigo-600">
                Pricing
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Choose the plan that's right for your events. No hidden fees.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Free</h3>
              <p className="text-gray-600 mb-6">For individuals getting started</p>
              <div className="text-4xl font-bold text-indigo-600 mb-6">$0</div>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li>✔ Up to 5 events</li>
                <li>✔ Basic event management</li>
                <li>✔ Community support</li>
              </ul>
              <Link
                to="/signup"
                className="block bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white relative">
              <span className="absolute -top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </span>
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <p className="mb-6">For professionals managing multiple events</p>
              <div className="text-4xl font-bold mb-6">$19<span className="text-lg">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li>✔ Unlimited events</li>
                <li>✔ Advanced analytics</li>
                <li>✔ Priority support</li>
              </ul>
              <Link
                to="/signup"
                className="block bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enterprise</h3>
              <p className="text-gray-600 mb-6">For organizations and teams</p>
              <div className="text-4xl font-bold text-indigo-600 mb-6">Custom</div>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li>✔ Unlimited events</li>
                <li>✔ Role-based access</li>
                <li>✔ Dedicated account manager</li>
              </ul>
              <Link
                to="/contact"
                className="block bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}