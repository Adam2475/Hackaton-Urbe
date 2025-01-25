"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClienteDashboard() {
    const router = useRouter();

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        if (userType !== "cliente") {
            router.push("/login");
        }
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Dashboard Cliente</h1>
            <p>Benvenuto nella dashboard per clienti.</p>
        </div>
    );
}
