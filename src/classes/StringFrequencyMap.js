export class StringFrequencyMap {
    constructor(string){
      this.strMap = {};
      for(let i = 0; i<string.length; i++) {
        let char = string[i];
        if(!this.strMap[char]){
          this.strMap[char] = 1;
        } else if(this.strMap[char] > 0) {
          this.strMap[char] = this.strMap[char] + 1;
        }
      }
    }
    remove(char) {
      if(this.strMap[char] && this.strMap[char] > 0) {
        this.strMap[char] = this.strMap[char] - 1 ;
      }
    }
    hasChar(char) {
      if(this.strMap.hasOwnProperty(char) && this.strMap[char] > 0) {
        return this.strMap[char];
      } else {
        return null;
      }
    }
  }