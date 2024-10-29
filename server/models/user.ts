import { compare, genSalt, hash } from 'bcryptjs';
import { model, Schema } from 'mongoose';
import Group from './group';
import Resort from './resort';

interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  bio: string;
  age: number;
  profilePictureURL: string;
  experienceLevel: string;
  groups: (typeof Group)[];
  favoriteResorts: (typeof Resort)[];
  isModified(password: string): boolean;
  comparePassword(
    password: string,
    callback: (err: any, isMatch: boolean) => void
  ): boolean;
}
const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  bio: String,
  age: { type: Number },
  profilePictureURL: String,
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  favoriteResorts: [{ type: Schema.Types.ObjectId, ref: 'Resort' }],
});

// Before saving the user, hash the password
userSchema.pre<IUser>('save', function (next): void {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    hash(user.password, salt, (error, hashedPassword) => {
      if (error) {
        return next(error);
      }
      user.password = hashedPassword;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
): void {
  compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = model<IUser>('User', userSchema);

export type { IUser };
export default User;
