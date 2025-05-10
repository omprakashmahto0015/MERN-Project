import { useState } from "react";
import { useRouter } from "next/router";

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || "Error resetting password");

            setMessage("Password reset successful! Redirecting...");
            setTimeout(() => router.push("/login"), 3000);
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
                {message && <p className="text-red-500">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        className="block w-full p-2 border rounded mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="block w-full p-2 border rounded mb-3"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
