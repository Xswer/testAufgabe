import mongoose, { Schema, Document, Model } from 'mongoose';
import { ApAttrs, ApDoc, apSchema } from './ap';

export interface FirmaAttrs {
  title: string;
  stadt: string;
  plz: string;
  ap: ApAttrs[];
}

export interface FirmaDoc extends Document {
  title: string;
  stadt: string;
  plz: string;
  ap: ApDoc[];
}

interface FirmaModel extends Model<FirmaDoc> {
  build(attrs: FirmaAttrs): FirmaDoc;
}

const firmaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stadt: {
      type: String,
      required: true,
    },
    plz: {
      type: String,
      required: true,
    },
    ap: {
      type: [apSchema],
      required: false,
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

firmaSchema.set('versionKey', 'version');

firmaSchema.statics.build = (attrs: FirmaAttrs) => {
  return new Firma(attrs);
};
firmaSchema.methods.setConvert = function (attrs: any) {
  delete attrs.id;
  this.set(attrs);
};

const Firma = mongoose.model<FirmaDoc, FirmaModel>('Firma', firmaSchema);

export { Firma };
