import functionFromDeep from './deep'

export default function functionFromSecond() {
  functionFromDeep()
  console.log("from the second function")
  return "woohoo"
}