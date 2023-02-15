module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': false,
    'prettier/prettier': false,
    "react/self-closing-comp": ["error", {
      "component": false,
      "html": false
    }]
        
  },
};
