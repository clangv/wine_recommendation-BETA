import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShare2, FiRefreshCw } from 'react-icons/fi';
import { Transition } from '@headlessui/react';

const PreferenceKeys = {
  WINE_TYPE: 'wineType',
  FLAVOR: 'flavorPreference',
  DRINKING: 'drinkingStyle',
  KNOWLEDGE: 'wineKnowledge',
  OCCASION: 'occasionType',
};

const WineRecommender = () => {
  const [preferences, setPreferences] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleSetPreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleRecommend({ ...preferences, [key]: value });
    }
  };

  const handleRecommend = (finalPreferences = preferences) => {
    const rules = [
      {
        conditions: {
          [PreferenceKeys.WINE_TYPE]: 'red',
          [PreferenceKeys.FLAVOR]: 'rich_bold',
          [PreferenceKeys.DRINKING]: 'dining',
        },
        recommendation: 'Cabernet Sauvignon',
        details: 'Full-bodied red wine with rich black fruit flavors, cedar and subtle hints of vanilla.',
        image: '/images/cabernet.png',
        region: 'Napa Valley, USA',
        temperature: '16-18°C',
        pairings: ['Grilled steak', 'Aged cheddar', 'Lamb chops'],
        cellaring: '10-20 years'
      },
      {
        conditions: {
          [PreferenceKeys.WINE_TYPE]: 'white',
          [PreferenceKeys.FLAVOR]: 'light_crisp',
          [PreferenceKeys.DRINKING]: 'social'
        },
        recommendation: 'Moscato d\'Asti',
        details: 'Light and refreshing white wine with delicate floral aromas and sweet fruit flavors.',
        image: '/images/moscato.png',
        region: 'Piedmont, Italy',
        temperature: '6-8°C',
        pairings: ['Fresh fruit', 'Light desserts', 'Mild cheeses'],
        cellaring: '1-2 years'
      },
      {
        conditions: {
          [PreferenceKeys.WINE_TYPE]: 'sparkling',
          [PreferenceKeys.FLAVOR]: 'light_crisp',
          [PreferenceKeys.DRINKING]: 'social'
        },
        recommendation: 'Prosecco',
        details: 'A lively sparkling wine with fresh fruit notes. Ideal for celebrations.',
        image: '/images/prosecco.png',
        region: 'Veneto, Italy',
        temperature: '6-8°C',
        pairings: ['Bruschetta', 'Prosciutto', 'Seafood'],
        cellaring: '1-2 years'
      },
      {
        conditions: {
          [PreferenceKeys.WINE_TYPE]: 'red',
          [PreferenceKeys.FLAVOR]: 'medium_body',
          [PreferenceKeys.DRINKING]: 'dining',
          [PreferenceKeys.OCCASION]: 'date',
        },
        recommendation: 'Pinot Noir',
        details: 'Elegant and romantic red wine with cherry and earthy notes.',
        image: '/images/pinot_noir.jpg',
        region: 'Willamette Valley, USA',
        temperature: '14-16°C',
        pairings: ['Duck', 'Mushroom risotto', 'Salmon'],
        cellaring: '5-10 years'
      }
    ];

    const foundRule = rules.find(rule =>
      Object.entries(rule.conditions).every(
        ([key, value]) => finalPreferences[key] === value
      )
    );

    setRecommendation(
      foundRule || {
        recommendation: 'No match found',
        details: 'Try adjusting your preferences.',
        image: '',
        temperature: '',
        region: '',
        pairings: [],
        cellaring: ''
      }
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Wine Recommendation',
          text: `Check out my wine match: ${recommendation.recommendation}!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `My wine match: ${recommendation.recommendation} - ${recommendation.details}`
        );
        toast.success('Recommendation copied to clipboard!');
      }
    } catch (error) {
      toast.error('Unable to share. Please try again.');
    }
  };

  const renderOptionsStep = (key, title, options) => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      <div className="flex flex-nowrap justify-center gap-6 overflow-x-auto no-scrollbar px-2">
        {options.map(option => {
          const isSelected = preferences[key] === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSetPreference(key, option.value)}
              className={`flex-shrink-0 w-[160px] p-4 text-center border rounded-xl transition-all bg-white/5 group
                ${isSelected
                  ? 'border-[#FFD700] bg-white/20 text-[#FFD700]'
                  : 'border-white/10 hover:border-[#FFD700] hover:bg-white/10'}
              `}
              aria-pressed={isSelected}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl mb-2">{option.emoji}</span>
                <span className={`text-white font-medium group-hover:text-[#FFD700]`}>
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderOptionsStep(PreferenceKeys.WINE_TYPE, 'What kind of wine do you like?', [
          { value: 'red', label: 'Red', emoji: '🍷' },
          { value: 'white', label: 'White', emoji: '🥂' },
          { value: 'sparkling', label: 'Sparkling', emoji: '🍾' }
        ]);
      case 2:
        return renderOptionsStep(PreferenceKeys.FLAVOR, 'Choose your flavor profile', [
          { value: 'rich_bold', label: 'Rich & Bold', emoji: '🔥' },
          { value: 'medium_body', label: 'Balanced', emoji: '⚖️' },
          { value: 'light_crisp', label: 'Light & Crisp', emoji: '💧' }
        ]);
      case 3:
        return renderOptionsStep(PreferenceKeys.DRINKING, 'How do you usually enjoy wine?', [
          { value: 'dining', label: 'With Food', emoji: '🍽️' },
          { value: 'social', label: 'With Friends', emoji: '🎉' },
          { value: 'casual', label: 'Solo Time', emoji: '🛋️' }
        ]);
      case 4:
        return renderOptionsStep(PreferenceKeys.KNOWLEDGE, 'Your wine experience level?', [
          { value: 'beginner', label: 'Beginner', emoji: '🌱' },
          { value: 'intermediate', label: 'Intermediate', emoji: '📘' },
          { value: 'expert', label: 'Expert', emoji: '🏆' }
        ]);
      case 5:
        return renderOptionsStep(PreferenceKeys.OCCASION, 'What’s the occasion?', [
          { value: 'casual', label: 'Just Chilling', emoji: '🧘' },
          { value: 'date', label: 'Romantic Date', emoji: '❤️' },
          { value: 'party', label: 'Party Time', emoji: '🎈' }
        ]);
      default:
        return null;
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2 text-sm text-white/90">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Toaster position="top-center" />
      {/* Hide scrollbar styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex justify-center p-4 sm:p-10"
        style={{
          backgroundImage: "linear-gradient(to bottom right, rgba(28, 15, 26, 0.9), rgba(116, 12, 74, 0.9)), url('/background/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold text-white mb-4"
          >
            🍷 Wine Matchmaker
          </motion.h1>
          <p className="text-white/80 mb-8 text-sm">Answer a few fun questions to discover a wine you'll love!</p>

          {!recommendation && renderProgressBar()}
          {!recommendation && renderStep()}

          <AnimatePresence mode="wait">
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
              >
                {recommendation.image && (
                  <img
                    src={recommendation.image}
                    alt={recommendation.recommendation}
                    className="w-full sm:w-1/2 max-w-[320px] object-contain rounded-xl shadow-md"
                  />
                )}
                <div className="text-white space-y-4 flex-1">
                  <h2 className="text-2xl font-semibold text-[#FFD700]">
                    🎉 Your Match: {recommendation.recommendation}
                  </h2>
                  <p className="text-white/90">{recommendation.details}</p>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p><strong>🌍 Region:</strong> {recommendation.region}</p>
                    <p><strong>❄️ Serve At:</strong> {recommendation.temperature}</p>
                    <p><strong>🕰️ Best Cellared:</strong> {recommendation.cellaring}</p>
                    {recommendation.pairings?.length > 0 && (
                      <>
                        <p className="mt-3"><strong>🍽️ Best With:</strong></p>
                        <ul className="list-disc list-inside text-white/80 text-sm">
                          {recommendation.pairings.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentStep(1);
                        setPreferences({});
                        setRecommendation(null);
                        toast.success('Starting over!');
                      }}
                      className="flex-1 px-4 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#e6c200] transition flex items-center justify-center gap-2"
                    >
                      <FiRefreshCw /> Start Over
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="flex-1 px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition flex items-center justify-center gap-2"
                    >
                      <FiShare2 /> Share
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default WineRecommender;
