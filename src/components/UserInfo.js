export class UserInfo {
  constructor(info) {
    this._info = info;
  }

  getUserInfo() {
    return this._info;
  }

  setUserInfo({ name, about }) {
    this._info.name.textContent = name;
    this._info.about.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._info.avatar.src = avatar;
  }
}
