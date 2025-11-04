$(document).ready(function(){

  let subState = 0; 
  $('.sub').hide();

  // 메뉴 클릭 시
  $('.gnb ul li').click(function(e){
    e.stopPropagation(); // 이벤트 버블링 방지 (document 클릭 이벤트로 전달되지 않게)

    $(this).children('.sub').fadeIn();
    subState = 1; 

    // 다른 메뉴 닫기
    $(this).siblings().children('.sub').fadeOut();
  });

  // 문서 클릭 시 (바깥 클릭 감지)
  $(document).click(function(){
    if(subState === 1){
      $('.sub').fadeOut();
      subState = 0; 
    }
  });





  let n = 1;//초기값
      let c_btn = $('i.fa-pause');

      //2. 이미지번호 출력하기
      $('.c_btn li:first-child').text(n + '/3');
      //document.write(n+'/3'); => .text(n + '/3')

      //3. 매 4초마다 반복실행을 위한 함수
      function fadeInOut(){
        console.log('반복실행');

        //이미지를 위에 첫번째 이미지만 부드럽게 숨긴다
        $('.slide img').eq(n-1).fadeOut();

        if(n==3){
          n=1;
        }else{
          n++;
        }
        console.log(n);
        //해당하는 이미지만 보이게 한다.
        $('.slide img').eq(n-1).fadeIn();
        $('.c_btn li:first-child').text(n + '/3');
      };

      //4. 시간객체를 사용하여 매 4초마다 fadeInOut함수 실행하기
      let Timer = setInterval(fadeInOut, 3000);

      //5. c_btn버튼 클릭시 시간을 제거하여 슬라이드 멈추게 하고 아이콘은 play로 변경한다
      c_btn.click(function(){
        // clearInterval(Timer);//시간제거

        if($(this).hasClass('fas fa-pause')==true){
          $(this).attr('class','fas fa-play');//클래스명을 강제로 변경하여 play아이콘 나오게
          clearInterval(Timer);//시간제거
        }else{
          $(this).attr('class','fas fa-pause');//다시 일시중지(pause)아이콘 나오게 한다.
          //play버튼 클릭시 다시 시간 객체를 (Timer)생성하여 자동으로 움직이도록 한다,
          Timer = setInterval(fadeInOut, 3000);//시간객체를 다시 생성
        }
      });
  //메인콘텐츠 탭메뉴
      //1.변수선언
      let tab_mnu = $('#tab_con a');

      //2.탭메뉴 클릭시 해당 콘텐츠 (.con)가 보여지도록 한다.
      tab_mnu.click(function(e){
        e.preventDefault();
        //$('#tab_con a').removeClass('act');//모든메뉴에 서식을 제거하고
        //$(this).addClass('act');//선택한 메뉴 a요소에 서식을 적용

        //선택한 메뉴에 서식을 적용하고 부모의 다른 형제요소의 자식 a요소에 서식을 제거한다.
        $(this).addClass('act').parent().siblings().find('a').removeClass('act');
        //return false;

        //$('.con').hide();//보여지고 있는 콘텐츠의 내용을 모두 숨긴다
        //$(this).next().show();//내가 선택한 a요소의 다음요소 .con을  보이게한다

        //선택한 a요소의 다음 요소인 div를 나오게 하고 부모의 형제 요소들 안에서 다른 .con을 숨긴다.
        $(this).next().show().parent().siblings().find('.con').hide();

      //   $('#tab_con > ul > li > a').click(function(){
      //   $(this).addClass('background','orange');
      //   $('#tab_con > ul > li > a').click(function(){
      //   $(this).removeClass('background','orange');
      });





  //갤러리 목록아래 '더보기'버튼 클릭시
  //ajax비동기 방식으로 json데이터 #list추가하기
  $('.more_box a').click(function(e){
    e.preventDefault(); //방법2. 새로고침 방지

    //alert('닫기 버튼 클릭');
    
    //return false; //방법1. 이벤트를 무력화(새로고침방지)

    //비동기 방식으로 새로고침 없이 json데이터 불러오기
    $.ajax({
      url:'data/data.json', //불러올 파일이름 지정
      type:'post', //데이터 전송 방식
      dataType:'json', //데이터 파일 형식
      success:function(result){ //위 과정이 성공이면 아래 함수 내용을 실행한다.

        var t='<ul>'; //시작태그
        $.each(result.product, function(i, e){
          //li태그가 json데이터 개수만큼 추가되어야
          t+="<li><img src='./images/"+ e.path +"' alt="+e.tit+"'></li>";
        });
        
        t+="</ul>";//종료태그
        $('#list').html(t);
      }
    });
    //더보기 버튼은 숨긴다.
    $(this).hide();
    $(this).css('display','none');
    $(this).slideUp();
    $(this).fadeOut();
    $(this).css('width','0');



  });

});