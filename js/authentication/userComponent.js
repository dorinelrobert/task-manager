export function userComponent(username) {
  let user, user_avatar, user_name;

  user = document.createElement("div");
  user.className = "user";

  user_avatar = document.createElement("div");
  user_avatar.className = "user__avatar";
  user_avatar.innerText = username[0].toUpperCase();
  user.appendChild(user_avatar);

  user_name = document.createElement("div");
  user_name.className = "user__name";
  user_name.textContent = username;
  user.appendChild(user_name);

  return user;
}
