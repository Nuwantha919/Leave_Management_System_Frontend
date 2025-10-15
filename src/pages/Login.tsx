import React, { useState, type FormEvent } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // wire up your real auth later
    console.log({ username, password });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#ffffff", // whole page white
        padding: 16,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              aria-hidden
              style={{
                width: 32,
                height: 32,
                background: "#0f172a",
                color: "white",
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              LM
            </div>
            <strong>Leave Management</strong>
          </div>
          <h2 style={{ fontSize: 20, margin: 0 }}>Sign in</h2>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>
            Use your account
          </p>
        </div>

        <label htmlFor="username" style={{ fontSize: 14 }}>
          Username
        </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="jane.doe"
          autoComplete="username"
          style={{
            width: "100%",
            marginTop: 6,
            marginBottom: 12,
            padding: "10px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            outline: "none",
          }}
        />

        <label htmlFor="password" style={{ fontSize: 14 }}>
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 16,
              padding: "10px 44px 10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#64748b",
              fontSize: 12,
              cursor: "pointer",
              padding: 6,
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#475569" }}>
            <input type="checkbox" style={{ width: 16, height: 16 }} /> Remember me
          </label>
          <a href="#" style={{ fontSize: 14, color: "#0f172a", textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            background: "#0f172a",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Sign in
        </button>

        <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 12, textAlign: "center" }}>
          By continuing you agree to the Terms and Privacy Policy.
        </p>
      </form>
    </div>
  );
}
