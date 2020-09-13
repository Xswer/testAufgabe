import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ApAttrs {
  vorname: string;
  nachname: string;
}

export interface ApDoc extends Document {
  vorname: string;
  nachname: string;
}

interface ApModel extends Model<ApDoc> {
  build(attrs: ApAttrs): ApDoc;
}

const apSchema = new mongoose.Schema(
  {
    vorname: {
      type: String,
      required: true,
    },
    nachname: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

apSchema.set('versionKey', 'version');

apSchema.statics.build = (attrs: ApAttrs) => {
  return new Ap(attrs);
};
apSchema.methods.setConvert = function (attrs: any) {
  delete attrs.id;
  this.set(attrs);
};

const Ap = mongoose.model<ApDoc, ApModel>('Ap', apSchema);

export { Ap, apSchema };
