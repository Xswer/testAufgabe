import { Firma } from '../models/firma';

export class DBTools {
  static async seed() {
    const firma1 = Firma.build({
      title: 'Ajando',
      stadt: 'Mannheim',
      plz: '68309',
      ap: [
        {
          vorname: 'Vorname Beispiel 1',
          nachname: 'Nachname Beispiel 1',
        },
        {
          vorname: 'Vorname Beispiel 2',
          nachname: 'Nachname Beispiel 2',
        },
      ],
    });

    const firma2 = Firma.build({
      title: 'Microsoft',
      stadt: 'Muenchen',
      plz: '80807',
      ap: [
        {
          vorname: 'Vorname Beispiel 3',
          nachname: 'Nachname Beispiel 3',
        },
        {
          vorname: 'Vorname Beispiel 4',
          nachname: 'Nachname Beispiel 4',
        },
      ],
    });

    await firma1.save();
    await firma2.save();
  }

  static async seedIfEmpty() {
    const firmen = await Firma.find();
    if (firmen.length === 0) await this.seed();
  }
}
