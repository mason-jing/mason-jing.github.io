import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import type { DatabaseReference } from "firebase/database";
import { db } from "./firebase";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const countRef: DatabaseReference = ref(db, "count");

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
            set(countRef, newCount);
            return newCount;
        });

    return (
        <>
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
            <h1>This will be my Vite + React portfolio website.</h1>
            <h1>Stay tuned for updates!</h1>
            <div className="card">
                <button onClick={handleClick} disabled={loading}>
                    <span style={{ marginRight: "12px" }}>♥️</span>
                    {loading ? "Loading..." : count}
                </button>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
