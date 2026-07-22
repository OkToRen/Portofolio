// ---------------------------------------------------------------------------
// Site-wide facts derived at build time.
// ---------------------------------------------------------------------------
import { execSync } from 'node:child_process';

/** Date of the last commit, read from git when the site builds.
 *  Falls back to the build date if git isn't available (e.g. a bare
 *  Docker build context). */
function lastUpdated(): string {
  let date = new Date();
  try {
    const iso = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim();
    if (iso) date = new Date(iso);
  } catch {
    /* no git in this build environment; the build date is honest enough */
  }
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const site = {
  lastUpdated: lastUpdated(),
};
