export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">EventPro</h1>
            </div>
            <a
              href="/"
              className="text-indigo-600 font-medium hover:text-indigo-700 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Watch Our Demo
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            See how EventPro simplifies event planning and management in just a
            few clicks.
          </p>

          {/* Video Demo */}
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="EventPro Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Free Trial
            </a>
            <a
              href="/pricing"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
