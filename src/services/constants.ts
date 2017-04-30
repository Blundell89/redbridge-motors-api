export default Object.seal({
    data: {
        mongoUrl: process.env.mongoUrl || 'mongodb://localhost/redbridge-motors',
        vehicleCollection: 'vehicles',
        vehicleFeatureCollection: 'vehicle-features',
    },
    fileStorage: {
        connectionString: process.env.storageConnectionString || 'UseDevelopmentStorage=true',
        publicAssetsContainer: 'public-assets'
    }
});