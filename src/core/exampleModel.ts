import { Project } from '../types/idef0';
import canonicalModel from '../assets/example-model.json';

/**
 * Returns the exact, complete canonical IDEF0 model generated and verified by Playwright via the UI.
 */
export function createExampleModel(): Project {
  return JSON.parse(JSON.stringify(canonicalModel)) as Project;
}
