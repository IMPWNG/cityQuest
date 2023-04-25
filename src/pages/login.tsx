
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
       
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Log In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border-2 border-gray-400 p-2 rounded-md text-black"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border-2 border-gray-400 p-2 rounded-md text-black"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-md mt-2">
                    Submit
                </button>
            </form>
            {error && <p>{error}</p>}
            <Link href="/">
                Go back home
            </Link>

        </div>
    );
};

