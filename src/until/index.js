export function jsonChange(data,changeData) {
  let tempData = Object.assign({}, data)
  let tempChangeData = Object.assign({}, changeData)
  for(let i in tempChangeData){
    for(let j in tempData){
      if(i==j){
        tempData[j]=tempChangeData[i]
        break
      }
    }
  }
  return tempData
}
