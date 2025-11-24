/**
 * AboutPage component - information about CampusHub
 */
const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About CampusHub</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Welcome to CampusHub</h2>
          <p className="leading-relaxed">
            CampusHub is a simple, distraction-free web-based planner designed specifically for 
            university students in Cairo. It helps you organize your daily academic tasks, deadlines, 
            quick notes, and important links all in one place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Features</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Task Management:</strong> Create, organize, and track your academic tasks with due dates, priorities, and status updates.</li>
            <li><strong>Notes & Links:</strong> Keep quick notes and save important links for easy access.</li>
            <li><strong>Dashboard Overview:</strong> Get a quick view of your academic progress and upcoming deadlines.</li>
            <li><strong>User-Friendly:</strong> Clean, simple interface that works seamlessly on desktop, tablet, and mobile devices.</li>
            <li><strong>Privacy-First:</strong> All your data is stored locally in your browser - no backend, no servers, complete privacy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Register with your email and select your university from the Cairo universities list.</li>
            <li>Login to access your personal workspace.</li>
            <li>Add tasks with due dates and priorities to stay organized.</li>
            <li>Create notes for quick reminders and save important links.</li>
            <li>Check your dashboard regularly to track your progress.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technology</h2>
          <p className="leading-relaxed">
            CampusHub is built with modern web technologies including React, React Router, 
            and Tailwind CSS. All data is stored locally in your browser using localStorage, 
            ensuring your information stays private and secure.
          </p>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <p className="text-gray-600 italic">
            CampusHub - Your simple, distraction-free academic workspace for Cairo students.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

