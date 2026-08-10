# Prime Number Checker 🔢

A beautiful, responsive web application to check if a number is prime or not. Built with vanilla HTML, CSS, and JavaScript.

## Features ✨

- **Prime Number Detection**: Efficiently determines if a number is prime using optimized algorithms
- **Real-time Validation**: Input validation with immediate feedback
- **Factor Display**: Shows factors for composite numbers to help understand why they're not prime
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations and hover effects
- **Educational**: Includes information about what prime numbers are

## What is a Prime Number? 🤔

A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. In other words, it can only be divided evenly by 1 and itself.

**Examples of Prime Numbers**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...

**Examples of Composite Numbers**: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18...

## How to Use 📝

1. Open `index.html` in your web browser
2. Enter a positive number in the input field
3. Click the "Check Prime" button
4. See the result with explanation
5. For composite numbers, factors are displayed for better understanding

## Algorithm 🔬

The application uses an optimized prime checking algorithm:

1. **Edge Cases**: Numbers less than 2 are not prime
2. **Even Numbers**: Only 2 is prime among even numbers
3. **Odd Numbers**: Check divisibility up to √n, testing only odd divisors
4. **Time Complexity**: O(√n) for efficient checking even with large numbers

## File Structure 📁

```
prime-checker/
│
├── index.html          # Main HTML file with embedded CSS and JS
├── README.md           # This documentation file
└── preview.png         # Screenshot (optional)
```

## Technologies Used 💻

- **HTML5**: Semantic structure and accessibility
- **CSS3**: 
  - Flexbox for layout
  - CSS Grid for responsive design
  - Glassmorphism effects with backdrop-filter
  - CSS animations and transitions
  - Media queries for responsive design
- **JavaScript**: 
  - Prime number detection algorithm
  - DOM manipulation
  - Event handling
  - Input validation

## Browser Support 🌐

- ✅ Chrome 88+
- ✅ Firefox 94+
- ✅ Safari 14+
- ✅ Edge 88+

*Note: Glassmorphism effects require modern browser support for `backdrop-filter`*

## Responsive Breakpoints 📱

- **Desktop**: Full features, optimal experience
- **Tablet** (≤850px): Adjusted font sizes and spacing
- **Mobile** (≤750px): Optimized layout for small screens
- **Small Mobile** (≤500px): Compact design with touch-friendly elements

## Key Features Explained 🔍

### Input Validation
- Only accepts positive integers
- Real-time feedback for invalid inputs
- Button activation/deactivation based on input validity

### Prime Detection Algorithm
```javascript
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}
```

### Factor Display
For composite numbers, the app shows the factors to help users understand why the number isn't prime.

## Customization Options 🎨

You can easily customize the appearance by modifying the CSS variables:

- **Colors**: Change the gradient backgrounds and accent colors
- **Fonts**: Update the Google Fonts import and font-family
- **Animations**: Adjust transition durations and transform properties
- **Layout**: Modify the responsive breakpoints and container sizes

## Performance Considerations ⚡

- Optimized prime checking algorithm with O(√n) complexity
- Efficient factor calculation for educational purposes
- Minimal DOM manipulation for smooth user experience
- CSS animations use GPU acceleration with transform properties

## Educational Value 🎓

This application serves as an excellent learning tool for:
- Understanding prime numbers and their properties
- Learning about algorithmic optimization
- Exploring responsive web design principles
- Practicing modern CSS techniques like glassmorphism

## Future Enhancements 🚀

Potential improvements could include:
- Prime factorization display
- List of prime numbers up to N
- Sieve of Eratosthenes visualization
- Performance timing for large numbers
- Dark/light theme toggle
- History of checked numbers

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Author 👨‍💻

Created with ❤️ for learning and educational purposes.

---

**Happy Prime Checking!** 🎉