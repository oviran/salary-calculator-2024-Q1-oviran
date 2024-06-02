# 📱 Salary Calculator

This repository contains the source code for a Salary Calculator web application built using React, TailwindCSS & TypeScript. 

### The project can be reached at https://salary-calculator-oviran.netlify.app/

## 👷 Frameworks, Libraries and TechnologiesTechnologies Used

- React
- Context API
- React Router DOM 
- TypeScript
- TailwindCSS
- Shadcn 
- HTML
- Vite

## 🚀 Quick start

### Clone the repository

```
git clone https://github.com/oviran/salary-calculator-2024-Q1-oviran.git
```

### Build the project

```
cd salary-calculator-2024-Q1-oviran
npm install

```

### Run the project

```
npm run dev
````

## 🔧 Implementation features

### UI of Salary Calculator

![Main](./public/cal1.png)

### Final Output

![final](./public/cal2.png)

## Rules 

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
