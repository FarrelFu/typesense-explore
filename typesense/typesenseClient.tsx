import Typesense, { Client } from 'typesense';

//client connect ke server typesense, saya menggunakan docker
const typesense: Client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: 'xyz',
  connectionTimeoutSeconds: 2,
});

export default typesense;
