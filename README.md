# React Keyboard Avoiding Container

A React component for web applications that handles mobile keyboard interactions gracefully, ensuring proper viewport adjustments and scroll behavior when the keyboard appears. Works fluently across modern browsers and devices.

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

```tsx
import React, { useState } from "react";

import { KeyboardAvoidingContainer } from "react-keyboard-avoiding-container";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempt:", { username, password });
    alert("Login clicked!");
  };

  const bodyContent = (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <div className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg w-full p-2"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg w-full p-2"
            placeholder="Enter your password"
          />
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <button
      onClick={handleLogin}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Login
    </button>
  );

  return (
    <KeyboardAvoidingContainer body={bodyContent} footer={footerContent} />
  );
};

export default LoginPage;
```
Demo Video:

https://github.com/user-attachments/assets/60255785-0c33-4843-bba5-18612113b8f1


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

If you have any questions or run into issues, please open an issue on GitHub.
