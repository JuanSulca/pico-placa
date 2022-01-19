import { PicoPlaca } from './PicoPlaca';

const input = [
  {
    plate: 'PCP-2613',
    date: '2022-01-18',
    time: '23:42',
  },
  {
    plate: 'PCP-2613',
    date: '2022-01-18',
    time: '18:42',
  }
];

const picoPlaca = new PicoPlaca();

for (const data of input) {
  const output = picoPlaca.canCirculate(data);
  console.log(`🚗: ${data.plate} ${output ? 'can' : 'can not'} circulate ${data.date} @ ${data.time} ${output ? '✅' : '❌'}`);
}

console.log('Done!');
