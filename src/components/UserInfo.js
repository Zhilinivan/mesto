export class UserInfo {
  constructor(info) {
    this._info = info;
  }

  getUserInfo() {
    return this._info;
  }

  setUserInfo({ name, profession }) {
    this._info.name.textContent = name;
    this._info.profession.textContent = profession;
  }
}
