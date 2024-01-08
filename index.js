const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");
const cache = require("@actions/cache");

// internal functions
async function installTools() {
  const direnvVersion = core.getInput("direnvVersion");
  core.info(`installing direnv-${direnvVersion}...`);

  // test direnv in cache
  const foundToolCache = tc.find("direnv", direnvVersion);
  if (foundToolCache) {
    core.info("direnv found in tool-cache");
    core.addPath(foundToolCache);
  } else {
    const workspace = process.env["GITHUB_WORKSPACE"];
    const key = `bukzor-sentryio-direnv-install-toolcache-${direnvVersion}`;
    const paths = [`${workspace}/.direnv-install`];
    const restoreKeys = [key];

    // restore from cache
    core.info("direnv not found in tool-cache, restoring from cache...");
    const cacheKey = await cache.restoreCache(paths.slice(), key, restoreKeys);
    if (cacheKey) {
      core.info(`direnv restored from cache, key: ${cacheKey}`);

      // save tool-cache
      core.info(`saving to tool-cache...`);
      const cachedPath = await tc.cacheFile(
        `${workspace}/.direnv-install/direnv`,
        "direnv",
        "direnv",
        direnvVersion
      );

      // add to path
      core.addPath(cachedPath);

      // clear
      await exec.exec("rm", [`-rf`, `${workspace}/.direnv-install`]);
    } else {
      core.info("direnv not found in cache, installing...");
      const installPath = await tc.downloadTool(
        `https://github.com/direnv/direnv/releases/download/v${direnvVersion}/direnv.linux-amd64`
      );

      // set permissions
      core.info(`direnv installed ${installPath}, setting permissions...`);
      await exec.exec("chmod", ["+x", installPath]);

      // rename to direnv
      core.info(`renaming executable to direnv...`);
      await exec.exec("mkdir", [`${workspace}/.direnv-install`]);
      await exec.exec("cp", [
        installPath,
        `${workspace}/.direnv-install/direnv`,
      ]);

      // save to cache
      core.info(`saving to cache...`);
      await cache.saveCache(paths, key);

      // save tool-cache
      core.info(`saving to tool-cache...`);
      const cachedPath = await tc.cacheFile(
        installPath,
        "direnv",
        "direnv",
        direnvVersion
      );

      // add to path
      core.addPath(cachedPath);

      // clear
      await exec.exec("rm", [`-rf`, `${workspace}/.direnv-install`]);
    }
  }
}

async function allowEnvrc() {
  core.info("allowing envrc...");
  await exec.exec(`direnv`, ["allow"]);
}

async function exportEnvrc() {
  let outputBuffer = "";
  const options = {};
  options.listeners = {
    stdout: (data) => {
      outputBuffer += data.toString();
    },
  };
  core.info("exporting envrc...");
  await exec.exec(`direnv`, ["export", "json"], options);
  return JSON.parse(outputBuffer);
}

// action entrypoint
async function main() {
  try {
    // install direnv
    await installTools();
  } catch (error) {
    core.setFailed(error.message);
  }
}

// run action
main();
