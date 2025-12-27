import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  name: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  {
    timestamps: true
  }
);

// Compare password method
adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
