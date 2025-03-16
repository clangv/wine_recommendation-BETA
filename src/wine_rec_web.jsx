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
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-1">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">Wine Recommender</h1>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Sweetness</label>
            <select 
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sweetness}
              onChange={e => setSweetness(e.target.value)}
            >
              <option value="">Select Sweetness</option>
              <option value="sweet">Sweet</option>
              <option value="dry">Dry</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Food Pairing</label>
            <select 
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            onClick={handleRecommend}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Get Recommendation
          </button>

          {recommendation.text && (
  <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
    <h2 className="text-lg font-semibold text-neutral-800 mb-2">
      Recommendation
    </h2>
    {recommendation.image && (
      <img 
        src={recommendation.image}
        alt="Wine recommendation"
        className="mb-3 rounded-lg shadow-sm w-full h-48 object-cover"
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