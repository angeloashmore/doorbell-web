import Auth0 from "lib/Auth0";

export default function(email, password) {
  new Promise((resolve, reject) => {
    Auth0.login({
      connection: "Username-Password-Authentication",
      username: email,
      password: password,
      sso: false
    }, (error, _user, jwt) => {
      error ? reject(error) : resolve(jwt);
    });
  });
}
