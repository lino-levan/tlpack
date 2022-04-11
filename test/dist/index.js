function generated_2895c5a8bc97c0be76c0fa502c28019c() {
function generated_15e8b20df6cbc8cac8803542cb1b86ac() {
function functionFromDeep() {
    console.log('from the deep function');
    return 'bruh';
}
return {
  default: functionFromDeep,
}
}
let functionFromDeep = generated_15e8b20df6cbc8cac8803542cb1b86ac().default
function functionFromFirst() {
    functionFromDeep();
    console.log('from the first function');
    return 'woohoo';
}
function anothaOne() {
    console.log('from the anothaOne function');
}
return {
  default: functionFromFirst,
  anothaOne: anothaOne,
}
}
let first = generated_2895c5a8bc97c0be76c0fa502c28019c().default
let anothaOne = generated_2895c5a8bc97c0be76c0fa502c28019c().anothaOne
console.log(first());