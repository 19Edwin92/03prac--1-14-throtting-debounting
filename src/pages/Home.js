import React, { useEffect } from 'react'
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  // # 01 timeID가 null 이기 때문에 디바운스, 쓰로틀링이 최초에 실행이 됩니다. /////////////////////////////////////
  let timerId = null;
    const debounce = (delay) =>  {
    if(timerId) {
      clearTimeout(timerId);
    };
    timerId = setTimeout(()=> {
      console.log(`마지막 요청으로부터 ${delay}ms 지났으므로 API 요청 실행`)
      timerId = null
    }, delay);
  };
  // 디바운싱이란 반복적인 이벤트 이후, 딜레이가 지나면 함수를 실행하는 것이었습니다.   /////////////////////////////////
  // # 02 timerID가 존재하면, clearTimeout() 이 동작하게 된다.
       // cleartimeout() 이란 수행중인 setTimeout()을 취소하는 역할을 한다. 
       // 이후, 인터프리터언어에 따라서 timeId에 setTimeout()이 재할당된다. 
       // 즉  setTimeout() 이 수행되기 전에 이벤트를 계속해서 발생시킨다면,  clearTimeout() 에 의해서  setTimeout() 은 동작하지 못한체, 계속 리셋될 것이다. 
  // # 03 여기에서 setTiomeOut이 동작하게 됩니다. 
       // 그렇지 않고 사용자가 2초의 시간을 충분히 기다린다면, 수행되는 로직을 확인하게 된다. 
       // 정상 동작하지 않는다는 것은 클릭한 만큼 로직이 수행된다는 것입니다. 
       // 콘솔에서 "API요청 실패 ${delay}ms 동안 추가요청은 안받습니다."라는 문구를, 버튼을 클릭한 것 만큰 확인 할 수 있습니다. 
       // 즉 쓰로틀링을 사용하는 이유가 사라져버린 것입니다. 어떻게 해야 할까요? useCallback()?

  // const [state, setState] = useState(true)     
  const throttle = (delay) => {
    if(timerId) {
      return;
    };
    // setState(!state) // state가 변경되었다는 것은 리렌더링이 일어난다는 것입니다. ////////////////////////////////
                     // 화면이 리렌더링 되었을 때, 해당 로직은 어떻게 될까요? 함수가 다시 호출되면서, timeout은 무조건 null 이 됨으로 정상동작 하지 않습니다. 
    console.log(`API요청 실패 ${delay}ms 동안 추가요청은 안받습니다.`);
    timerId = setTimeout(()=>{
      console.log(`${delay}ms 지났음으로  추가용청 받습니다.`);
      timerId = null;
    }, delay);
  };
  // 쓰로틀링에 대해서 살펴보자. 
  // # 01 timeID가 존재하면 바로 함수를 종료합니다. 
       // 그리고 콘솔에서 "추가요청은 안받습니다."는 메시지를 전달한다. 이미 동작중이기 때문이다. 
  // # 02 timeID가 null 이면, 
       // setTimeout()을 실행하는데, 해당 시간 뒤에 안에 있는 로직을 수행한다는 말이다.
       // 그리고 그 결과로 timeID는 null 이 되어 throttling 을 수행할 준비 단계에 들어간다. 
  // # 03 useState()를 만들어서 실험을 해봅시다(29번줄, 34번줄)     

  const navigator = useNavigate()

  useEffect(()=> {
    console.log("컴포넌트가 화면에 나타남")
    return ()=> {
      console.log("컴포넌트가 화면에서 사라짐")
      if(timerId) {
        clearTimeout(timerId)
      }
    }
  },[])


  return (
    <div style={{
      paddingLeft: 20,
      paddingRight: 20
    }}>
      <h1>버튼이벤트 예제</h1>
      <li>메인으로 쓰로틀링을 제어할, Home</li>
      <button onClick={()=> throttle(2000)}>쓰로틀링 버튼</button>
      <button onClick={()=> debounce(2000)}>디바운싱 버튼</button>
      <p>01 질문입니다. 쓰로틀링을 클릭하면, 비동기 처리가 실행중입니다. 그 상태에서 다른 페이지로 이동하면 어떻게 될까요?</p>
      <p>02 콘솔을 확인해보면, 페이지가 이동되었음에도 메모리는 해당 비동기처리를 수행하고 있는 것을 봅니다.</p>
      <p>03 이를 메모리누수라고 합니다. 이를 방지하기 위해서 특별한 처리를 해주어야 합니다. 바로 useEffect HOOK의 return문 입니다.</p>
      <p>04 이렇게 함으로 페이지가 언마운트 될 때 해당 로직을 수행할 수도 있습니다. </p>
      <p>05 https://react.vlpt.us/basic/16-useEffect.html 에 useEffect의 사용에 대한 예시가 나와았다.</p>
      <p><li>반환문 위는 컴포넌트가 마운트 되었을 때, 반환문 아래는 컴포넌트가 언마운트 되었을 때 동작한다.</li></p>
      <button onClick={()=> {
        navigator('/company')
      }}>company페이지 이동</button>
      <button onClick={()=> {
        navigator('/lodash')
      }}>Lodash페이지 이동</button>
    </div>
  )
}

export default Home