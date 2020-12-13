const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Please enter a reaction.',
        trim: true,
        minLength: [1, 'Your reaction can not be empty'],
        maxLength: [280, 'Your reaction must be less than 280 characters']
    },
    username: {
        type: String,
        required: 'Please enter your username.'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please enter a thought.',
        trim: true,
        minLength: [1, 'Your thought can not be empty'],
        maxLength: [280, 'Your thought must be less than 280 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

// get number of reactions to a thought
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;