import { NormalizedSchema } from '../schema';
import { addProjectConfiguration, Tree } from '@nx/devkit';
import { createViteTargets } from '../../utils/targets';

export function addProject(tree: Tree, options: NormalizedSchema) {
  const targets = createViteTargets('application', options);

  addProjectConfiguration(tree, options.name, {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: 'application',
    tags: options.parsedTags,
    targets,
  });
}
