import { Schema, models, model, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember =
  models.TeamMember || model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
