import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    techStack: {
      type: [String], // e.g., ["React", "Node.js"]
      default: [],
    },

    githubRepoUrl: {
      type: String,
      default: '',
    },

    liveDemoUrl: {
      type: String,
      default: '',
    },

    imageUrl: {
      type: String,
      default: '', // Optional: screenshot or logo (Cloudinary)
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    tasks: [
      {
        title: String,
        description: String,
        status: {
          type: String,
          enum: ['todo', 'in-progress', 'done'],
          default: 'todo',
        },
        assignedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
