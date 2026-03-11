import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GSAPInit } from './components/GSAPInit.tsx';

createRoot(document.getElementById("root")!).render(
    <>
        <GSAPInit />
        <App />
    </>
);
