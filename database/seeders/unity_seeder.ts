import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Unity from '#models/unity'

export default class extends BaseSeeder {
  async run() {
    await Unity.truncate()
    await Unity.createMany([
      { name: 'CAMBUQUIRA', unityUrl: 'https://www.minasul.com.br/unidades/cambuquira', visible: true },
      { name: 'CARMO DA CACHOEIRA', unityUrl: 'https://www.minasul.com.br/unidades/carmo-da-cachoeira', visible: true },
      { name: 'CONCEIÇÃO DO RIO VERDE', unityUrl: 'https://www.minasul.com.br/unidades/conceicao-do-rio-verde', visible: true },
      { name: 'ELÓI MENDES', unityUrl: 'https://www.minasul.com.br/unidades/eloi-mendes', visible: true },
      { name: 'LAMBARI', unityUrl: 'https://www.minasul.com.br/unidades/lambari', visible: true },
      { name: 'LAVRAS', unityUrl: 'https://www.minasul.com.br/unidades/lavras', visible: true },
      { name: 'MONSENHOR PAULO', unityUrl: 'https://www.minasul.com.br/unidades/monsenhor-paulo', visible: true },
      { name: 'NEPOMUCENO', unityUrl: 'https://www.minasul.com.br/unidades/nepomuceno', visible: true },
      { name: 'OLIVEIRA', unityUrl: 'https://www.minasul.com.br/unidades/oliveira', visible: true },
      { name: 'SÃO JOÃO DEL REI', unityUrl: 'https://www.minasul.com.br/unidades/sao-joao-del-rei-mg', visible: true },
      { name: 'TRÊS CORAÇÕES', unityUrl: 'https://www.minasul.com.br/unidades/tres-coracoes', visible: true },
      { name: 'VARGINHA - MATRIZ', unityUrl: 'https://www.minasul.com.br/unidades/varginha', visible: true },
    ])
  }
}
