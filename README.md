# Incident Dashboard

A modern, responsive React application designed to display and manage incident records. This project was built as part of a frontend coding challenge.

## Features

- **Data Fetching**: Integrates with a mock API to retrieve location and incident data.
- **Dynamic Table**: Displays processed incident data in a clean, organized data table.
- **Priority Indicators**: Visual SVG icons representing different incident priority levels (High, Medium, Low).
- **Sorting & Processing**: Automatically sorts incidents by priority (ascending) and then by date/time (descending).
- **Responsive Design**: Styled using SCSS for a modern look and feel.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Styling**: [SCSS](https://sass-lang.com/)
- **Linting**: [ESLint](https://eslint.org/)

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Building for Production

Checks linting (with auto-fix), runs type checks, executes tests, and builds the production bundle:

```bash
npm run build
```

### Testing

Run tests in watch mode:

```bash
npm test
```

Or run the interactive Vitest UI:

```bash
npm run test:ui
```

### Linting

Run ESLint with automatic fixes:

```bash
npm run lint
```