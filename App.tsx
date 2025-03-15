import React, { useState } from 'react';
import { 
  Newspaper, 
  Bookmark, 
  TrendingUp, 
  Globe2, 
  Menu,
  Search,
  Bell,
  User,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Share2
} from 'lucide-react';
import { PreferencesModal } from './components/PreferencesModal';
import { useNewsStore } from './lib/store';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { preferences, setPreferencesOpen } = useNewsStore();

  const categories = [
    { id: 'all', name: 'All News', icon: Globe2 },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'saved', name: 'Saved', icon: Bookmark },
  ];

  const newsItems = [
    {
      id: 1,
      title: "The Future of Sustainable Energy",
      excerpt: "New breakthrough in renewable energy technology promises to revolutionize...",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800",
      readTime: "5 min read",
      source: "Reuters",
      sentiment: 0.8,
      reactions: { likes: 245, dislikes: 12 }
    },
    {
      id: 2,
      title: "Global Economic Outlook 2025",
      excerpt: "Leading economists predict major shifts in global markets as new policies...",
      category: "Business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
      readTime: "8 min read",
      source: "Bloomberg",
      sentiment: 0.3,
      reactions: { likes: 189, dislikes: 45 }
    },
    {
      id: 3,
      title: "Breakthrough in Quantum Computing",
      excerpt: "Scientists achieve major milestone in quantum computing development...",
      category: "Science",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800",
      readTime: "6 min read",
      source: "Associated Press",
      sentiment: 0.9,
      reactions: { likes: 567, dislikes: 23 }
    }
  ];

  return (
    <div className={`min-h-screen ${preferences.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${preferences.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className={`h-6 w-6 ${preferences.darkMode ? 'text-gray-400' : 'text-gray-500'} mr-4 cursor-pointer`} />
              <Newspaper className="h-8 w-8 text-blue-600" />
              <span className={`ml-2 text-xl font-bold ${preferences.darkMode ? 'text-white' : 'text-gray-900'}`}>
                NewsHub
              </span>
            </div>
            <div className="flex items-center">
              <div className="relative mx-4">
                <input
                  type="text"
                  placeholder="Search news..."
                  className={`w-64 px-4 py-2 pl-10 pr-4 rounded-full border ${
                    preferences.darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Bell className={`h-6 w-6 ${preferences.darkMode ? 'text-gray-400' : 'text-gray-500'} mx-4 cursor-pointer`} />
              <Settings 
                onClick={() => setPreferencesOpen(true)}
                className={`h-6 w-6 ${preferences.darkMode ? 'text-gray-400' : 'text-gray-500'} mx-4 cursor-pointer`}
              />
              <User className={`h-6 w-6 ${preferences.darkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer`} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Topics */}
        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-3 ${preferences.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Your Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {preferences.topics.map((topic) => (
              <span
                key={topic}
                className={`px-3 py-1 rounded-full text-sm ${
                  preferences.darkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <nav className="flex space-x-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : preferences.darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </nav>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article 
              key={item.id} 
              className={`rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 ${
                preferences.darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{item.category}</span>
                  <span className={`text-sm ${preferences.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.readTime}
                  </span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${preferences.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {item.excerpt}
                </p>
                
                {/* Source and Sentiment */}
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm ${preferences.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Source: {item.source}
                  </span>
                  <div className="flex items-center">
                    <div 
                      className={`px-2 py-1 rounded text-sm ${
                        item.sentiment > 0.5 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      Sentiment: {(item.sentiment * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="h-5 w-5" />
                      <span>{item.reactions.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                      <ThumbsDown className="h-5 w-5" />
                      <span>{item.reactions.dislikes}</span>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Share2 className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Bookmark className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <PreferencesModal />
    </div>
  );
}

export default App;