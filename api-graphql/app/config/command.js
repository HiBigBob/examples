'use strict'

const pmx = require('pmx');
const db  = require('./db');

pmx.action('db:fixture', function(opt, reply) {
    console.log('Fixture started');
    db.clearDb(function(){
        console.log('Fixture Loaded')
        reply({success: true});
    });
});
