function deepClone(obj) {
  var oType = getObjectType(obj);
  if (oType == "Object") {
      var result = {}
      for (let key in obj) {
          result[key] = deepClone(obj[key]);
      }
      return result;
  } else if (oType == "Array") {
      var result = [];
      for (let i = 0; i < obj.length; i++) {
          result[i] = deepClone(obj[i]);
      }
      return result;
  } else {
      return obj;
  }
}

function getObjectType(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}

export default deepClone