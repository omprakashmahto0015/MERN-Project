const { exec } = require('child_process');

const installDependencies = () => {
  const dependencies = [
    'express',
    'mongoose',
    'dotenv',
    'bcryptjs',
    'jsonwebtoken',
    'cors'
  ];
  const devDependencies = ['nodemon'];

  const installCommand = `npm install ${dependencies.join(' ')}`;
  const installDevCommand = `npm install --save-dev ${devDependencies.join(' ')}`;

  exec(installCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing dependencies: ${error}`);
      return;
    }
    console.log(`Dependencies installed successfully:\n${stdout}`);
  });

  exec(installDevCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing devDependencies: ${error}`);
      return;
    }
    console.log(`DevDependencies installed successfully:\n${stdout}`);
  });
};

installDependencies();