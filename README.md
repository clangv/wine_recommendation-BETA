# Wine Recommendation System - Technical Documentation

## Group Members
- Karl Nestor Buensalida
- Christain Asejo
- Clarissa Vega

## System Overview
The Wine Recommendation System is an intelligent web application that helps users discover wines based on their preferences. The system uses a rule-based approach combined with a modern, interactive user interface to provide personalized wine recommendations.

## How It Works

### 1. User Input Collection
The system collects user preferences through a 5-step questionnaire:

1. **Wine Type Selection**
   - Red Wine (🍷)
   - White Wine (🥂)
   - Sparkling Wine (🍾)

2. **Flavor Profile**
   - Rich & Bold (🔥)
   - Balanced (⚖️)
   - Light & Crisp (💧)

3. **Drinking Style**
   - With Food (🍽️)
   - With Friends (🎉)
   - Solo Time (🛋️)

4. **Wine Knowledge Level**
   - Beginner (🌱)
   - Intermediate (📘)
   - Expert (🏆)

5. **Occasion Type**
   - Just Chilling (🧘)
   - Romantic Date (❤️)
   - Party Time (🎈)

### 2. Decision-Making Process

The system uses a rule-based engine that matches user preferences against predefined rules. Each rule consists of:
- Conditions (user preferences)
- Recommendation (wine type)
- Detailed information about the wine

Example Rule:
```javascript
{
  conditions: {
    wineType: 'red',
    flavorPreference: 'rich_bold',
    drinkingStyle: 'dining'
  },
  recommendation: 'Cabernet Sauvignon',
  details: 'Full-bodied red wine with rich black fruit flavors...',
  // Additional details...
}
```

### 3. Recommendation Generation

The system follows these steps to generate recommendations:

1. Collects all user preferences
2. Matches preferences against the rule set
3. Returns the first matching recommendation
4. If no match is found, provides a default response

### 4. User Interface Features

The system includes several interactive features:

- **Progress Tracking**: Visual progress bar showing completion status
- **Animated Transitions**: Smooth transitions between steps
- **Responsive Design**: Works on both desktop and mobile devices
- **Share Functionality**: Allows users to share their recommendations
- **Restart Option**: Users can start over with new preferences

### 5. Technical Implementation

The system is built using:
- React.js for the frontend
- Framer Motion for animations
- React Hot Toast for notifications
- Tailwind CSS for styling

### 6. Example Decision Flow

1. User selects "Red Wine" → System moves to flavor selection
2. User chooses "Rich & Bold" → System moves to drinking style
3. User selects "With Food" → System checks rules
4. If conditions match a rule → System provides recommendation
5. If no match → System provides default response

### 7. Future Improvements

Potential enhancements for the system:
- Machine learning integration for more accurate recommendations
- Expanded wine database
- User preference history
- Social sharing features
- Wine pairing suggestions

## Screenshots



## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Contributing

[Add contribution guidelines here]

## License

[Add license information here]
