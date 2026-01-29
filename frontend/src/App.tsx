import { useEffect, useState } from "react";
import { healthCheck } from "./services/api";

type ApiState =
  | { state: "loading" }
  | { state: "ok"; service: string }
  | { state: "error"; message: string };

export default function App() {
  const [apiState, setApiState] = useState<ApiState>({ state: "loading" });

  useEffect(() => {
    healthCheck()
      .then((d) => setApiState({ state: "ok", service: d.service }))
      .catch((e) =>
        setApiState({ state: "error", message: e?.message ?? "Failed" })
      );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-xl rounded-xl bg-slate-900 p-8 shadow">
        <h1 className="text-3xl font-semibold">Task Manager</h1>

        <div className="mt-4">
          {apiState.state === "loading" && <p>API Status: Checking...</p>}
          {apiState.state === "ok" && (
            <p className="text-green-400">API Status: Connected ({apiState.service})</p>
          )}
          {apiState.state === "error" && (
            <p className="text-red-400">API Status: Error ({apiState.message})</p>
          )}
        </div>
      </div>
    </div>
  );
}
