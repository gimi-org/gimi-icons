
# Usage
```javascript
import Icon from 'gimi-icons';

...
render() {
  return <Icon name={iconName} />
},
```

# how to add a new icon (font)
```
Example: `th-large` becomes `thLarge`

Look in the css file of the font and convert the font.
example: icon-border-vertical :before { content: '\e9e6'} => iconBorderVertical: '\ue9e6'
add 'u' before the e.
and replace the .ttf file with the updated one
```

# Why this is fast, and uses almost no extra memory
```
Native linked and rendered by RN
```
