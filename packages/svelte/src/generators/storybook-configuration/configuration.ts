import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  ensurePackage,
  formatFiles,
  GeneratorCallback,
  Tree,
  runTasksInSerial,
} from '@nx/devkit';
import { Linter } from '@nx/linter';
import { StorybookConfigureSchema } from './schema';
import { svelteLoaderVersion } from '../utils/versions';
import { readNxVersion } from '../utils/utils';
import { updateMainJs } from './lib/update-main-js';

export async function configurationGenerator(
  host: Tree,
  schema: StorybookConfigureSchema
) {
  const uiFramework = '@storybook/svelte';
  const options = normalizeSchema(schema);
  const tasks: GeneratorCallback[] = [];

  const installTask = await addDependenciesToPackageJson(
    host,
    {},
    {
      'svelte-loader': svelteLoaderVersion,
    }
  );
  tasks.push(installTask);

  await ensurePackage(host, '@nx/storybook', readNxVersion(host));
  const { configurationGenerator } = await import('@nx/storybook');

  const storybookTask = await configurationGenerator(host, {
    name: options.name,
    uiFramework,
    configureCypress: options.configureCypress,
    js: options.js,
    linter: options.linter,
    cypressDirectory: options.cypressDirectory,
    standaloneConfig: options.standaloneConfig,
    tsConfiguration: options.tsConfiguration,
    configureTestRunner: options.configureTestRunner,
    bundler: 'webpack',
  });
  tasks.push(storybookTask);

  updateMainJs(host, options);

  await formatFiles(host);

  return runTasksInSerial(...tasks);
}

function normalizeSchema(
  schema: StorybookConfigureSchema
): StorybookConfigureSchema {
  const defaults = {
    configureCypress: true,
    linter: Linter.EsLint,
    js: false,
  };
  return {
    ...defaults,
    ...schema,
  };
}

export default configurationGenerator;
export const configurationSchematic = convertNxGenerator(
  configurationGenerator
);
