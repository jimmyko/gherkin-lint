const rule = 'no-files-without-scenarios';

function filterScenarios(child) {
  return child.scenario != undefined;
}

function filterRule(child) {
  return child.rule != undefined;
}

function reduceRuleChildren(acc, curr) {
  curr.rule.children.forEach(function(child) {
    acc.push(child);
  });
  return acc;
}

function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];
  if (!feature.children.some(filterScenarios) && !feature.children.filter(filterRule).reduce(reduceRuleChildren, []).some(filterScenarios)) {
    errors.push({
      message: 'Feature file does not have any Scenarios',
      rule   : rule,
      line   : 1
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: run
};
