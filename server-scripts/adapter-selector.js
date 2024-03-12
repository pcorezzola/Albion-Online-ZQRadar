const { networkInterfaces } = require('os')
const readlineSync = require('readline-sync');

const getAdapterIp = () => {
    const interfaces = networkInterfaces();

    console.log();
    console.log('Please select one of the adapter that you use to connect to the internet:');

    let i = 1;
    const selection = {};
    const selectionName = {};
    for (const [name, value] of Object.entries(interfaces)) {
        const detail = value.find(v => v.family === 'IPv4');
        if (!detail) continue;
        selection[i] = detail.address;
        selectionName[i] = name;
        console.log(`  ${i}. ${name}\t ip address: ${detail.address}`);
        i++;
    }

    let selectedIp;
    let selectedName;

    while (true)
    {
        console.log();
        let userSelect = readlineSync.question('input the number here: ');
        selectedIp = selection[userSelect];
        selectedName = selectionName[userSelect];

        if (selectedIp)
            break;

        console.clear();
        console.log('invalid input, try again');
        console.log();

        console.log();
        console.log('Please select one of the adapter that you use to connect to the internet:');
        
        for (let j = 1; j < i; j++)
        {
            console.log(`  ${j}. ${selectionName[j]}\t ip address: ${selection[j]}`);
        }
    }

    console.log();
    console.log(`you have selected "${selectedName}"`);
    console.log();

    return selectedIp;
}

module.exports = {
    getAdapterIp,
}