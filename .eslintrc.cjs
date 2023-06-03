module.exports = {
    "plugins": ["mocha"],
    "env": {
        "mocha": true,
        "browser": true,
        "es2021": true
    },
    "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
