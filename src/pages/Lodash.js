import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
// 쓰로틀링 및 디바운딩 관련 메서드들을 많이 제공하고 있습니다. 

function Lodash() {
  const navigator = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [inputtext, setInputText] = useState('')

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // # 01 lodash로 비다운스 구현하기 => 그런데 단번에 쫙!으 기대했는데 onchange 처럼 되네? 

  // const handleSearchText = (_.debounce((text)=> {setSearchText(text)}, 2000));
  
  ///////////////////////////////////////////////////////////////////////////////////////////////
  // # 02 lodash 앞에 useCallback처리해주기 - 결론적으로는 useCallback 을 해주어야 한다. 
       // 이를 설명하기 위해서 커스텀 디바운스를 만들어서 동작원리를 이해해보고자 합니다. 
       
  // const handleSearchText = useCallback(
  //   _.debounce((text)=> {
  //     setSearchText(text)
  //   }, 500),[]
  // );

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // # 03 useCallback 과정을 이해하기 위해서 아래와 같이 입력해보겠습니다. 
       // TDZ을 고려해야 되기 때문에 handleSearchText 위에 debounce를 선언해 주었습니다. 
  const debounce = (callback, delay) => {
    // ChapGPT : debounce = ()=> {} 함수에 대한 설명은 아래와 같다. 
       // 이 함수는 입력된 콜백함수를 지정된 시간 식별자 delay 동안 실행하지 않고 대기한 다음에 실행한다. 
       // 해당 함수가 가져온 매개변수는 handleSearchText에서 가져온 두개의 인자이다. 
          // 1) (text)=> {setSearchText(text)}
          // 2) 500
       // debounce 는 실행하며, timeId = null 일 때에 재할당 된 setTimeout 을 실행한다. 

    let timeId = null;
    return (...args) => {
      if(timeId) clearTimeout(timeId);
      // timeId의 값이 있으면, 초기화한다. 이것이 디바운싱이다. 
      // 그렇지 않고 값이 비어있다면 아래와 같이 실행할 것이다. 

      timeId = setTimeout(()=> {
        callback(...args);  // 여기서 너는 무엇이니?
      }, [delay]);
    };
  };

  const handleSearchText = useCallback(
    debounce((text)=> {
      setSearchText(text)
    }, 500),[]
  );

  // 공통함수
  const handleChange = (e) => {
    setInputText(e.target.value);
    handleSearchText(e.target.value);
  }

  useEffect(()=>{
    console.log(searchText)
  },[searchText])
  
  return (
    <div style={{padding:20}}>
      <h1>Lodash</h1>
      <button onClick={()=> navigator('/')}>Home으로 돌아가기</button>
      <p>이전시간 쓰로틀링/디바운싱을 사용하면서 useState의 변경으로 함수형 컴포넌트가 리렌더링 되었을 때, 정상동작하지 않는 것을 보았습니다. 이 부분을 Lodash 라이브러리를 통해서 접근하는 것이 이번 강의의 내용이다. </p>
      <h2>디바운싱 예제</h2>
      <p>입력이 다 끝나면, 디바운싱이었죠</p>
      <input 
          type="text" 
          placeholder='입력값을 넣고 디바운싱 테스트를 해보세요'
          style={{width:300}}
          value={inputtext}
          onChange={handleChange}/>
      <p>Input Text : {inputtext}</p>
      <p>Search Text : {searchText}</p>
      <p>디바운싱과 useState 제어를 위해서 lodash 라이브러리를 사용해 보겠습니다. yarn add lodash 를 통해서 제어해봅시다. </p>
    </div>
  )
}

export default Lodash