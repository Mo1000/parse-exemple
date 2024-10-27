const validationRules = (request, otherRule) => {
  if (!request.user || request.master) {
    throw 'Unauthorized';
  }
  if (otherRule) {
    otherRule(request);
  }
};
