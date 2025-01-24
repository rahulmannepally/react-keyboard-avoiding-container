# React Keyboard Avoiding Container

A React component that handles mobile keyboard interactions gracefully, ensuring proper viewport adjustments and scroll behavior when the keyboard appears.

https://www.npmjs.com/package/react-keyboard-avoiding-container

## Features

- 📱 Automatic keyboard height detection
- 🔄 Smooth scroll adjustments when keyboard appears
- 🎯 Auto-scrolls to focused input fields
- 📍 Maintains viewport stability
- 🔒 Prevents unwanted scrolling/bouncing
- 🎨 Clean, responsive layout with sticky footer
- 💪 TypeScript support
- ⚛️ Works with React 16.8+

## Installation

```bash
npm install react-keyboard-avoiding-container
# or
yarn add react-keyboard-avoiding-container
```

## Usage

```jsx
import { KeyboardAvoidingContainer } from "react-keyboard-avoiding-container";

function LoginForm() {
  const bodyContent = (
    <div>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
    </div>
  );

  const footerContent = <button>Login</button>;

  return (
    <KeyboardAvoidingContainer body={bodyContent} footer={footerContent} />
  );
}
```

## Props

| Prop     | Type              | Description                              |
| -------- | ----------------- | ---------------------------------------- |
| `body`   | `React.ReactNode` | Main content of the container            |
| `footer` | `React.ReactNode` | Footer content that sticks to the bottom |

## Features in Detail

### Keyboard Handling

- Automatically detects keyboard height using `visualViewport` API
- Adjusts the viewport height when keyboard appears/disappears
- Prevents unwanted scrolling and viewport jumps

### Focus Management

- Automatically scrolls to focused input fields
- Ensures focused elements are visible above the keyboard
- Smooth scrolling animations for better UX

### Layout Control

- Fixed positioning to prevent page scrolling
- Sticky footer that remains visible
- Handles orientation changes gracefully

## Browser Support

The component uses the `visualViewport` API for optimal keyboard handling. For browsers that don't support this API, it falls back to `window.innerHeight`.

## Best Practices

1. Place all interactive elements (inputs, textareas) in the `body` prop
2. Keep action buttons (submit, cancel) in the `footer` prop
3. Use within mobile-focused layouts
4. Ensure parent containers don't interfere with fixed positioning

## Example

```jsx
import { KeyboardAvoidingContainer } from "react-keyboard-avoiding-container";

function ChatApp() {
  const bodyContent = (
    <div>
      {/* Chat messages */}
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
    </div>
  );

  const footerContent = (
    <div className="input-area">
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );

  return (
    <KeyboardAvoidingContainer body={bodyContent} footer={footerContent} />
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

If you have any questions or run into issues, please open an issue on GitHub.
