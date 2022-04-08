const getCookie = (name) => { // 받아올것 : name (name으로 value를 가지고 올것)
  let value = '; '+document.cookie; // 가지고오고
  
  let parts = value.split(`; ${name}=`);// 쪼개기
  if(parts.length === 2) { // parts는 배열이니까, 배열의 길이가 2가아니면 찾는게 없는것
    return parts.pop().split(';').shift();
  }

}

const setCookie = (name, value, exp = 5) => { // 받아올것 : 이름, value, 만료일 - exp = 5(기본값미리 넣어주기)
  let date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
}

const deleteCookie = (name) => { // 받아올것 : name (만료일 굳이 안가져와도 한참전으로 설정하면 되니까)
  let date = new Date('2020-01-01').toUTCString();
  console.log(date);
  document.cookie = name+"=; expires="+date;
} 

export {getCookie, setCookie, deleteCookie}; 