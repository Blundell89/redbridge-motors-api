export default Object.seal({
    app: {
        port: process.env.PORT || 4200,
        privateKey: process.env.privateKey || 'private',
    },
    data: {
        mongoUrl: process.env.mongoUrl || 'mongodb://localhost/redbridge-motors',
        vehicleCollection: 'vehicles',
        vehicleFeatureCollection: 'vehicle-features',
    },
    fileStorage: {
        connectionString: process.env.storageConnectionString || 'UseDevelopmentStorage=true',
        publicAssetsContainer: 'public-assets',
    },
});
