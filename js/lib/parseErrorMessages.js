import Parse from "lib/Parse";

const messages = new Map();

messages.set(
  Parse.Error.USERNAME_TAKEN,
  "That email is already being used."
);

messages.set(
  Parse.Error.EMAIL_TAKEN,
  "That email is already being used."
);

messages.set(
  Parse.Error.OBJECT_NOT_FOUND,
  "Object could not be found."
);

export default messages;
