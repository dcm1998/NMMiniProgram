
function RandomByteArrayGenerator() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();
    let randomValue = parseInt(Math.random() * 255)
    let result = (hour << 27) | (minute << 21) | (second << 15) | (millisecond << 8) | randomValue;
    let byteArray = [];
    byteArray[0] = ((result >> 24) & 0xFF).toString(16);
    byteArray[1] = ((result >> 16) & 0xFF).toString(16);
    byteArray[2] = ((result >> 8) & 0xFF).toString(16);
    byteArray[3] = (result & 0xFF).toString(16);
    for(let i=0;i<byteArray.length;i++){
        if(byteArray[i].length==1){
           byteArray[i] = '0'+byteArray[i];
		}
    }
    return byteArray;
}
function getAdvertiseData1() {
    let byteArray = RandomByteArrayGenerator();
    let data1 = "070123";
    let data2 = byteArray[0] + byteArray[1] + byteArray[2] + byteArray[3];
    let data3 = "2f61accc274567f7db3407038e5c0baa9730";
    return data1 + data2 + data3;
}
function getAdvertiseData2() {
    let byteArray = RandomByteArrayGenerator();
    let data1 = "34dbf767-4527-ccac-612f-";
    let data2 = byteArray[3] + byteArray[2] + byteArray[1] + byteArray[0];
    let uuid = byteArray[0] + byteArray[1] + byteArray[2] + byteArray[3];
    let data3 = "2301";
    return [data1 + data2 + data3, "8e5c", "0baa", "9730", uuid];
}

exports.getAdvertiseData2 = getAdvertiseData2
exports.getAdvertiseData1 = getAdvertiseData1