var config = {
	local: {
		mode: 'local',
		port: 3000
	},
	staging: {
		mode: 'staging',
		port: 4000
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};