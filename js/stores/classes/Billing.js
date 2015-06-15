export default Parse.Object.extend("Billing", {
  // MARK: Instance methods
  hasCard: function() {
    return !!this.get("last4");
  }
}, {
  // MARK: Class methods
});
