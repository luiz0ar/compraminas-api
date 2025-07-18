import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Unity from '#models/unity'

export default class extends BaseSeeder {
  async run() {
    await Unity.truncate()
    await Unity.createMany([
      { name: 'ALTEROSA', unityUrl: 'https://www.minasul.com.br/unidades/alterosa' },
      { name: 'CAMBUQUIRA', unityUrl: 'https://www.minasul.com.br/unidades/cambuquira' },
      { name: 'CARMO DA CACHOEIRA', unityUrl: 'https://www.minasul.com.br/unidades/carmo-da-cachoeira' },
      { name: 'CONCEIÇÃO DO RIO VERDE', unityUrl: 'https://www.minasul.com.br/unidades/conceicao-do-rio-verde' },
      { name: 'ELÓI MENDES', unityUrl: 'https://www.minasul.com.br/unidades/eloi-mendes' },
      { name: 'LAMBARI', unityUrl: 'https://www.minasul.com.br/unidades/lambari' },
      { name: 'LAVRAS', unityUrl: 'https://www.minasul.com.br/unidades/lavras' },
      { name: 'MONSENHOR PAULO', unityUrl: 'https://www.minasul.com.br/unidades/monsenhor-paulo' },
      { name: 'NEPOMUCENO', unityUrl: 'https://www.minasul.com.br/unidades/nepomuceno' },
      { name: 'OLIVEIRA', unityUrl: 'https://www.minasul.com.br/unidades/oliveira' },
      { name: 'SÃO JOÃO DEL REI', unityUrl: 'https://www.minasul.com.br/unidades/sao-joao-del-rei-mg' },
      { name: 'TRÊS CORAÇÕES', unityUrl: 'https://www.minasul.com.br/unidades/tres-coracoes' },
      { name: 'VARGINHA - MATRIZ', unityUrl: 'https://www.minasul.com.br/unidades/varginha' },

    ])
  }
}
