import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './vitest-project';
import { VitestProjectGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/js';

describe('vitest-project generator', () => {
  let host: Tree;
  const options: VitestProjectGeneratorSchema = {
    project: 'test',
    framework: 'generic',
  };

  beforeEach(() => {
    host = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
    libraryGenerator(host, { name: 'test' });
  });

  it('should run successfully', async () => {
    await generator(host, options);

    const config = readProjectConfiguration(host, 'test');
    expect(config).toBeDefined();
  });
});
