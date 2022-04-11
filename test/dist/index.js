function generated_15e8b20df6cbc8cac8803542cb1b86ac() {
function functionFromDeep() {
    console.log('from the deep function');
    return 'bruh';
}
return {
  default: functionFromDeep,
}
}

function generated_2895c5a8bc97c0be76c0fa502c28019c() {
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

function generated_d16d2269519d1f258163b45f827e30c3() {
let functionFromDeep = generated_15e8b20df6cbc8cac8803542cb1b86ac().default
function functionFromSecond() {
    functionFromDeep();
    console.log('from the second function');
    return 'woohoo';
}
return {
  default: functionFromSecond,
}
}

let first = generated_2895c5a8bc97c0be76c0fa502c28019c().default
let anothaOne = generated_2895c5a8bc97c0be76c0fa502c28019c().anothaOne
let functionFromSecond = generated_d16d2269519d1f258163b45f827e30c3().default
console.log(first());
functionFromSecond();