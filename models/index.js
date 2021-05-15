const User = require("./User");
const Subscription = require("./Subscription")

User.hasMany(Subscription, {
    foreignKey: 'user_id'
});

Subscription.belongsTo(User, {
    foreignKey: 'user_id'
})