// Chromium bundled through the npm registry, for cloud hosts that cannot
// download browsers from Playwright's CDN. No extra browser download needed.
import chromium from "@sparticuz/chromium";
import { spawn } from "node:child_process";

const executablePath = await chromium.executablePath();
const child = spawn(
  process.execPath,
  ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: executablePath,
    },
  },
);
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? 1;
  if (signal) console.error(`Testes encerrados: ${signal}`);
});
