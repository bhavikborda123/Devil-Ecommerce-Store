const readline = require('readline');
const os = require('os');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter server port (default 8000): ', (serverPortInput) => {
  const serverPort = serverPortInput || 8000; // If no input, use default 8000

  rl.question('Enter client-side IP (default localhost): ', (clientIpInput) => {
    const clientIp = clientIpInput || 'localhost'; // If no input, use default localhost

    rl.question('Enter client-side port (default 3000): ', (clientPortInput) => {
      const clientPort = clientPortInput || 3000; // If no input, use default 3000

      const systemIpAddress = getSystemIpAddress();

      // Read existing .env file
      fs.readFile('.env', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading .env file:', err);
          rl.close();
          return;
        }

        // Parse existing data
        const lines = data.split('\n');
        const updatedLines = lines.map(line => {
          if (line.startsWith('PORT=')) {
            return `PORT=${serverPort}`;
          } else if (line.startsWith('APP_URL=')) {
            if (clientIp == 'localhost') {
              return `APP_URL=http://${systemIpAddress}:${clientPort}`;
            }
            return `APP_URL=http://${clientIp}:${clientPort}`;
          } else if (line.startsWith('API_URL=')) {
            return `API_URL=http://${systemIpAddress}:${serverPort}`;
          }
          return line;
        });

        const updatedEnvData = updatedLines.join('\n');

        // Write back to .env file
        fs.writeFile('.env', updatedEnvData, (err) => {
          if (err) {
            console.error('Error writing to .env file:', err);
          } else {
            console.log('.env file has been updated successfully.');
          }
          console.log();
          rl.close();
        });
      });
    });
  });
});

function getSystemIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (let i = 0; i < iface.length; i++) {
      const { address, family, internal } = iface[i];
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return 'localhost'; // Return localhost if system IP address not found
}
