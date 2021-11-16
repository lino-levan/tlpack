import getConfig from "./getConfig"

type colorName = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'

// console color codes from: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const colorObj = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
}

export class Logger {
  verbose: boolean = false

  constructor(verbose: boolean) {
    this.verbose = verbose
  }

  private printWithColor(color: colorName, text: string) {
    console.log(colorObj[color]+text)
  }

  error(...args: string[]) {
    this.printWithColor('red', 'Error: ' + Array.from(args).join(' '))
  }

  warning(...args: string[]) {
    this.printWithColor('yellow', 'Warning: ' + Array.from(args).join(' '))
  }

  success(...args: string[]) {
    this.printWithColor('green', Array.from(args).join(' '))
  }

  debug(...args: string[]) {
    if(this.verbose)
      this.printWithColor('white', Array.from(args).join(' '))
  }

  print(color: colorName, ...args: string[]) {
    this.printWithColor(color, Array.from(args).join(' '))
  }

  time(name: string) {
    console.time(name)
  }

  timeEnd(name: string) {
    process.stdout.write(colorObj['green'])
    console.timeEnd(name)
  }
}

let logger = new Logger(false)

export default logger