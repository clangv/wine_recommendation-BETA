import React, { useState } from 'react';

const WineRecommender = () => {
  const [sweetness, setSweetness] = useState('');
  const [foodPairing, setFoodPairing] = useState('none');
  const [recommendation, setRecommendation] = useState({
    text: '',
    image: ''
  });

  const handleRecommend = () => {
    const rules = [
      { conditions: { sweetness: 'sweet', foodPairing: 'red meat' }, recommendation: 'Port (Sweet, Pairs well with Red Meat)', image: '/images/port.png'},
      { conditions: { sweetness: 'sweet', foodPairing: 'fish' }, recommendation: 'Riesling (Sweet, Pairs well with Fish)', image: '/images/riesling.png'},
      { conditions: { sweetness: 'sweet', foodPairing: 'dessert' }, recommendation: 'Moscato (Sweet, Pairs well with Dessert)', image: '/images/moscato.png'},
      { conditions: { sweetness: 'sweet', foodPairing: 'none' }, recommendation: 'Moscato or Riesling (Sweet)', image: '/images/moscato.png'},

      { conditions: { sweetness: 'dry', foodPairing: 'red meat' }, recommendation: 'Cabernet Sauvignon (Dry, Pairs well with Red Meat)', image: '/images/cabernet.png'},
      { conditions: { sweetness: 'dry', foodPairing: 'fish' }, recommendation: 'Chardonnay (Dry, Pairs well with Fish)', image: '/images/chardonnay.png'},
      { conditions: { sweetness: 'dry', foodPairing: 'dessert' }, recommendation: 'Champagne (Dry, Pairs well with Dessert)', image: '/images/champagne.png'},
      { conditions: { sweetness: 'dry', foodPairing: 'none' }, recommendation: 'Merlot or Chardonnay (Dry)', image: '/images/merlot.png'},
    ];

    const foundRule = rules.find(rule => 
        rule.conditions.sweetness === sweetness && 
        rule.conditions.foodPairing === foodPairing
      );
    
      if (foundRule) {
        setRecommendation({
          text: foundRule.recommendation,
          image: foundRule.image
        });
      } else {
        setRecommendation({
          text: 'No suitable recommendation found.',
          image: ''
        });
      }
    };

  return (
    <div className="min-h-screen bg-red-300 flex justify-center p-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-neutral-800 mb-8">Wine Recommender</h1>
        
        <div className="space-y-">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">Sweetness</label>
            <select 
              className="w-full px-10 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sweetness}
              onChange={e => setSweetness(e.target.value)}
            >
              <option value="">Select Sweetness</option>
              <option value="sweet">Sweet</option>
              <option value="dry">Dry</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">Food Pairing</label>
            <select 
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={foodPairing}
              onChange={e => setFoodPairing(e.target.value)}
            >
              <option value="none">None</option>
              <option value="red meat">Red Meat</option>
              <option value="fish">Fish</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          <button
              onClick={handleRecommend}            >
              <span className="flex items-center justify-center space-x-">
                <svg 
                  className="w-5 h-10 text-blue-100" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 25 24"
                  width="30"
                  height="30"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1" 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span>Find Your Perfect Wine</span>
              </span>
            </button>

          {recommendation.text && (
            <div className="mt-8 p-6 bg-neutral-50 rounded-lg border border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">
                Recommendation
              </h2>
              {recommendation.image && (
                <img 
                  src={recommendation.image}
                  alt="Wine recommendation"
                  className="mb-4 rounded-lg shadow-sm w-full h-48 object-cover"
                />
              )}
              <p className="text-neutral-700">{recommendation.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WineRecommender;