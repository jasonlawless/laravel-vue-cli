module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};

/** ESLint Quickstart
 * Basically ESLint 'cleans-up' your code when compiling. It will clean-up or run verifications based on the configuration above.
 * First understand what the flags mean:
 *  off (or 0) means 'turn the rule off'
 *  warn (or 1) means 'throw a warning during compile, but do not abort`
 *  error (or 2) means 'just like warn, but it will abort'
 *
 * Since 'extends' contains 'eslint:recommended', it means that all the rules marked with a checkmark are enabled. You can
 * see all the rules at eslint.org/docs/rules
 *
 * The rules object overrides the rules set (or not set) in the recommended list. Refer to the rules documentation to learn what
 * each rule means. For example, 'no-console' will disallow the use of console.log in your code. If it is set to off, this rule
 * will not apply. If it is set to warn, the compiler will warn you of where it found console.log. And if it is set to error,
 * the compiler will exit and abort compilation.
 *
 * This helps keep your code clean, tidy, and up to a certain standard. I think it's awesome =)
 * **/
