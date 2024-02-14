export class Tile {
    constructor(val, state=null) {
      this.value = val;
      this.cardState = state;
    }
    setCardState(state) {
      this.cardState = state;
    }
  }