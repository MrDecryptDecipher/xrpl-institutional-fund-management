import { useEffect } from "react";

export function EnvTest() {
  useEffect(() => {
    console.log("Environment variables:");
    console.log("import.meta.env:", import.meta.env);
    console.log("VITE_XUMM_API_KEY:", import.meta.env.VITE_XUMM_API_KEY);
    console.log("VITE_XUMM_API_SECRET:", import.meta.env.VITE_XUMM_API_SECRET);
  }, []);

  return (
    <div>
      <h1>Environment Variables Test</h1>
      <p>Check the console for environment variable values</p>
    </div>
  );
}