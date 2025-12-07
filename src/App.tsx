import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import type { DatabaseReference } from "firebase/database";
import { db } from "./firebase";
import { useParams, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.scss";

const content: {
    [key: string]: {
        h1: string;
        h2: string;
        button: string;
        p: string;
        toggle: string;
    };
} = {
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

function App() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const countRef: DatabaseReference = ref(db, "count");
    const { lang } = useParams<{ lang: string }>();
    const navigate = useNavigate();
    const currentContent = content[lang ?? "en-US"] ?? content["en-US"];

    // 从 Firebase 读取全局 count
    useEffect(
        () =>
            onValue(countRef, (snapshot) => {
                setCount(snapshot.val() ?? 0);
                setLoading(false);
            }),
        [countRef],
    );

    // 更新 count 时保存到 Firebase
    const handleClick = () =>
        setCount((prevCount) => {
            const newCount = prevCount + 1;
            set(countRef, newCount).catch((err) =>
                console.error("保存到 Firebase 失败: ", err),
            );
            return newCount;
        });

    const handleToggle = () => {
        navigate(`/${lang === "en-US" ? "zh-CN" : "en-US"}`);
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
