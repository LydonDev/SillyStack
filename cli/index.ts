#!/usr/bin/env bun
import prompts from 'prompts';
import kleur from 'kleur';
import { execa } from 'execa';
import fs from 'node:fs';
import path from 'node:path';

function displayBanner() {
  try {
    const asciiArt = fs.readFileSync(path.join(__dirname, 'ascii.txt'), 'utf-8');
    console.log('\n' + kleur.blue(asciiArt) + '\n');
  } catch (error) {
    console.log(kleur.blue('\n  SillyStack  \n'));
  }
}

async function main() {
  displayBanner();
  await createSillyStack();
}

async function createSillyStack() {
  console.log(kleur.blue('Welcome to SillyStack - Let\'s set up your new project!'));

  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What would you like to name your app?',
    initial: 'my-sillystack-app',
    validate: (value: string) => value.trim() === '' ? 'Project name is required' : true
  });

  if (!projectName) {
    console.log(kleur.red('Project creation cancelled.'));
    process.exit(1);
  }

  const { template } = await prompts({
    type: 'select',
    name: 'template',
    message: 'Which template would you like to use?',
    choices: [
      { title: 'SillyStack Default (Vite, React, TailwindCSS)', value: 'default' },
      { title: 'SillyStack Hono (Vite, React, TailwindCSS with Hono backend)', value: 'hono' }
    ],
    initial: 0
  });

  if (template === undefined) {
    console.log(kleur.red('Template selection cancelled.'));
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory ${projectName} already exists. Do you want to overwrite it?`,
      initial: false
    });

    if (!overwrite) {
      console.log(kleur.red('Project creation cancelled.'));
      process.exit(1);
    }

    fs.rmSync(projectPath, { recursive: true, force: true });
  }

  const { packageManager } = await prompts({
    type: 'select',
    name: 'packageManager',
    message: 'Which package manager would you like to use?',
    choices: [
      { title: 'npm', value: 'npm' },
      { title: 'bun', value: 'bun' },
      { title: 'yarn', value: 'yarn' },
      { title: 'pnpm', value: 'pnpm' }
    ],
    initial: 1
  });

  if (!packageManager) {
    console.log(kleur.red('Project setup cancelled.'));
    process.exit(1);
  }

  const { installDeps } = await prompts({
    type: 'confirm',
    name: 'installDeps',
    message: `Would you like to install dependencies using ${packageManager}?`,
    initial: true
  });

  const { initGitRepo } = await prompts({
    type: 'confirm',
    name: 'initGitRepo',
    message: 'Would you like to initialize a new Git repository?',
    initial: true
  });

  try {
    const repoUrl = template === 'hono'
      ? 'https://github.com/lydondev/SillyStack-Hono.git'
      : 'https://github.com/LydonDev/SillyStack-Default.git';

    console.log(kleur.blue(`\nCloning ${template === 'hono' ? 'SillyStack Hono' : 'SillyStack Default'} template...`));

    await execa('git', ['clone', repoUrl, projectName], {
      stdout: 'inherit'
    });

    fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });

    console.log(kleur.green('Repository cloned successfully!\n'));

    if (installDeps) {
      console.log(kleur.blue(`\nInstalling dependencies with ${packageManager}...`));

      const installCommands: Record<string, string[]> = {
        npm: ['install'],
        bun: ['install'],
        yarn: ['install'],
        pnpm: ['install']
      };

      await execa(packageManager, installCommands[packageManager], {
        cwd: projectPath,
        stdout: 'inherit'
      });

      if (template === 'hono' && packageManager === 'bun') {
        console.log(kleur.blue(`\nInstalling backend dependencies with ${packageManager}...`));
        await execa(packageManager, installCommands[packageManager], {
          cwd: path.join(projectPath, 'src', 'backend'),
          stdout: 'inherit'
        });
      }

      console.log(kleur.green('Dependencies installed successfully!\n'));
    }

    if (initGitRepo) {
      console.log(kleur.blue('\nInitializing Git repository...'));

      await execa('git', ['init'], {
        cwd: projectPath,
        stdout: 'inherit'
      });

      await execa('git', ['add', '.'], {
        cwd: projectPath,
        stdout: 'inherit'
      });

      await execa('git', ['commit', '-m', 'Initial commit from SillyStack CLI'], {
        cwd: projectPath,
        stdout: 'inherit'
      });

      console.log(kleur.green('Git repository initialized successfully!\n'));
    }

    console.log(kleur.green(`SillyStack project created successfully at ${projectPath}\n`));
    console.log(`To start your development server, run:`);
    console.log(kleur.blue(`  cd ${projectName}`));
    console.log(kleur.blue(`  ${packageManager} run dev`));

  } catch (error) {
    console.error(kleur.red('Error during project creation:'));
    console.error(error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error(kleur.red('Unexpected error:'));
  console.error(error);
  process.exit(1);
});
