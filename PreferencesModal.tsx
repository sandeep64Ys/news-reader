import React from 'react';
import { X } from 'lucide-react';
import { useNewsStore } from '../lib/store';

export function PreferencesModal() {
  const { preferences, setPreferences, isPreferencesOpen, setPreferencesOpen } = useNewsStore();

  const allTopics = ['Technology', 'Business', 'Science', 'Politics', 'Entertainment', 'Sports', 'Health'];
  const allSources = ['Reuters', 'Associated Press', 'Bloomberg', 'BBC News', 'CNN', 'The Guardian'];

  const toggleTopic = (topic: string) => {
    const newTopics = preferences.topics.includes(topic)
      ? preferences.topics.filter((t) => t !== topic)
      : [...preferences.topics, topic];
    setPreferences({ topics: newTopics });
  };

  const toggleSource = (source: string) => {
    const newSources = preferences.sources.includes(source)
      ? preferences.sources.filter((s) => s !== source)
      : [...preferences.sources, source];
    setPreferences({ sources: newSources });
  };

  if (!isPreferencesOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">News Preferences</h2>
          <button
            onClick={() => setPreferencesOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`px-4 py-2 rounded-full ${
                    preferences.topics.includes(topic)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">News Sources</h3>
            <div className="flex flex-wrap gap-2">
              {allSources.map((source) => (
                <button
                  key={source}
                  onClick={() => toggleSource(source)}
                  className={`px-4 py-2 rounded-full ${
                    preferences.sources.includes(source)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={(e) => setPreferences({ darkMode: e.target.checked })}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span>Dark Mode</span>
            </label>
            <button
              onClick={() => setPreferencesOpen(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}