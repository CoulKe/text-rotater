type directions = "top" | "bottom";

interface iOptions {
  background: string;
  color: string;
  duration: number;
  direction: directions;
}

class TextRotater {
  element: any;
  currentWord: number;
  wordsLength: number;
  trStyles: string;
  options: iOptions;
  keyframeName: string;
  keyframeStyleId: string;
  /**
   * @param element Html element
   * @param duration time in milliseconds
   */
  constructor(element: string, options = {}) {
    let defaultOptions: iOptions = {
      background: "initial",
      color: "initial",
      duration: 2500,
      direction: "top",
    };
    this.keyframeName = "textRotater";
    this.keyframeStyleId = "text-rotater-style";
    this.element = document.getElementById(element) as HTMLSpanElement;
    this.options = { ...defaultOptions, ...options };
    if (typeof this.options.duration !== "number") {
      throw TypeError("duration should be of type number");
    }
    if (
      this.options.direction !== "top" &&
      this.options.direction !== "bottom"
    ) {
      throw new Error("direction should be 'top' or 'bottom'");
    }

    this.currentWord = 0;
    this.wordsLength = 0;
    this.trStyles = "";
  }
  private getWords() {
    let words: Array<string> =
      this.element.getAttribute("data-rotate")?.split(",") ?? [];
    return words;
  }
  textRotaterKeyframes(name: string, styles: string) {
    let styleTag: any = document.getElementById(this.trStyles);

    if (!styleTag) {
      styleTag = document.createElement("style");

      styleTag.setAttribute("id", this.keyframeStyleId);

      document.body.appendChild(styleTag);
    }
    styleTag.sheet.insertRule(
      `@keyframes ${name} {${styles}}`,
      styleTag.length
    );
  }
  init() {
    let words = this.getWords();
    this.wordsLength = words.length;
    this.element.style = `background:${this.options.background};color:${this.options.color};overflow-y:hidden;display:inline-block;animation: textRotater ${this.options.duration}ms linear 100ms infinite ${
      this.options.direction === "top" ? "normal" : "reverse"} forwards;
    `;
    let keyframes = `0%{transform: translateY(45px);opacity: 0;}30%, 90%{opacity: 0;}40%, 50%, 60%, 70%, 75%{transform: inherit;opacity: 1;}100%{transform: translateY(-45px);opacity: 0;}`;
    this.textRotaterKeyframes(this.keyframeName, keyframes);
    setInterval(() => {
      //Without this margin on inline-block it doesn't display properly
      let fontMargin = Math.floor(
        parseInt(window.getComputedStyle(this.element).fontSize) / 3
      );
      this.element.style.marginBottom = `-${fontMargin - 0.5}px`;

      this.element.innerText = words[this.currentWord];
      this.currentWord > this.wordsLength - 2
        ? (this.currentWord = 0)
        : this.currentWord++;
    }, this.options.duration);
  }
}
