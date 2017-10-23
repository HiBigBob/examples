module.exports = {
    'secret': 'YOUR_SECRET_STRING',
    'port': process.env.PORT,
    'database': {
        'dev': 'mongodb://mongodb:27017/todo',
        'prod': '',
        'test': 'mongodb://mongodb:27017/todo-test'
    }
};
