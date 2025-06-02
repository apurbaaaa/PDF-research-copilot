
import mongoose, { Document, Schema } from 'mongoose';

export interface IPaper extends Document {
  title: string;
  author?: string;
  year?: number;
  summary: string;
  citations: string[];
  keywords: string[];
  methodology?: string;
  fileName: string;
  fileSize: number;
  fileData: Buffer;
  uploadDate: Date;
  userId?: string; // For future user authentication
}

const PaperSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  year: { type: Number },
  summary: { type: String, required: true },
  citations: [{ type: String }],
  keywords: [{ type: String }],
  methodology: { type: String },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileData: { type: Buffer, required: true },
  uploadDate: { type: Date, default: Date.now },
  userId: { type: String } // For future user authentication
});

export const Paper = mongoose.model<IPaper>('Paper', PaperSchema);
