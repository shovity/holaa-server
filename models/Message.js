const { mongoose } = require('eroc')

const schema = new mongoose.Schema(
    {
        user: String,
        channel: String,
        content: String,
    },
    {
        versionKey: false,

        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
    },
)

schema.index({ channel: 1 })

module.exports = mongoose.model('Message', schema)
