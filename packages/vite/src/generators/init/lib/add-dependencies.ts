import {
  addDependenciesToPackageJson,
  GeneratorCallback,
  Tree,
} from '@nx/devkit';
import { viteVersion } from '../../../utils/version';

export function updateDependencies(tree: Tree): GeneratorCallback {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      vite: viteVersion,
    }
  );
}
