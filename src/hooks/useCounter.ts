import { useEffect, useState } from "react";
import { DataSnapshot, onValue, ref, set } from "firebase/database";
import type { DatabaseReference, Unsubscribe } from "firebase/database";

import { db } from "../lib";

export interface UseCounterReturn {
    count: number;
    loading: boolean;
    handleClick: () => void;
}

export const useCounter = (): UseCounterReturn => {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const countRef: DatabaseReference = ref(db, "count");

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
    const handleClick = (): void =>
        setCount((prevCount: number): number => {
            const newCount: number = prevCount + 1;
            set(countRef, newCount).catch((err: unknown): void =>
                console.error("保存到 Firebase 失败: ", err),
            );
            return newCount;
        });

    return { count, loading, handleClick };
};
