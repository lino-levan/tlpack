import functionFromDeep from './deep'

export default function functionFromFirst() {
  functionFromDeep()
  console.log("from the first function")
  return "woohoo"
}

export function anothaOne() {
  console.log("from the anothaOne function")
}