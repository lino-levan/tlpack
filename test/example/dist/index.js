function functionFromNested(){console.log("function from nested")}function functionFromSecond(){functionFromNested()}function functionFromFirst(){console.log("from the first function")}functionFromFirst();functionFromSecond();