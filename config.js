'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://kaseyllabelle:CHAI912fall@ds225078.mlab.com:25078/adopt-a-bull';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://kaseyllabelle:CHAI912fall@ds225078.mlab.com:25078/test-adopt-a-bull';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'YWRvcHQtYS1idWxs';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';