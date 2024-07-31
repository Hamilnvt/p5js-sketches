class Resource
{
  constructor(type, value)
  {
    this.type = this.convertTypeToInt(type);
    this.value = value;
  }

  convertTypeToInt(type)
  {
    if (typeof type === "number") return type
    else {
      switch(type) {
        case "NONE": case "FREE":
          return 0;
        case "MANA": 
          return 1;
        case "COINS":
          return 2;
        case "SOULS":
          return 3;
        case "HEALTH":
          return 4;
        default:
          console.err("Unreachable: error in type conversion");
      }
    }
  }

  toString()
  {
    switch (this.type) {
      case 0:
        return "free";
      break;
      case 1:
        return `${this.value} mana`;
      break;
      case 2:
        if (this.value == 1) return "1 coin";
        else return `${this.value} coins`;
      break;
      case 3:
        if (this.value == 1) return "1 soul";
        else return `${this.value} souls`;
      break;
      case 4:
        return `${this.value} health`;
      break;
      default: return "unreachable";
    }
  }

}

class Cost extends Resource
{
  constructor(type, value)
  {
    super(type, value);
  }
}
