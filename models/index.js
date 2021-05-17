const User = require("./User");
const Subscription = require("./Subscription");
const UserSub = require("./UserSub");

User.belongsToMany(Subscription, {
    through: UserSub,
    foreignKey: 'user_id'
});

Subscription.belongsToMany(User, {
    through: UserSub,
    foreignKey: 'subscription_id'
});

module.exports = {User, Subscription, UserSub};