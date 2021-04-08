function getNextNDates(n){
    let datesArray = [];
    const today = new Date() 

    for (let i=1; i<=n; i++){
        let newDate = new Date(today)
        newDate.setDate(newDate.getDate()+i)
        let neww = newDate.toISOString().split('T')[0]
        datesArray.push(neww)
    }

    console.log(datesArray)
    return datesArray

}


module.exports=getNextNDates;