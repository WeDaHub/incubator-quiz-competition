module.exports = {
  extends: "eslint:recommended",
  rules: {
    "at-rule-empty-line-before": 0,
    "rule-empty-line-before": ["off", {
      except: ["first-nested"]
    }]
  }
};
