const User = require('./User');
const StreamingServices = require('./StreamingServices');
const ApplicationDetails = require('./ApplicationDetails');
const colored = require('colored');


User.hasMany(ApplicationDetails, {
    foreignkey: 'user_id',
    onDelete: 'CASCADE'
});

ApplicationDetails.belongsTo(User, {
    foreignKey: 'user_id',
});


StreamingServices.hasMany(ApplicationDetails, {
    foreignKey: 'streaming_services_id',
    onDelete: 'CASCADE'
});    


ApplicationDetails.belongsTo(StreamingServices, {
    foreignKey: 'streaming_services_id',
});

console.log(colored('\nAssociations between models set up successfully!', 'green'));

module.exports = { User, ApplicationDetails, StreamingServices };