import { useState, useEffect } from "react";
import { ref, onValue, set, DataSnapshot } from "firebase/database";
import type { DatabaseReference, Unsubscribe } from "firebase/database";
import { db } from "./firebase";
import {
    useParams,
    useNavigate,
    type NavigateFunction,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.scss";
import type { PageContent, SupportedLanguage } from "./types";

const content: Record<SupportedLanguage, PageContent> = {
    "en-US": {
        h1: "Welcome to my portfolio website.",
        h2: "Stay tuned for updates!",
        button: "Loading...",
        p: "Click on the Vite and React logos to learn more",
        toggle: "中文",
    },
    "zh-CN": {
        h1: "欢迎来到我的个人作品集网站。",
        h2: "敬请期待更新！",
        button: "加载中...",
        p: "点击 Vite 和 React 的图标以了解更多信息",
        toggle: "English",
    },
};

function normalizeLang(lang?: string): SupportedLanguage {
    return lang?.toLowerCase() === "zh-cn" ? "zh-CN" : "en-US";
}

function App() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const countRef: DatabaseReference = ref(db, "count");
    const navigate: NavigateFunction = useNavigate();
    const normalizedLang: SupportedLanguage = normalizeLang(
        useParams<{ lang?: string }>().lang,
    );
    const currentContent: PageContent = content[normalizedLang];

    // 从 Firebase 读取全局 count
    useEffect(
        (): Unsubscribe =>
            onValue(countRef, (snapshot: DataSnapshot): void => {
                const value: any = snapshot.val();
                setCount(typeof value === "number" ? value : 0);
                setLoading(false);
            }),
        [countRef],
    );

    // 更新 count 时保存到 Firebase
    const handleClick: () => void = (): void =>
        setCount((prevCount: number): number => {
            const newCount: number = prevCount + 1;
            set(countRef, newCount).catch((err: unknown): void =>
                console.error("保存到 Firebase 失败: ", err),
            );
            return newCount;
        });

    const handleToggle: () => void = (): void => {
        navigate(`/${normalizedLang === "en-US" ? "zh-CN" : "en-US"}`);
    };

    return (
        <>
            <div className="language-toggle-container">
                <button onClick={handleToggle}>{currentContent.toggle}</button>
            </div>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>{currentContent.h1}</h1>
            <h1>{currentContent.h2}</h1>
            <div className="card">
                <button onClick={handleClick} disabled={loading}>
                    <span style={{ marginRight: "12px" }}>♥️</span>
                    {loading ? currentContent.button : count}
                </button>
            </div>
            <p className="read-the-docs">{currentContent.p}</p>
        </>
    );
}

export default App;
